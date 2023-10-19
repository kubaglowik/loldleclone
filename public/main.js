
const targetWords = [
  // Lista słów dla kategorii "Kobiety"
  "Briar", "Naafiri", "Nilah", "BelVeth", "Renata Glasc", "Zeri", "Vex", "Gwen", "Rell", "Seraphine", "Samira", "Lillia", "Senna", "Qiyana", "Yuumi",
  "KaiSa", "Zoe", "Xayah", "Camille", "Taliyah", "Illaoi", "Kindred", "RekSai", "Kalista", "Jinx", "Lissandra", "Quinn",  "Vi", "Nami", "Elise",
  "Syndra", "Zyra", "Lulu", "Fiora", "Sejuani", "Ahri", "Riven", "Leona", "Orianna", "Vayne", "Karma", "Shyvana", "Caitlyn", "Cassiopeia", "Irelia",
  "LeBlanc", "Lux", "Sona", "Miss Fortune", "Akali", "Poppy", "Nidalee", "Katarina", "Janna", "Anivia", "Evelynn", "Annie", "Ashe", "Kayle", "Morgana",
  "Soraka", "Tristana", "Sivir", "Neeko",

  // Lista słów dla kategorii "Mężczyźni"
  "Milio", "K'Sante","Akshan","Viego","Yone","Sett", "Aphelios", "Sylas", "Pyke","Ornn", "Kayn", "Rakan", "Ivern", "Kled","Aurelion Sol", "Jhin",
  "Tahm Kench", "Ekko", "Bard","Azir", "Gnar", "Braum", "VelKoz", "Yasuo", "Lucian","Aatrox","Zac", "Thresh", "Zed","KhaZix", "Rengar", "Jayce",
  "Draven", "Darius", "Varus","Hecarim", "Nautilus", "Ziggs", "Viktor", "Volibear","Fizz", "Graves", "Xerath", "Talon", "Skarner", "Wukong", "Yorick",
  "Rumble", "Brand", "Lee Sin", "Nocturne", "Jarvan IV", "Maokai","Renekton", "Trundle","Swain", "Urgot", "Galio", "Vladimir", "Xin Zhao","KogMaw",
  "Olaf", "Malzahar", "Garen", "Kennen", "Shen", "Ezreal", "Mordekaiser","Gragas", "Pantheon", "Udyr", "Heimerdinger", "Shaco", "Nasus","Corki",
  "Blitzcrank", "Dr. Mundo", "Malphite", "Gangplank", "Taric","Kassadin", "Veigar",  "Rammus", "Amumu", "ChoGath", "Karthus","Tryndamere", "Twitch",
   "Singed", "Zilean", "Alistar", "Fiddlesticks","Jax", "Master Yi", "Nunu & Willump", "Ryze", "Sion","Teemo", "Twisted Fate", "Warwick"

];


const randomIndex = Math.floor(Math.random() * targetWords.length);
const targetWord = targetWords[randomIndex].toLowerCase();


if (randomIndex < 60) {
  wordCategory = "Kobieta";
} else if (randomIndex < 160) {
  wordCategory = "Mężczyzna";
}

const hints = [
  "To słowo ma " + targetWord.length + " liter",
  "Pierwsza litera to " + "'" + targetWord[0] + "'",
  "Płeć: " + wordCategory
];

const submitButton = document.getElementById("submitWord");
const wordInput = document.getElementById("wordInput");
const attemptsContainer = document.getElementById("attempts");
const resultsContainer = document.getElementById("results");
const submitHintButton = document.getElementById("submitHint");
const hintsContainer = document.getElementById("hints");

let attempts = 0;
const maxAttempts = 8;

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
      attemptsContainer.innerHTML = `<p class="text-green-500 font-semibold">Gratulacje! Słowo odgadnięte w ${attempts} próbach.</p>`;
      resultsContainer.innerHTML = `<p class="text-green-500">Wynik: ${guessedWord}</p>`;
    } else {
      attemptsContainer.innerHTML = `<p class="text-red-500 font-semibold flex justify-center">Koniec gry. Nie udało się odgadnąć słowa. Poprawne słowo to: ${targetWord}</p>`;
      resultsContainer.innerHTML = `<p class="text-red-500 font-semibold flex justify-center">Przekroczono maksymalną liczbę prób.</p>`;
    }
  } else {
    const attemptMessage = result.matchedLetters === targetWord.length
      ? `Gratulacje! Słowo jest poprawne, ale w złej kolejności.`
      : ` ${attempts}: ${generateAttemptFeedback(guessedWord, targetWord)}`;

    attemptsContainer.innerHTML += `<div class="mb-2">${attemptMessage}</div>`;
  }
  wordInput.value = "";
});

wordInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    submitButton.click();
  }
});


function displayHints() {
  hintsContainer.innerHTML = "<p class='text-blue-800'>Podpowiedzi:</p>";
  hints.forEach(hint => {
    hintsContainer.innerHTML += `<p class="text-blue-800">${hint}</p>`;
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
