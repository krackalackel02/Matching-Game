function shuffleCards() {
	const game = document.querySelector(".game");
	const cards = Array.from(game.children);

	// Save the original positions of the cards
	const originalPositions = cards.map((card) => ({
		left: card.offsetLeft,
		top: card.offsetTop,
	}));

	// Randomize the order of the cards
	cards.sort(() => Math.random() - 0.5);

	// Move cards to the center of the viewport using absolute positioning and rotation
	cards.forEach((card, index) => {
		card.style.transition = "all  ease-in-out";
		card.style.transform = `translate(-50%, -50%) rotate(${getRandomRotation()}deg)`;
		card.style.zIndex = index + 2;
		card.style.position = "absolute";
		card.style.left = "50%";
		card.style.top = "50%";
	});

	setTimeout(() => {
		// Shuffle animation
		cards.forEach((card, index) => {
			const originalPosition = originalPositions[index];
			card.style.transition = "all 0.3s ease-in-out";
			card.style.transform = `translate(${
				originalPosition.left - card.offsetLeft
			}px, ${originalPosition.top - card.offsetTop}px) rotate(0deg) `;
			card.style.zIndex = index + 2;
		});
	}, 500);
}

function getRandomOffset() {
	const min = -100;
	const max = 100;
	return Math.floor(Math.random() * (max - min + 1)) + min + "px";
}

function getRandomRotation() {
	const min = -15;
	const max = 15;
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener("DOMContentLoaded", () => {
	shuffleCards();
	initializeGame();
});

let playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", () => {
	location.reload();
});
function initializeGame() {
	let images = document.querySelectorAll(".item img");
	let cards = document.querySelectorAll(".item");
	let matchRemaining = document.querySelector("#Match .number");
	let totalMatches = images.length / 2;
	let matchesRemaining = totalMatches;
	matchRemaining.textContent = matchesRemaining;
	let totalMisses = document.querySelector("#Miss .number");
	let missCount = 0; // Number of incorrect calls
	totalMisses.textContent = missCount;

	let flippedCards = []; // Array to store flipped cards
	let matchedCount = 0; // Number of matched pairs
	let isClicking = false; // Flag to track if clicking is allowed

	images.forEach((image) => {
		image.addEventListener("click", handleClick);
	});

	function handleClick(e) {
		if (isClicking) {
			return; // Ignore the click event if clicking is not allowed
		}

		let card = e.target.parentElement;
		let pic = e.target;

		// Check if the clicked card is already matched or flipped
		if (
			card.classList.contains("matched") ||
			card.classList.contains("flipped")
		) {
			return; // Ignore the click event
		}

		if (!card.classList.contains("flipped")) {
			// Allow flipping only if the card is not already flipped
			turn(pic);
			// Check if two cards are flipped
			flippedCards.push(card);

			if (flippedCards.length === 2) {
				isClicking = true; // Disable clicking temporarily

				setTimeout(() => {
					// Check if the flipped cards match
					const [card1, card2] = flippedCards;
					const img1 = card1.querySelector("img");
					const img2 = card2.querySelector("img");

					if (img1 !== img2 && img1.alt === img2.alt) {
						// Match found
						matchedCount++;

						pulse(flippedCards);

						// Check if all matches have been found
						if (matchedCount === totalMatches) {
							// Game over
							setTimeout(() => {
								alert(
									`Congratulations! You've found ${totalMatches} matches with only ${missCount} misses!`
								);
							}, 600);
						}

						// Clear flippedCards array
						flippedCards = [];

						// Enable clicking
						isClicking = false;
					} else {
						// No match found
						missCount++;
						pulse(flippedCards);

						// Clear flippedCards array
						flippedCards = [];

						// Enable clicking
						isClicking = false;
					}

					// Update matches remaining count
					matchRemaining.textContent = matchesRemaining;
					// Update miss count
					totalMisses.textContent = missCount;
				}, 250);
			}
		}
	}

	function turn(pic) {
		let picRect = pic.getBoundingClientRect();
		let originX = picRect.width / 2;
		let originY = picRect.height / 2;
	  
		pic.style.transformOrigin = `${originX}px ${originY}px`;
	  
		pic.classList.add("flip-animation");
		flipStatus(pic);
		setTimeout(() => {
		  if (pic.getAttribute("data-state") === "back") {
			pic.style.border = "2px solid black";
			pic.src = pic.alt;
			pic.setAttribute("data-state", "front");
		  } else {
			pic.src = "./Images/question.png";
			pic.style.border = "2px solid white";
			pic.setAttribute("data-state", "back");
		  }
	  
		  pic.classList.remove("flip-animation");
		}, 250);
	  }
	  
	  
	function isMatch(flippedCards) {
		if (flippedCards.length === 2) {
			const [card1, card2] = flippedCards;
			const img1 = card1.querySelector("img");
			const img2 = card2.querySelector("img");
			if (img1 !== img2 && img1.alt === img2.alt) {
				// Add "matched" class to both cards
				card1.classList.add("matched");
				card2.classList.add("matched");

				// Clear flippedCards array
				flippedCards = [];

				// Update matches remaining count
				matchesRemaining--;
				return "green";
			} else {
				return "red";
			}
		}
	}

	function pulse(flippedCards) {
		let colour = isMatch(flippedCards);
		const [card1, card2] = flippedCards;
		const img1 = card1.querySelector("img");
		const img2 = card2.querySelector("img");
		// Add red pulse animation to both cards
		card1.classList.add("pulse-animation-" + colour);
		card2.classList.add("pulse-animation-" + colour);
		img1.style.border = "2px solid " + colour;
		img2.style.border = "2px solid " + colour;
		flipStatus(img1);
		flipStatus(img2);
		setTimeout(() => {
			if (colour === "red") {
				turn(img1);
				turn(img2);
			}
			card1.classList.remove("pulse-animation-" + colour);
			card2.classList.remove("pulse-animation-" + colour);
		}, 500);
	}

	function flipStatus(pic) {
		if (pic.getAttribute("data-state") === "back") {
		  pic.parentElement.classList.add("flipped");
		} else {
		  pic.parentElement.classList.remove("flipped");
		}
	  }
	  
	  
}

function disableClicks() {
	images.forEach((image) => {
		const card = image.parentElement;
		if (!card.classList.contains("matched")||!card.classList.contains("flipped")) {
			card.style.pointerEvents = "none";
		}
	});
}

function enableClicks() {
	images.forEach((image) => {
		const card = image.parentElement;
		if (!card.classList.contains("matched")) {
			card.style.pointerEvents = "auto";
		}
	});
}
