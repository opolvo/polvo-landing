/* global dmpTagAdd, dmpTagFlush */
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
            dependencies: ['dict.SocialComments','jQuery'],
            dictionaries: [],
            expects: {},
            setup: function (__static, __proto, __shared) {},
            init: function (data, __shared) {
                var PUBLIC = this,
                    PRIVATE = {};

                PRIVATE.iframeSize = 350;
                PRIVATE.enableResize = true;
                PUBLIC.dictSocialComments = new __shared.dependencies['dict.SocialComments']();

                var $ = __shared.dependencies.jQuery;

                var disqusUsers = {
                    'br' : 'terranetworks',
                    'es' : 'terraesp',
                    'us' : 'terraus',
                    'mx' : 'terramx',
                    'ar' : 'terraar',
                    'cl' : 'terracl',
                    'co' : 'terracol',
                    'pe' : 'terrape'
                };

                var disqusToken = null;
                var disqusApiKey = null;
                var disqusUrlAuthSSO = 'https://auth.terra.com.br/sso/disqus?site=' + pkg.context.page.get("country");

                PRIVATE.shortName = disqusUsers[pkg.context.page.get("country")];

                PRIVATE.loadDisqus = function() {
                    if ('withCredentials' in new XMLHttpRequest()) { //ie8 e ie9 nao tem suporte a cookies cross-domain. login do terra desativado
                        window['disqus_config'] = function() { //jshint ignore:line
                            this.page.remote_auth_s3 = disqusToken; //jshint ignore:line
                            this.page.api_key = disqusApiKey; //jshint ignore:line

                            this.sso = {
                                name: "Terra",
                                button: "https://s1.trrsf.com/fe/zaz-morph/_img/disqus-button.jpg",
                                icon: "https://www.terra.com.br/favicon.ico",
                                url: "https://s1.trrsf.com/fe/zaz-app-social-comments/_template/disquslogin.html?site=" + pkg.context.page.get("country"),
                                logout: "https://s1.trrsf.com/fe/zaz-app-social-comments/_template/disquslogout.html?site=" + pkg.context.page.get("country"),
                                width: "660",
                                height: "320"
                            };
                        };
                    }

                    var dsq = document.createElement('script');
                    dsq.type = 'text/javascript';
                    dsq.async = true;
                    dsq.src = '//' + PRIVATE.shortName + '.disqus.com/embed.js';
                    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                };

                if (PRIVATE.shortName) {
                    window['disqus_shortname'] = PRIVATE.shortName; //jshint ignore:line
                    window['disqus_url'] = pkg.context.page.get("canonical_url"); //jshint ignore:line

                    $.ajax({
                        url: disqusUrlAuthSSO,
                        dataType: 'json',
                        xhrFields: {
                            withCredentials: true
                        },
                        cache: false,
                        success: function(data) {
                            if (data.status === 'success') {
                                disqusToken = data.token;
                                disqusApiKey = data.key;
                                PRIVATE.updateDMP(pkg.context.page.get("country"), data.idPerm, data.email);
                            }
                        },
                        complete: function() {
                            PRIVATE.loadDisqus();
                        }
                    });
                }

                PRIVATE.updateDMP = function(site, idPerm, email) {
                    if (idPerm && email) {
                        var ccodes = {'br':'28f5d9c1', 'ar':'dc93f1d9', 'cl':'3030a234', 'co':'b46c19c5', 'es':'ccb4a630', 'pe':'0d1ea5d4', 'mx':'5425a705', 'us':'4ca2a851'};
                        try {
                            dmpTagAdd(ccodes[site], '49e7720d', 'ccd', idPerm);
                            dmpTagFlush(ccodes[site], '49e7720d');
                            dmpTagAdd(ccodes[site], '49e7720d', 'he', pkg.utils.md5(email));
                            dmpTagFlush(ccodes[site], '49e7720d');
                        } catch(e) {
                            console.warn('[SSO] Unable to send info to DMP:', e);
                        }
                    }
                };

                PRIVATE.receiveMessage = function(event) {
                    if (event.origin.indexOf("//dsv-fe01-mia.tpn.terra.com") !== -1 || event.origin.indexOf("//s1.trrsf.com") !== -1) {
                        disqusToken = event.data.token;
                        disqusApiKey = event.data.key;

                        PRIVATE.loadDisqus();
                    }

                    if (event.origin.indexOf("//disqus.com") !== -1) {
                        var objDisqus = JSON.parse(event.data);

                        if (PRIVATE.enableResize && objDisqus.name === 'rendered' && objDisqus.data) {
                            if (objDisqus.data.height > PRIVATE.iframeSize) {
                                PRIVATE.enableResize = false;
                                PRIVATE.showButton();
                            }
                        } else if (objDisqus.name === 'posts.count' && objDisqus.data) {
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
                    button.innerHTML = PUBLIC.dictSocialComments.get("moreComments");

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
