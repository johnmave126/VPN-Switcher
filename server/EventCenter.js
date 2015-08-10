/**
 * EventCenter.js
 *
 * Create a generic event center for the application
 * Also bind external message to this event center
 */

EventCenter = new EventEmitter();

Meteor.startup(function() {
    var punt = Meteor.npmRequire('punt');
    var ext_server = punt.bind('127.0.0.1:3001');

    ext_server.on('message', Meteor.bindEnvironment(function(msg) {
        if(msg instanceof Object && typeof msg.type === 'string') {
            EventCenter.emit(msg.type, msg.data);
        }
    }));
});

