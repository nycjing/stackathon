/**
 * Initially called when extension page loads. Sets up a bunch of stuff.
 */
function init() {
	addOnClick();
	addMessageListeners();
	startTimer();
}


/**
 * Sends a message to background page to start the timer.
 */
function startTimer() {
	chrome.runtime.sendMessage({
		"command": "startTimer"
	}, function(response) {
		console.log(response.message);
	});
}

var counter = localStorage["round-selection"]*localStorage["lotus-selection"]+0.5;
/**
 * Adds listeners so it knows how to handle the messages from the background page.
 */
function addMessageListeners() {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		switch(request.command) {
			case "updateTime":
                counter--;
                console.log(counter)
                if(counter > 0) {
                    document.getElementById("current-time").innerText = request.time;
                    break;
				}
				else{
                    chrome.runtime.sendMessage({
                        "command": "endTimer"
                    });
                    document.location = chrome.runtime.getURL("popup.html");
                    chrome.browserAction.setBadgeText({"text" : ""});
				}
			case "timerEnded":
				console.log("Timer ended.",counter);
				break;
		}
	});
}

/**
 * Adds onclick listener to the stop button.
 */
function addOnClick() {
	document.getElementById("stop").onclick = function() {
		chrome.runtime.sendMessage({
			"command": "endTimer"
		});
		document.location = chrome.runtime.getURL("popup.html");
		chrome.browserAction.setBadgeText({"text" : ""});

	}
}

document.addEventListener('DOMContentLoaded', init);
