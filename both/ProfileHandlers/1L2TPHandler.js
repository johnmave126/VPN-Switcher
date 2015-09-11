/**
  * 1L2TPHandler.js
  *
  * Process L2TP configurations
  */

var L2TPHandler = {
    /**
      * assemble
      * @see{/both/ProfileHandlers/0ProfileHandlerStore.js:DefaultHandler.assemble}
      */
    assemble: function(settings, delta) {
        settings = settings || {};

        //Apply delta on ppp config
        var ppp_config = settings.ppp_config || [];
        var ppp_delta = delta.ppp_delta || [];

        ppp_delta.forEach(function(item) {
            if(item[0] === '+') {
                //Add one line
                ppp_config.push(item.substr(1));
            }
            else if(item[0] === '-') {
                //Remove one line if exist
                var prop = item.substr(1);
                var idx = ppp_config.indexOf(prop);
                if(idx !== -1) {
                    ppp_config.splice(idx, 1);
                }
            }
        });
        settings.ppp_config = ppp_config;

        return settings;
    }
};
var DefaultHandlerProto = Object.create(Object.getPrototypeOf(ProfileHandlerStore['default']));

ProfileHandlerStore.register('l2tp', _.extend(DefaultHandlerProto, L2TPHandler));

