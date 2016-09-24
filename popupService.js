/**
 * Created by Robbie on 24/09/2016.
 */
window.onload = function() {
    document.getElementById("submit").onclick = function () {
        var phrase = document.getElementById("newBlock").value;
        chrome.storage.sync.get({"blacklist": []}, function (val) {
            var f = val.blacklist;
            f[f.length] = phrase;

            chrome.storage.sync.set({"blacklist": f}, function () {
                chrome.storage.sync.get('blacklist', function (val) {
                    console.log(val.blacklist);
                });
            });
        });
    }

    document.getElementById('clear').onclick = function(){
        chrome.storage.sync.clear(function(){
            alert("cleared");
        });
    }
}