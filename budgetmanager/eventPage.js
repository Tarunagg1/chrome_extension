let contextPage = {
    "id": "spendMoney",
    "title": "spendMoney",
    "contexts": ["selection"]
}

function isInt(val) {
    return !isNaN(val) && parseInt(Number(val)) == val && !isNaN(parseInt(val, 10));
}

chrome.contextMenus.create(contextPage);

chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId === "spendMoney" && clickData.selectionText) {
        if (isInt(clickData.selectionText)) {
            chrome.storage.sync.get(['total', 'limit'], function (budget) {
                let newTotal = 0;

                if (budget.total) {
                    newTotal += (parseInt(budget.total) + parseInt(clickData.selectionText));
                }

                chrome.storage.sync.set({ 'total': newTotal }, function () {
                    if (newTotal >= budget.limit) {
                        var notificationsOption = {
                            type: "basic",
                            title: "Limit reached",
                            message: "ohh Snap!! You exceed Limit"
                        };
                        chrome.notifications.create("LimitNotice", notificationsOption);
                    }
                })
            })
        }
    }
})


chrome.storage.onChanged.addListener(function (changes, storageName) {
    chrome.browserAction.setBadgeText({ "text": changes.total.newValue.toString() });
})




