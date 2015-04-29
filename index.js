function tinyLoader(deps, done, options) {
    /**
     *  tinnyloader
     *  @version 1.0.0
     *  @author switer
     */
    var $namespace = '__tinyloader/'
    options = options || {}
    /**
     *  Using XHR to load script code
     */
    function curl(url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url)
        xhr.send()
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    cb(null, xhr.response)
                } else {
                    cb('err')
                }
            }
        }
    }
    function warn () {
        console.error('Load lib:' + src + ' with error!')
    }
    /**
     *  Load resouce from LS or through network
     */
    function load(id, src, cb) {
        if (!id || !options.cache) return curl(src, function(err, code) {
            if (err) return warn()
            cb(code)
        })
        var cache = localStorage.getItem($namespace + id)
        if (cache !== null) {
            try {
                cache = JSON.parse(cache)
                if (cache.src && cache.src === src) {
                    return cb(cache.code)
                }
            } catch (e) {

            }
        }
        curl(src, function(err, code) {
            if (err) return warn()
            localStorage.setItem($namespace + id, JSON.stringify({
                src: src,
                code: code
            }))
            cb(code)
        })
    }
    /**
     *  Execute script in sequence when all resource is loaded 
     */
    var count = deps.length
    var scripts = new Array(count)
    function collect(index, code) {
        scripts[index] = code
        if (!--count) {
            // excute
            scripts.forEach(function(s) {
                eval(s)
            }.bind(window)) // bind this to window for lib execution
            done && done()
        }
    }
    /**
     *  Load specified resouces in parallex 
     */
    deps.forEach(function(lib, i) {
        load(lib.name, lib.src, collect.bind(null, i))
    })
}