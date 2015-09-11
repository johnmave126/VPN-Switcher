/** ProfileHandlerStore.js
  *
  * This files defines a store for Profile Handler.
  * It is very simple, just to store and retrieve handler by name
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

ProfileHandlerStore = Object.create({
    /**
     * get
     * Retrieve one handler from store
     *
     * @param{String} name Name of the handler
     * @return{Object} The handler requested
     */
    get: function(name) {
        return this[name] || this['default'];
    },
    /**
     * register
     * Register a handler to the store
     *
     * @param{String} name Name of the handler
     * @param{Object} handler The handler object
     */
    register: function(name, handler) {
        if(DefaultHandler.isPrototypeOf(handler)) {
            this[name] = handler;
        }
    }
}, {
    length: {
        get: function() {
            return Object.keys(this).length;
        },
        set: function() { }
    },
    default: {
        enumerable: true,
        value: Object.create(DefaultHandler)
    }
});

