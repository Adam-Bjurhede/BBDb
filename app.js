// Navbar Elements

const hamburger = document.querySelector(".fa-bars");
const navigation = document.querySelector(".navigation");

// Quote Elements
const authorImg = document.querySelector(".author-img");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const quoteBtn = document.querySelector(".quote-btn");

// Character Card Elements

const cardContainer = document.querySelector(".card-container");
const cardBtn = document.querySelector(".card-btn");
const inputCard = document.querySelector("#card-input");
const close = document.querySelector(".close");
//Search Field
const dataList = document.getElementById("datalist");

// Death Elements
const deathInput = document.querySelector(".death-input");
const deathBtn = document.querySelector(".death-btn");
const deathContainer = document.querySelector(".death-container");
const deathList = document.querySelector(".death-list");
let deaths = [];

// ---EventListeners---

//  Show/Hide Mobile Menu
hamburger.addEventListener("click", () => {
  navigation.classList.toggle("show");
});

//  Genereate quoute-btn Eventlistner
quoteBtn.addEventListener("click", () => {
  generateQuote();
});

// Generete card-btn Evenlistner
cardBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createCard();
  inputCard.value = "";
});

// Evenlistner to close card with X
cardContainer.addEventListener("click", (e) => {
  const close = e.target;
  if (close.classList[0] === "close") {
    const card = close.parentElement;
    card.remove();
  }
});

// Eventlistener to search Death
deathInput.addEventListener("keyup", (e) => {
  const search = e.target.value.toLowerCase();
  const specificDeaths = deaths.filter((death) => {
    return (
      death.death.toLowerCase().includes(search) ||
      death.responsible.toLowerCase().includes(search)
    );
  });
  renderDeaths(specificDeaths);
});

// Get all Deaths on button click
deathBtn.addEventListener("click", () => {
  renderDeaths(deaths);
});

// --- Async/Await Functions ---

//  Gets Random quote and fetches image for corresponding author of quote
const generateQuote = async () => {
  try {
    //   Genereate quote
    const res = await fetch(`https://www.breakingbadapi.com/api/quote/random`);

    const result = await res.json();
    // console.log(result);

    // Author of Quote
    const author = result[0].author;
    // Author with (-) before
    const newAuthor = author.padStart(author.length + 1, "-");
    // console.log(newAuthor);
    // Quote
    const quote = result[0].quote;
    //Quote with ("") before and after
    const newQuote = quote
      .padStart(quote.length + 1, '"')
      .padEnd(quote.length + 2, '"');
    // console.log(newQuote);

    // Converts author to fit API, changes (' ') to (+)
    const [firstName, LastName] = author.split(" ");
    let character = [firstName, LastName].join("+");
    // console.log(character);

    // Calls the function to render quote and auhtor on page
    quoteOnPage(newAuthor, newQuote);

    // Generate IMG
    if (character === "Jimmy+McGill") {
      character = "Saul Goodman";
    }
    if (character === "Chuck+McGill") {
      character = "Charles+McGill";
    }
    if (character === "Kim+Wexler") {
      character = "Kimberly+Wexler";
    }
    if (character === "Hank+Schrader") {
      character = "Henry+Schrader";
    }
    if (character === "Gus+Fring") {
      character = "Gustavo+Fring";
    }

    //Fetches the img of the character owning the quote.

    const res2 = await fetch(
      `https://www.breakingbadapi.com/api/characters?name=${character}`
    );
    const result2 = await res2.json();
    const characterImg = result2[0].img;
    // console.log(result2);
    // Calls funtion to render img on page
    renderImg(characterImg);

    //CATCH ERRORS
  } catch (err) {
    // console.log(err);
  }
};

// Asyncronouse Function to Create Card
const createCard = async () => {
  try {
    const character = inputCard.value;
    //BB API TO GET CHARACTER OBJECT
    const response = await fetch(
      `https://www.breakingbadapi.com/api/characters?name=${character}`
    );
    const data = await response.json();
    // SELECTIONG THE IMG URL FROM OBJECT
    const charImg = data[0].img;
    const charName = data[0].name;
    const nickName = data[0].nickname;
    const age = data[0].birthday;
    const occupation = data[0].occupation;
    const status = data[0].status;
    console.log(data);
    console.log(charName);
    //Render card with img
    renderCard(charImg, charName, nickName, age, occupation, status);
  } catch (err) {
    console.log(err);
  }
};

// LOOP CHARACTERS TO DATALIST
const datalistChars = async () => {
  try {
    const response = await fetch(
      `https://www.breakingbadapi.com/api/characters`
    );
    const data = await response.json();
    data.forEach((obj) => {
      const listItem = document.createElement("option");
      listItem.value = obj.name;

      dataList.appendChild(listItem);
    });
  } catch (err) {
    console.log(err);
  }
};

// Asyncronous function to get deaths object
const getDeaths = async () => {
  try {
    const response = await fetch(`https://breakingbadapi.com/api/deaths`);
    deaths = await response.json();

    // renderDeaths(deaths);
  } catch (err) {
    console.log(err);
  }
};

// ---RENDER FUNCTIONS ---

// Renders Quote and Author to page
const quoteOnPage = (data1, data2) => {
  author.innerText = data1;
  quote.innerText = data2;
};

// Renders Author img to page
const renderImg = (url) => {
  authorImg.style.backgroundImage = `url(${url})`;
};

// Render card to page
const renderCard = (img, name, nick, age, occupation, status) => {
  const card = document.createElement("div");

  card.style.backgroundImage = `url(${img})`;

  card.innerHTML = `
  <div class="close">X</div>
  <article class="card-info">
  <h3>${name}</h3>
  <ul>
  <li><span>Nickname:</span> ${nick}</li>
  <li><span>Born:</span> ${age}</li>
  <li><span>Occupation:</span> ${occupation}</li>
  <li><span>Status:</span> ${status}</li>
  </ul>
  </article>`;

  cardContainer.appendChild(card);

  card.classList.add("card");
};

// Render Deathts to page
const renderDeaths = (deaths) => {
  const content = deaths
    .map((death) => {
      return `<li class="death-item">
      <h4 class="killer">${death.responsible} </h4>  Killed <i class="fas fa-skull"></i><h4 class="killed">${death.death} <i class="fas fa-skull-crossbones"></i></h4>With<h4 class="cause"> ${death.cause}</h4>
     </li>`;
    })
    .join("");
  console.log(content);
  deathList.innerHTML = content;
};

// --- Calling Functions ---

// Quotes
generateQuote();

// Populate Searchfield wiht characters
datalistChars();

//Death API

getDeaths();
