/**
  * 000Util.js
  *
  * This file is ensured to load first and provide serveral utilities
  */

Util = {
    createReactiveVar: function(defaultVal, equalsFunc) {
        var obj = new ReactiveVar(defaultVal, equalsFunc);
        return {
            configurable: false,
            enumerable: true,
            get: function() {
                return obj.get();
            },
            set: function(newValue) {
                obj.set(newValue);
            }
        };
    }
};

