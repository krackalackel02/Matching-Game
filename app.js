let images = document.querySelectorAll(".item img");
let matchRemaining = document.querySelector("#Match .number");
let totalMatches = images.length / 2;
let matchesRemaining = totalMatches;
matchRemaining.textContent = matchesRemaining;
let totalMisses = document.querySelector("#Miss .number");
let missCount = 0; // Number of incorrect calls
totalMisses.textContent = missCount;

let flippedCards = []; // Array to store flipped cards
let matchedCount = 0; // Number of matched pairs
let clickable = true; // Variable to track if images are clickable

images.forEach((image) => {
  image.addEventListener("click", (e) => {
    if (clickable) {
      const card = e.target.parentElement;

      if (!card.classList.contains("flipped")) {
        // Allow flipping only if the card is not already flipped
        card.classList.add("flipped");
        card.classList.add("pulse-animation");

        setTimeout(() => {
          if (e.target.getAttribute("data-state") === "back") {
            e.target.style.border = "2px solid black";
            e.target.src = e.target.alt;
            e.target.setAttribute("data-state", "front");
          } else {
            e.target.src = "./Images/question.png";
            e.target.style.border = "2px solid white";
            e.target.setAttribute("data-state", "back");
          }

          card.classList.remove("flipped");
          card.classList.remove("pulse-animation");

          // Check if two cards are flipped
          flippedCards.push(card);

          if (flippedCards.length === 2) {
            clickable = false; // Disable click events temporarily

            // Check if the flipped cards match
            const [card1, card2] = flippedCards;
            const img1 = card1.querySelector("img");
            const img2 = card2.querySelector("img");

            if (img1 !== img2 && img1.alt === img2.alt) {
              // Match found
              matchedCount++;

              // Keep the matched cards face up and add green border and pulse animation
              img1.style.border = "2px solid green";
              img2.style.border = "2px solid green";
              img1.classList.add("pulse-animation-green");
              img2.classList.add("pulse-animation-green");

              // Clear flippedCards array
              flippedCards = [];

              // Update matches remaining count
              matchesRemaining--;

              // Check if all matches have been found
              if (matchedCount === totalMatches) {
                // Game over
                alert(
                  `Congratulations! You've found ${totalMatches} matches  with only ${missCount} misses!`
                );
              }

              clickable = true; // Enable click events
            } else {
              // No match found
              missCount++;
              setTimeout(() => {
                // Add red pulse animation to both cards
                card1.classList.add("pulse-animation-red");
                card2.classList.add("pulse-animation-red");

                setTimeout(() => {
                  // Flip back the unmatched cards
                  img1.src = "./Images/question.png";
                  img1.style.border = "2px solid white";
                  img1.setAttribute("data-state", "back");

                  img2.src = "./Images/question.png";
                  img2.style.border = "2px solid white";
                  img2.setAttribute("data-state", "back");

                  // Remove red pulse animation classes
                  card1.classList.remove("pulse-animation-red");
                  card2.classList.remove("pulse-animation-red");

                  // Clear flippedCards array
                  flippedCards = [];

                  clickable = true; // Enable click events
                }, 1000);
              }, 500);
            }

            // Update matches remaining count

            matchRemaining.textContent = matchesRemaining;
            // Update miss count
            totalMisses.textContent = missCount;
          }
        }, 250);
      }
    }
  });
});

let playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", () => {
  location.reload();
});

function shuffleCards() {
  const game = document.querySelector(".game");
  for (let i = game.children.length; i >= 0; i--) {
    game.appendChild(game.children[(Math.random() * i) | 0]);
  }
}

window.addEventListener("DOMContentLoaded", shuffleCards);
