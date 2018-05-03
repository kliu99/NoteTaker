// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    // Regex pattern of Udacity classroom
    var re = "https:\/\/classroom\.udacity\.com\/courses\/.*\/lessons\/";
    if (tab.url.match(re) !== null) {
        // show the page action
        chrome.pageAction.show(tabId);
    }

    // enable anyway for debug
    // chrome.pageAction.show(tabId);
});

// Replace with github page
// const HOMEPAGE = "http://localhost:3000"
const HOMEPAGE = "https://kliu99.github.io/NoteTaker/"

// When the page-action button is clicked
chrome.pageAction.onClicked.addListener((tab) => {
    // ...check the URL of the active tab against our pattern and...
    chrome.tabs.sendMessage(tab.id, { text: 'get_dom' }, (src) => {
        // TODO: Host the app on github repo. 
        // Set tab url with github repo url.
        if (src.status === "ok") {
            // Get the video id
            let rawUrl = src.content;
            const startIdx = rawUrl.lastIndexOf('/') + 1;
            const endIdx = rawUrl.indexOf('?') - 1;
            const url = rawUrl.substr(startIdx, endIdx - startIdx + 1);
            // Open the app with url speicified
            chrome.windows.create({
                url: `${HOMEPAGE}/#/v/${url}`,
                type: 'popup',
                focused: true
            });
        } else {
            // Open the app without speicify url
            chrome.windows.create({
                url: `${HOMEPAGE}`,
                type: 'popup',
                focused: true
            });
        }
    });
});