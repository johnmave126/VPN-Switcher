/**
  * UI.js
  *
  * Defines basic UI object using ReactiveVar
  */

UI = Object.create(Object.prototype, {
    content: Util.createReactiveVar('welcome'),
    polymerReady: Util.createReactiveVar(false)
});

