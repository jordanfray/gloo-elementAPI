function customAnalyticEvent(buttonID, key, value) {
    $(buttonID).click(function() {
        elementAPI.createAnalyticEvent(key, value); // Send analytic event
    });
};