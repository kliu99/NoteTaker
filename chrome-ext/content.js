// Listen for messages
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    // If the received message has the expected format...
    if (msg.text === 'get_dom') {
        // Call the specified callback, passing
        // the web-page's DOM content as argument
        const srcs = [...document.querySelectorAll("iframe")]
            .map(dom => dom.src)
            .filter(src => src.includes("youtube"));

        if (srcs.length == 0) {
            sendResponse({
                "status": "err",
                "content": null
            })
        } else {
            sendResponse({
                "status": "ok",
                "content": srcs[0]
            });
        }
    }
});