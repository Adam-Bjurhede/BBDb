// SHOW/HIDE MOBILE NAV BAR

const hamburger = document.querySelector(".fa-bars");
const navigation = document.querySelector(".navigation");

hamburger.addEventListener("click", () => {
  navigation.classList.toggle("show");
});

const landing = document.querySelector(".landing");
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const quoteBtn = document.querySelector(".quote-btn");

quoteBtn.addEventListener("click", () => {
  generateLanding();
});
const generateLanding = async () => {
  try {
    //   Genereate quote
    const res = await fetch(`https://www.breakingbadapi.com/api/quote/random`);

    const result = await res.json();
    console.log(result);

    // Author of Quote
    const author = result[0].author;
    // Author with (-) before
    const newAuthor = author.padStart(author.length + 1, "-");
    console.log(newAuthor);
    // Quote
    const quote = result[0].quote;
    //Quote with ("") before and after
    const newQuote = quote
      .padStart(quote.length + 1, '"')
      .padEnd(quote.length + 2, '"');
    console.log(newQuote);

    // Converts author to fit API, changes (' ') to (+)
    const [firstName, LastName] = author.split(" ");
    let character = [firstName, LastName].join("+");
    console.log(character);

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
    console.log(result2);
    // Calls funtion to render img on page
    renderImg(characterImg);

    //CATCH ERRORS
  } catch (err) {
    console.log(err);
  }
};

//RENDER FUNCTIONS
const quoteOnPage = (data1, data2) => {
  author.innerText = data1;
  quote.innerText = data2;
};

const renderImg = (url) => {
  landing.style.backgroundImage = `url(${url})`;
};

// setInterval(generateLanding, 5000);
generateLanding();

const test = async () => {
  const res = await fetch(`https://www.breakingbadapi.com/api/characters`);
  const result = await res.json();
  console.log(result);
};

test();
