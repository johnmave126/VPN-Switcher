Template.dashboard.helpers({
    loadContent: function() {
        var currentContent = UI.content;
        return Blaze.isTemplate(Template[currentContent]) ? Template[currentContent] : Template['loading'];
    }
});

