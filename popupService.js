/**
 * Created by Robbie on 24/09/2016.
 */
$(document).ready(function () {
    document.getElementById("submit").onclick = function () {
        var phrase = document.getElementById("newBlock").value;
        addToStorage(phrase);
        Service.refreshfb();
    };

    document.getElementById('clear').onclick = function(){
        chrome.storage.sync.clear(function(){
            alert("cleared");
            Service.reset();
        });
    };

    $("#liked").change(function() {
        if(this.checked) {
            Service.phrase("</span> liked this.");
            Service.updateList();
        }
    });
    $("#sponsored").change(function() {
        if(this.checked) {
            Service.phrase("Sponsored");
            Service.updateList();
        }
    });

    updateList();
});

// Contains the helper functions for the Document
var Service = {

    //Gets the blacklist, sets a new phrase and sets the blacklist
    phrase: function (phrase) {
        chrome.storage.sync.get({"blacklist": []}, function (val) {
            console.log(val);
            var f = val.blacklist;
            var obj = {};
            obj.name = phrase;
            obj.removes = 0;

            f[f.length] = obj;

            chrome.storage.sync.set({"blacklist": f}, function () {
                reset();
            });
        });
    },

    //Resets the new blacklist
    reset: function () {
        document.getElementById("newBlock").value = "";
        updateList();
    },

    //Updates the blacklist
    updateList: function () {
        document.getElementById('blockList').innerHTML = "";
        chrome.storage.sync.get('blacklist', function (val) {
            if (val.blacklist.length == undefined) {
                return;
            }
            for (var i = 0; i < val.blacklist.length; i++) {
                var table = document.getElementById('blockTable');

                var row = table.insertRow(0);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerHTML = val.blacklist[i].name;
                cell2.innerHTML = val.blacklist[i].removes;
            }
        });
    },

    //Refresh the current tab
    refreshfb : function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
        });
    }
}