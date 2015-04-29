# tinyloader
A tiny non-module lib's file loader, only for same origin resouce.

## Usage

put **tinyloader**'s code to a inline-script. Such as:

```html
<script src="tinyloader.js?__inline"></script>
```

Then use it load resource and initialize your app in callback function:

```js
<script>
    /**
     *  tinyLoader(<Array> resources, <Function> callback [, <Object> options])
     */
    tinyLoader([
        // each resource specification should include "name" and src
        { name: 'scrat.js', src: __uri('scrat.js') },
        { name: 'zect.js', src: __uri('zect.js') }
    ], function () {
        // do something when all resource is loaded
        require.config(__FRAMEWORK_CONFIG__);
        require.async('app', function (app) {
            app.start();
        })
    }, {
        // enable cache option will load resource from LocalStorage if it has,
        // store code in LocalStorage once load from remote
        cache: true
    });
</script>
```
