$(function () {

    chrome.storage.sync.get(['total','limit'], function (budget) {
        console.log(budget);
        $("#total").text(budget.total);
        $("#limit").text(budget.limit);
    })

    $("#spendAmount").click(function () {
        chrome.storage.sync.get(['total','limit'], function (budget) {
            let newTotal = 0;
            if (budget.total) {
                newTotal += parseInt(budget.total);
            }
            let amount = $('#amount').val();
            if (amount) {
                newTotal += parseInt(amount);
            }
            chrome.storage.sync.set({'total': newTotal },function(){
                if(amount && newTotal >= budget.limit){
                    var notificationsOption = {
                        type:"basic",
                        title:"Limit reached",
                        message:"ohh Snap!! You exceed Limit"
                    };
                    chrome.notifications.create("LimitNotice",notificationsOption);
                }
            });
            $("#total").text(newTotal);
            $("#amount").val('');
        })
    })
})