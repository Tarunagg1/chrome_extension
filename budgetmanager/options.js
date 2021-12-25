$(function () {
    chrome.storage.sync.get('total', function (budget) {
        $("#total").text(budget.total);
    })

    $("#saveLimit").click(function () {
        let limitVal = $("#limit").val();
        if (limitVal) {
            chrome.storage.sync.set({ 'limit': limitVal }, function () {
                close();
            });
        }
    })

    $("#resetLimit").click(function () {
        chrome.storage.sync.set({ 'limit': 0 },function () {
            var notificationsOption = {
                type:"basic",
                title:"Total Limit reset",
                message:"ohh Snap!! You'r Total Limit reset"
            };
            chrome.notifications.create("LimitNotice",notificationsOption);
        });
    })
})