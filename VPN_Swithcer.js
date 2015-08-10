if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
/*
 Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    },
    IP: function() {
      return Session.get('myIP');
    }
  });
*/  Meteor.call('getIP', function(err, res) {
     console.log(res);
     Session.set('myIP', res);
  });

 /*
  Template.hello.events({
    'click paper-button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });*/
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.methods({
    getIP: function() {
      return this.connection.clientAddress;
    }
  });
}
