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

                PRIVATE.iframeSize = 600;
                PRIVATE.enableResize = true;

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
                    window['disqus_url'] = [location.protocol, '//', location.host, location.pathname].join(''); //jshint ignore:line
                   
                    var dsq = document.createElement('script');
                    dsq.type = 'text/javascript';
                    dsq.async = true;
                    dsq.src = '//' + shortName + '.disqus.com/embed.js';
                    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                }

                PRIVATE.receiveMessage = function(event){
                    if (event.origin === "http://disqus.com"){
                        var objDisqus = JSON.parse(event.data);

                        if(PRIVATE.enableResize && objDisqus.name === 'mainViewRendered' && objDisqus.data){
                            PRIVATE.enableResize = false;

                            if(objDisqus.data.height > PRIVATE.iframeSize){
                                PRIVATE.showButton();
                            }
                        }else if(objDisqus.name === 'posts.count' && objDisqus.data){
                            PRIVATE.setCountComments(objDisqus.data);
                        }
                    }
                };

                PRIVATE.setCountComments = function(countComments){
                    var elements = document.querySelectorAll('a[href="#disqus_thread"]'),
                        length = elements.length;

                    if(typeof countComments === "object"){
                        countComments = 0;
                    }

                    for(var i=0; i<length; i++){
                        elements[i].innerHTML = countComments;
                    }

                };

                PRIVATE.showButton = function(){
                    var objDisqus = document.getElementById('disqus_thread');
                    objDisqus.style.overflow = 'hidden';
                    objDisqus.style.height = PRIVATE.iframeSize + 'px';

                    var socialComments = document.querySelector(".social-comments");
                    var fade = document.createElement('div');
                    var button = document.createElement('button');

                    fade.className = 'fade-comments';
                    button.className = 'btn--default btn--small btn-social-comment';
                    button.innerHTML = 'ver mais comentários';

                    function removeButton(){
                        objDisqus.style.height = 'auto';
                        button.style.display = 'none';
                        fade.style.display = 'none';
                        objDisqus.removeEventListener('click', removeButton);
                    }

                    button.addEventListener('click', removeButton);
                    socialComments.appendChild(fade);
                    socialComments.appendChild(button);
                };

                window.addEventListener("message", PRIVATE.receiveMessage, false);

              
                return PUBLIC;

            },
            teardown: function (why, __static, __proto, __shared) {}

        });
    });
});
