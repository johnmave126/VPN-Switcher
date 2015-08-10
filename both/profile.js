/**
  * profile.js
  *
  * Defines profile for connection of a VPN
  * Profile is organised in tree structure, and provided with a delegated
  * method to compute its real value. We enforced that
  * this real value must be fitted into EJSON, because
  * we also create a system to cache the real value for
  * performance.
  */
var Profile = function(doc) {
    _.extend(this, doc);
};

_.extend(Profile.prototype, {
    getComputedSettings: function() {
        //Get Array of ancestor with right order
        var that = this;

        //If cache is not dirty, return cached result
        if(!this.dirty) {
            return this.cached_settings;
        }

        //Collect all outdated ancestors
        var invalid_ancestors = Profiles.find({
            _id: {$in: that.ancestors},
            dirty: true
        }).fetch().sort(function(a, b) {
            return that.ancestors.indexOf(a._id) - that.ancestors.indexOf(b._id);
        });

        //Get initial settings
        var settings = invalid_ancestors[0].parent && Profiles.findOne(invalid_ancestors[0].parent).getComputedSettings();
        //Find appropriate handler
        var handler = ProfileHandlerStore.get(this.type);
        //Walk invalid_ancestors and update each one
        return invalid_ancestors.reduce(function(prev_settings, doc) {
            //Get new settings
            var new_settings = handler.assemble(prev_settings, doc.delta);
            //Update doc without triggering update hook
            //TODO: do we need update if current here?
            Profiles.direct.update(doc._id, {
                $set: {
                    cached_settings: new_settings,
                    dirty: false,
                }
            });
            return new_settings;
        }, settings);
    }
});

Profiles = new Mongo.Collection('Profiles', {
    transform: function(doc) {
        return new Profile(doc);
    }        
});

if(Meteor.isServer) {
    //Generate cache on insertion and update
    Profiles.before.insert(function(userId, doc) {
        //Set dirty bit
        doc.dirty = true;
    });
    Profiles.after.insert(function(userId, doc) {
        //Just call getComputedSettings to update the doc
        this.transform().getComputedSettings();
    });
    Profiles.after.update(function(userId, doc, fieldNames, modifier, options) {
        if(!EJSON.equals(this.delta, this.previous.delta)) {
            //Invalidate all offsprings
            Profiles.direct.update({ancestors: this._id}, {$set: {dirty: true}});
            //Generate cache for this node
            this.dirty = true;
            //Just call getCOmputedSettings to update the cache
            this.transform().getComputedSettings();
        }
    });

    //Generate ancestor array on insertion
    Profiles.before.insert(function(userId, doc) {
        var parent = doc.parent;
        var ancestors = [doc._id];
        if(parent) {
            var parent_doc = Profiles.findOne(doc.parent);
            if(parent_doc) {
                ancestors = parent_doc.ancestors.concat(doc._id);
            }
            else {
                doc.parent = null;
            }
        }
        doc.ancestors = ancestors;
    });
}

