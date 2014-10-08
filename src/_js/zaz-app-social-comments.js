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
            dependencies: ["jQuery"],
            dictionaries: ['socialComments'],

            // the list of templates
            templates: {
                // change the tamplate names and contents here
                // use nunjucks template syntax as you wish
                tpl1: "<span>${someProp}</span>",
                tpl2: "%term",
                tpl3: "// !include _templates/tpl-example.html"
            },

            // [optional] In case you want to define a schema for your new instances arguments
            expects: {
                // this means, whoever runs "new SocialComments(data);" must pass data,
                // as an object, with at lease the property "someProp", and it must be a string
                properties: {
                    someProp: { type: 'string', required: true }
                }
            },

            // [optional] used if your App allows extensions
            extendable: {
                // name your plugs
                plug1: {
                    // and set the schema they require to be extended
                    properties: { /* ... */ }
                }
            },

            // to be called once, the first time your app is required by a script
            setup: function (__static, __proto, __shared) {

                // here, both "this" and __proto are the prototype for your App
                var PRIVATE = {};
                PUBLIC_STATIC = __static;

                PUBLIC_STATIC.staticData = 123;
                __proto.someData = 456;

            },

            // this method will be called everytime a script runs "new SocialComments(data);"
            init: function (data, __shared) {

                // here, "this" is the instance itself
                // data, is the passed object to the constructor and must fit the
                // expects description, if it was defined


                var PUBLIC = this,
                    PRIVATE = {};


                /**
                 * Do something.
                 *
                 * Delete this method to create your own.
                 *
                 * @method doSomething
                 * @param first {String} The first param
                 * @param [second] {Mixed} Another param, optional
                 * @return {SocialCommentsInstance}
                 * @chainable Returns the same instance object, therefore, it's chainable
                 */
                this.doSomething = function (first, second) {
                    // do something
                    return this;
                };

                // for example, you know that you received a "someProp", once
                // it was in your expected property
                this.set('someProp', data.someProp);


                return PUBLIC;

            },


            // [optional] called whenever "SocialComments.extend(data);" is called
            extend: function (data, __static, __proto, __shared) {
                // called when an extension matches its conditions for the first time
            },

            // [optional] how you turn on, addons that were off
            turnOn: function() {
                // called when an extension that was off, becomes back on
            },

            // [optional] how you turn addons off
            turnOff: function() {
                // called whenever an extension becomes off
            },

            // called whenever "SocialComments.destroy();" is called
            teardown: function (why, __static, __proto, __shared) {
            }

        }); // end appFactory.create

    }); // end requiring appFactory

}); // end zaz.use
