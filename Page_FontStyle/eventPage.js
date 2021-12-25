chrome.tabs.query({ active: true, currentWindow: true }, function (){
    chrome.pageAction.show(tabs[0]);
});





