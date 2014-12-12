/**
 * App: SocialComments
 * Project: social-comments
 * Docs: http://github.tpn.terra.com/pages/terra/social-comments
 * Source: http://github.tpn.terra.com/Terra/social-comments
 *
 * app para a utilizaçao da ferramenta disqus
 *
 * @name SocialComments
 * @namespace App
 * @uses pkg.utils.make.Observable
 *
 * "Generated using Jarvis"
 */
zaz.use(function appSocialComments(pkg) {

/*******************************************/
/*    READ and REMOVE the comments below   */
/*******************************************/

    "use strict";

    var console = pkg.console,
        require = pkg.require,
        define = pkg.define,
        PUBLIC_STATIC = null,
        STATIC = {}; // add static properties here

    // using the appFactory to create the new app
    pkg.require(['appFactory'], function (appFactory) {

        // creating the app.socialComments
        // more detail at: http://github.tpn.terra.com/Terra/zaz/wiki/Apps#outros-par%C3%A2metros
        // And don't forget that your App will be an observable, so, it already
        // has set and get methods, as well as all the other Observable properties and
        // methods.
        appFactory.create({

            name: "socialComments",
            version: "1.0.0",
            state: "ok", // change to deprecated in case its use is not advisable
            docs: "http://github.tpn.terra.com/pages/terra/social-comments",
            source: "http://github.tpn.terra.com/Terra/social-comments",
            description: "app para a utilizaçao da ferramenta disqus",
            tests: "http://s1.trrsf.com/fe/social-comments/tests/index.htm?zaz[env]=tests",
            dependencies: [],
            dictionaries: [],
            templates: {},
            expects: {},
            setup: function (__static, __proto, __shared) {},
            init: function (data, __shared) {
                var PUBLIC = this,
                    PRIVATE = {};

                var disqusUsers = {
                    'br' : 'terranetworks',
                    'es' : 'terraes',
                    'us' : 'terraus',
                    'mx' : 'terramx',
                    'ar' : 'terraar',
                    'cl' : 'terracl',
                    'co' : 'terracol',
                    'pe' : 'terrape'
                };

                var shortName = disqusUsers[pkg.context.page.get("country")];

                if(shortName){
                    window['disqus_shortname'] = shortName; //jshint ignore:line
                   
                    var dsq = document.createElement('script');
                    dsq.type = 'text/javascript';
                    dsq.async = true;
                    dsq.src = '//' + shortName + '.disqus.com/embed.js';
                    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);

                    var s = document.createElement('script');
                    s.async = true;
                    s.type = 'text/javascript';
                    s.src = 'http://' + shortName + '.disqus.com/count.js';
                    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(s);
                }
              
                return PUBLIC;

            },
            teardown: function (why, __static, __proto, __shared) {}

        });
    });
});
