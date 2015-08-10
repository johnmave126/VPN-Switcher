/**
  * DefaultHandler.js
  *
  * Gives default interface for handlers
  */

var DefaultHandler = {
    /**
      * assemble
      * Apply delta to a settings
      *
      * @param{Any} settings The settings to be applied
      * @param{Any} delta The delta to apply
      *
      * @return{Any} The result
      */
    assemble: function(settings, delta) {
        //Do nothing since we know nothing
        return settings;
    }
};

ProfileHandlerStore.register('default', DefaultHandler);

