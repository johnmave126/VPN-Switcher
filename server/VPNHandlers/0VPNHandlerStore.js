/** VPNHandlerStore.js
  *
  * This files defines a store for VPN Handler.
  * It is very simple, just to store and retrieve handler by name
  */

var DefaultHandler = {
    /**
     * init
     * Initialization of VPN
     *
     * @param{VPN} VPN The VPN site to init
     */
    init: function(VPN) {
        /* By default nothing needs to be done */
    },
    /**
     * connect
     * Connect to a VPN site
     *
     * @param{VPN} VPN The VPN site to connect
     */
    connect: function(VPN) {
    },
    switchTo: function(client, conn) {
    },
    tearSwitch: function(client, conn) {
    },
    disconnect: function(VPN) {
    }
};

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

