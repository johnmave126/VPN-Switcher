/** DefaultHandler.js
 *
 *  This file defines a default handler for VPN
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

VPNHandlerStore.register('default', DefaultHandler);

