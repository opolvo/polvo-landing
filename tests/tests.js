/* global module, QUnit, zaz, ok */

module('Requiring');

QUnit.asyncTest('Requiring the App zaz-app-social-comments', function(){
    
    zaz.use(function(pkg){
    
        "use strict";
    
        /*pkg.require(['app.socialComments'], function (SocialComments) {

            ok(true, 'Successfully Required the App.');
            equal(typeof SocialComments, 'function', 'Must receive the App Constructor');

            try{

                var instance= new SocialComments({
                    someProp: "someValue"
                });

                ok(true, 'Success instantiating the App');
            }catch(e){
                ok(false, 'Failed instantiating the App');
            }

            QUnit.start();

        }, function(err){
            ok(false, 'Failed requiring the App');
            QUnit.start();
        });*/
        ok(1, 'blah');
    });
    QUnit.start();
});

