zaz.use(function(pkg){
    "use strict";
    pkg.require(['dictFactory'], function(dicFactory){
        dicFactory.create({
            "name": 'SocialComments',
            "version": '1.0.0',
            "langs": {
                "pt": {
                    "moreComments": "carregar mais comentários"
                },
                "es": {
                    "moreComments": "cargar más comentarios"
                },
                "en": {
                    "moreComments": "load more comments"
                }
            }
        });
    });

});
