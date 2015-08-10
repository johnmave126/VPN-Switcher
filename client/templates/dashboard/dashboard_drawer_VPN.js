Template.dashboard_drawer_VPN.helpers({
    children: function() {
        return Categories.find({parent: this.parent && this.parent._id}, {sort: ['priority']});
    },
    hasChildren: function(category) {
        return Categories.find({parent: category._id}).count() > 0;
    }
});
