
  const targetWords = [
    "Briar", "Naafiri", "Milio", "K'Sante", "Nilah", "BelVeth", "Renata Glasc",
    "Zeri", "Vex", "Akshan", "Gwen", "Viego", "Rell", "Seraphine", "Samira", "Yone",
    "Lillia", "Sett", "Aphelios", "Senna", "Qiyana", "Yuumi", "Sylas", "Neeko", "Pyke",
    "KaiSa", "Zoe", "Ornn", "Kayn", "Rakan", "Xayah", "Camille", "Ivern", "Kled",
    "Taliyah", "Aurelion Sol", "Jhin", "Illaoi", "Kindred", "Tahm Kench", "Ekko", "Bard",
    "RekSai", "Kalista", "Azir", "Gnar", "Braum", "VelKoz", "Yasuo", "Jinx", "Lucian",
    "Aatrox", "Lissandra", "Zac", "Quinn", "Thresh", "Vi", "Nami", "Zed", "Elise",
    "KhaZix", "Syndra", "Rengar", "Diana", "Zyra", "Jayce", "Draven", "Darius", "Varus",
    "Hecarim", "Lulu", "Fiora", "Nautilus", "Ziggs", "Sejuani", "Viktor", "Ahri", "Volibear",
    "Fizz", "Graves", "Xerath", "Riven", "Talon", "Skarner", "Wukong", "Leona", "Yorick",
    "Orianna", "Vayne", "Rumble", "Brand", "Lee Sin", "Nocturne", "Jarvan IV", "Maokai",
    "Karma", "Renekton", "Shyvana", "Caitlyn", "Cassiopeia", "Trundle", "Irelia", "LeBlanc",
    "Lux", "Swain", "Sona", "Miss Fortune", "Urgot", "Galio", "Vladimir", "Xin Zhao",
    "KogMaw", "Olaf", "Malzahar", "Akali", "Garen", "Kennen", "Shen", "Ezreal", "Mordekaiser",
    "Gragas", "Pantheon", "Poppy", "Nidalee", "Udyr", "Heimerdinger", "Shaco", "Nasus",
    "Corki", "Katarina", "Blitzcrank", "Dr. Mundo", "Janna", "Malphite", "Gangplank", "Taric",
    "Kassadin", "Veigar", "Anivia", "Rammus", "Amumu", "ChoGath", "Karthus", "Evelynn",
    "Tryndamere", "Twitch", "Singed", "Zilean", "Alistar", "Annie", "Ashe", "Fiddlesticks",
    "Jax", "Kayle", "Master Yi", "Morgana", "Nunu & Willump", "Ryze", "Sion", "Sivir",
    "Soraka", "Teemo", "Tristana", "Twisted Fate", "Warwick"
  ];

const targetWord = targetWords[Math.floor(Math.random() * targetWords.length)].toLowerCase();

const hints = [
  "To słowo ma " + targetWord.length + " liter",
  "Pierwsza litera to " + targetWord[0] + "."
];

const submitButton = document.getElementById("submitWord");
const wordInput = document.getElementById("wordInput");
const attemptsContainer = document.getElementById("attempts");
const resultsContainer = document.getElementById("results");
const hintInput = document.getElementById("hintInput");
const submitHintButton = document.getElementById("submitHint");
const hintsContainer = document.getElementById("hints");

let attempts = 0;
const maxAttempts = 5;

submitButton.addEventListener("click", () => {
  const guessedWord = wordInput.value.toLowerCase();

  if (guessedWord.length !== targetWord.length) {
    alert("Słowo musi mieć dokładnie " + targetWord.length + " liter.");
    return;
  }

  attempts++;

  const result = checkWord(guessedWord);

  if (result.isCorrect || attempts >= maxAttempts) {
    submitButton.disabled = true;
    if (result.isCorrect) {
      attemptsContainer.innerHTML = `<p class="text-green-500">Gratulacje! Słowo odgadnięte w ${attempts} próbach.</p>`;
      resultsContainer.innerHTML = `<p class="text-green-500">Wynik: ${guessedWord}</p>`;
    } else {
      attemptsContainer.innerHTML = `<p class="text-red-500">Koniec gry. Nie udało się odgadnąć słowa. Poprawne słowo to: ${targetWord}</p>`;
      resultsContainer.innerHTML = `<p class="text-red-500">Przekroczono maksymalną liczbę prób.</p>`;
    }
  } else {
    const attemptMessage = result.matchedLetters === targetWord.length
      ? `Gratulacje! Słowo jest poprawne, ale w złej kolejności.`
      : ` ${attempts}: ${generateAttemptFeedback(guessedWord, targetWord)}`;

    attemptsContainer.innerHTML += `<div class="mb-2">${attemptMessage}</div>`;
  }
});

wordInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    submitButton.click();
  }
});

submitHintButton.addEventListener("click", () => {
  const hint = hintInput.value;
  if (hint) {
    hints.push(hint);
    hintInput.value = "";
    displayHints();
  }
});

function displayHints() {
  hintsContainer.innerHTML = "<p class='text-blue-500'>Podpowiedzi:</p>";
  hints.forEach(hint => {
    hintsContainer.innerHTML += `<p class="text-blue-500">${hint}</p>`;
  });
}

displayHints();

function checkWord(guessedWord) {
  let matchedLetters = 0;

  for (let i = 0; i < targetWord.length; i++) {
    if (guessedWord[i] === targetWord[i]) {
      matchedLetters++;
    }
  }

  return { isCorrect: matchedLetters === targetWord.length, matchedLetters };
}

function generateAttemptFeedback(guessedWord, targetWord) {
  let feedback = '';

  for (let i = 0; i < targetWord.length; i++) {
    if (guessedWord[i] === targetWord[i]) {
      feedback += `<span class="text-green-500">${guessedWord[i]}</span>`;
    } else if (targetWord.includes(guessedWord[i])) {
      feedback += `<span class="text-yellow-500">${guessedWord[i]}</span>`;
    } else {
      feedback += guessedWord[i];
    }
  }

  return feedback;  
}