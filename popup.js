/**
 * Initially called when extension page loads. Attaches click handlers to all the buttons.
 */
function init() {
    var audio = new Audio('birdsound.mp3');
    console.log(audio);
    audio.play();
	document.getElementById("lotus").innerText = localStorage["lotus-selection"] || 5;
	document.getElementById("break").innerText = localStorage["break-selection"] || 6;
    document.getElementById("round").innerText = localStorage["round-selection"] || 5;

	var buttonGroups = document.getElementsByClassName("time-buttons-group")
	Array.prototype.forEach.call(buttonGroups, function(divElem) {

		Array.prototype.forEach.call(divElem.childNodes, function(elem) {
			elem.onclick = timeButtonOnClickHandler;
		});

	});

}

/**
 * Add click handlers to settings for user.
 */
function timeButtonOnClickHandler(event) {

	var targetElem = event.target;
	var timeSelected = +targetElem.innerText; // Get button text and convert to number
	var settingKey = targetElem.parentNode.id; // Get id of node (tells us whether break or pomodoro)
	localStorage[settingKey] = timeSelected; // Save in localstorage.
	document.getElementById(settingKey.split("-")[0]).innerText = timeSelected;
}

document.addEventListener('DOMContentLoaded', init);