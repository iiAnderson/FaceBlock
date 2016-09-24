/**
 * Created by Robbie on 24/09/2016.
 */
$("._5pcb").on('DOMNodeInserted', function() {
    blockPosts();
});

function blockPosts(){
    var posts = document.getElementsByClassName("userContentWrapper");
    chrome.storage.sync.get('blacklist', function (val) {
        var blacklist = val.blacklist;
    for(var i=0; i<blacklist.length; i++){
        for (var j = 0; j < posts.length; j++) {
            if(posts[j].innerHTML.indexOf(blacklist[i].name) != -1){
                blacklist[i].removes = blacklist[i].removes + 1;
                var parent = posts[j].parentNode;
                parent.parentNode.removeChild(parent);
            }
        }
    }
    chrome.storage.sync.clear(function(){
        chrome.storage.sync.set({'blacklist': blacklist}, function () {
        });
    });
    });
}