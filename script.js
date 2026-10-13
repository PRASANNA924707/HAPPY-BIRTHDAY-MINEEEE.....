
const introButton = document.getElementById("openIntro");
const introLetter = document.getElementById("introLetter");
const exploreButton = document.getElementById("exploreButton");

const birthdaySong = document.getElementById("birthdaySong");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");
const musicLabel = document.getElementById("musicLabel");
const playerButton = document.getElementById("playerButton");
const playStatus = document.getElementById("playStatus");
const playerHint = document.getElementById("playerHint");
const progress = document.getElementById("progress");

const revealButton = document.getElementById("revealLetter");
const heartLetter = document.getElementById("heartLetter");

const icecreamButton = document.getElementById("icecreamButton");
const treatMessage = document.getElementById("treatMessage");

// Opening letter
introButton.addEventListener("click", () => {
  introLetter.hidden = false;
  introButton.hidden = true;

  introLetter.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});

exploreButton.addEventListener("click", () => {
  document.getElementById("memories").scrollIntoView({
    behavior: "smooth"
  });
});

// Scroll reveal animations
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Music player
async function toggleMusic() {
  if (birthdaySong.paused) {
    try {
      await birthdaySong.play();
    } catch (error) {
      playerHint.textContent =
        "Add a playable music.mp3 file to your repository, then tap play again.";
    }
  } else {
    birthdaySong.pause();
  }
}

musicToggle.addEventListener("click", toggleMusic);
playerButton.addEventListener("click", toggleMusic);

function updateMusicButtons() {
  const playing = !birthdaySong.paused;

  musicIcon.textContent = playing ? "Ⅱ" : "♫";
  musicLabel.textContent = playing ? "PAUSE OUR SONG" : "PLAY OUR SONG";
  playerButton.textContent = playing ? "Ⅱ" : "▶";
  playerButton.setAttribute(
    "aria-label",
    playing ? "Pause music" : "Play music"
  );
  playStatus.textContent = playing
    ? "NOW PLAYING ♡"
    : "MADE FOR THIS MOMENT";
}

birthdaySong.addEventListener("play", updateMusicButtons);
birthdaySong.addEventListener("pause", updateMusicButtons);

birthdaySong.addEventListener("loadedmetadata", () => {
  playerHint.textContent = "A little music, just for your birthday. ♡";
});

birthdaySong.addEventListener("error", () => {
  playerHint.textContent =
    "Your song will play when a valid music.mp3 file is added.";
});

birthdaySong.addEventListener("timeupdate", () => {
  if (Number.isFinite(birthdaySong.duration) &&
      birthdaySong.duration > 0) {
    const percent =
      (birthdaySong.currentTime / birthdaySong.duration) * 100;

    progress.style.width = `${percent}%`;
  }
});

// Chocolate ice cream surprise
const treats = [
  "Birthday rule #1: chocolate ice cream is always a good idea. 🍫",
  "Your happiness deserves extra sprinkles today. 🍨",
  "One imaginary chocolate scoop, with unlimited best-friend love. ♡",
  "Today's forecast: 100% sweetness, sunshine, and smiles. 🌻",
  "If happiness had a flavour, I hope yours tastes like chocolate. 🤎"
];

let treatIndex = 0;

icecreamButton.addEventListener("click", () => {
  treatMessage.textContent = treats[treatIndex];
  treatIndex = (treatIndex + 1) % treats.length;

  treatMessage.classList.remove("treat-pop");
  void treatMessage.offsetWidth;
  treatMessage.classList.add("treat-pop");
});

// Final letter
revealButton.addEventListener("click", () => {
  heartLetter.hidden = false;
  revealButton.textContent = "A letter you'll always have ♡";
  revealButton.disabled = true;

  heartLetter.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});
