zaz.use(function(pkg){

    "use strict";

    pkg.require(['dictFactory'], function(dicFactory){

        dicFactory.create({
            "name": 'socialComments',
            "version": '1.0.0',
            "state": 'ok',
            "extends": [],
            "langs": {
                "global": {
                    "termWithPlural": ["plural", "singular"]
                },
                "pt": {
                    "term": "Termo em Português"
                },
                "es": {
                    "term": "Termo in Español"
                },
                "en": {
                    "term": "Term in English"
                },

                // [optional] you can also set a term for a specific country
                // by specifying its locale
                "es-AR": {
                    "term": "Termo en Argentina"
                }
            }
        }); // end create

    }); // end requiring dictFactory

}); // end zaz.use
