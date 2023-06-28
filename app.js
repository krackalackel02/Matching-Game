let images = document.querySelectorAll(".item img");

images.forEach((image) => {
	image.addEventListener("click", (e) => {
		e.target.parentElement.classList.add("flipped");
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
		}, 250);
	});
});
