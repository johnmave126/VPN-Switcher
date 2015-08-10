/** category.js
  *
  * This file declares a category collection. It is used to model category of VPN sites.
  * Basically we use ancestors array to model the tree for faster subtree query.
  * Instance of this collection must be a node in the tree. Only VPN sites can be leaf.
  * We will give VPN sites a separated collection for convenience.
  */

Categories = new Mongo.Collection('Categories');

//Generate ancestor array on insertion
if(Meteor.isServer) {
    //Generate ancestor array on insertion
    Categories.before.insert(function(userId, doc) {
        var parent = doc.parent;
        var ancestors = [doc._id];
        if(parent) {
            var parent_doc = Categories.findOne(doc.parent);
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

