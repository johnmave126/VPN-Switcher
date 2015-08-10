/**
  * VPNClient.js
  *
  * Server side manipulation of VPN clients.
  * Flush database on startup, create client record on connection, tear client record on disconnection
  */

//Flush client database on startup
Meteor.startup(function() {
    VPNClient.remove({});
});

//Add one client when a client connect to the server
Meteor.startup(function() {
    EventCenter.on('clientconnect', function(e) {
        VPNClient.insert(_.extend(e, {
            connection: null,
            connection_string: ''
        }));
        //TODO: Handle potential failure of insertion
    });
});

//Remove one client when a client disconnect
Meteor.startup(function() {
    EventCenter.on('clientdisconnect', function(e) {
        var client = VPNClient.findOne({
            interface: e.interface,
            remote_ip: e.remote_ip
        });
        if(client) {
            //Disconnect it if it exists

            //De-switch the user if it has a connection
            if(client.connection) {
                //TODO: Call De-switch
            }

            //Delete the user from database
            VPNClient.remove(client._id);
        }
    });
});

