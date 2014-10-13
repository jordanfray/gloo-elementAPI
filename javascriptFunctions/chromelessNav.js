//delay firing the "next" button URL so that the databag has time to set
function delayedNav = function() {
    setTimeout(function() {
        if (navigator.userAgent.match(/Android/i)) {
            document.location = "gloo://app/applets/next_applet";     
        } else {
            window.location.replace("gloo://app/applets/next_applet");
        }
    }, 300);
};