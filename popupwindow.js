/**
 * Created by Robbie on 24/09/2016.
 */
chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('popupPage.html',
        { "innerBounds": { "width": 400, "height": 300 },
            "id": "index"
        });
});