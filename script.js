let accumulated_seconds = 0;
let previous_seconds = 0;
let accumulated_minutes = 0;
let previous_minutes = 0;
let accumulated_hours = 0;
let previous_hours = 0;

function intervalAction() {
    const now = new Date();
	let second_hand = document.querySelector(".second-hand");
	let minute_hand = document.querySelector(".minute-hand");
	let hour_hand = document.querySelector(".hour-hand");

	let milliseconds = now.getMilliseconds(); // Gets milliseconds (0-999)
	let fraction = Math.floor((milliseconds % 1000) / 333.3) / 3; // Maps to 0, 1/3, or 2/3

	// Seconds keep going up for continuous smooth animation
    const seconds = now.getSeconds() + fraction;
	
	if(seconds != previous_seconds)
	{
		if(seconds < previous_seconds)
			accumulated_seconds += 60;
		previous_seconds = seconds;
	}	

	// Only move the minute hand once every 5 seconds. Less drawing needed.
	const minutes =	now.getMinutes() + (Math.floor(seconds % 60 / 20) * 20) / 60;
	
	if(minutes != previous_minutes)
	{
		if(minutes < previous_minutes)
			accumulated_minutes += 60;
		previous_minutes = minutes;
	}	
	
	// Hour hand is redrawn once every minute.
	const hours = now.getHours() % 12 + (now.getMinutes() / 60);

	if(hours != previous_hours)
	{
		if(hours < previous_hours)
			accumulated_hours += 12;
		previous_hours = hours;
	}	

    // Calculate hand rotation in degrees
    const secondsDegrees = ((accumulated_seconds + seconds) / 60) * 360;
    const minutesDegrees = ((accumulated_minutes + minutes) / 60) * 360;
    const hoursDegrees = ((accumulated_hours + hours) / 12) * 360;

    // Set rotation angle for each hand
    second_hand.style.transform = `rotate(${secondsDegrees}deg)`;
    minute_hand.style.transform = `rotate(${minutesDegrees}deg)`;
    hour_hand.style.transform = `rotate(${hoursDegrees}deg)`;
        
	return intervalAction;
}

intervalAction();

const myInterval = setInterval(intervalAction, 333);

let resizeTimer;

window.addEventListener("resize", () => {
	document.body.classList.add("resize-animation-stopper");
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => {
		document.body.classList.remove("resize-animation-stopper");
	}, 1000);
});

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
		document.body.classList.add("resize-animation-stopper");
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(() => {
			document.body.classList.remove("resize-animation-stopper");
		}, 1000);
        // console.log("Tab is now visible.");
    } else if (document.visibilityState === "hidden") {
        // console.log("Tab is now hidden.");
    }
});