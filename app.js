let images = document.querySelectorAll(".item img");
let matchRemaining = document.querySelector("#Match .number");
let totalMatches = images.length / 2;
let matchesRemaining = totalMatches;
matchRemaining.textContent = matchesRemaining;

images.forEach((image) => {
	image.addEventListener("click", (e) => {
		e.target.parentElement.classList.add("flipped");
		e.target.parentElement.classList.add("pulse-animation");
		setTimeout(() => {
			if (e.target.getAttribute("data-state") === "back") {
                e.target.style.border = "2px solid black"
				e.target.src = e.target.alt;
				e.target.setAttribute("data-state", "front");
			} else {
                e.target.src = "./Images/question.png";
                e.target.style.border = "2px solid white"
				e.target.setAttribute("data-state", "back");
			}
			e.target.parentElement.classList.remove("flipped");
			e.target.parentElement.classList.remove("pulse-animation");
		}, 250);
	});
});

// Create a new click event
let clickEvent = new Event("click");