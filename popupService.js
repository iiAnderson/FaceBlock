/**
 * Created by Robbie on 24/09/2016.
 */
window.onload = function() {
    document.getElementById("submit").onclick = function () {
        var phrase = document.getElementById("newBlock").value;
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
    }

    document.getElementById('clear').onclick = function(){
        chrome.storage.sync.clear(function(){
            alert("cleared");
            reset();
        });
    }

    updateList();
}

var reset = function(){
    document.getElementById("newBlock").value = "";
    updateList();
}

var updateList = function(){
    document.getElementById('blockList').innerHTML = "";
    chrome.storage.sync.get('blacklist', function (val) {
        if(val.blacklist.length == undefined) {
            return;
        }
        for(var i = 0; i < val.blacklist.length; i++){
            var dv = document.createElement('div');
            dv.innerHTML = val.blacklist[i].name + " removes: " + val.blacklist[i].removes;
            document.getElementById('blockList').appendChild(dv);
        }
    });
}