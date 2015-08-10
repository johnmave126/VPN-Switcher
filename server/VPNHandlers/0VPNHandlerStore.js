/** VPNHandlerStore.js
  *
  * This files defines a store for VPN Handler.
  * It is very simple, just to store and retrieve handler by name
  */

VPNHandlerStore = Object.create({
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
        this[name] = handler;
    }
}, {
    length: {
        configurable: false,
        enumerable: false,
        get: function() {
            return Object.keys(this).length;
        },
        set: function() { }
    }
});

