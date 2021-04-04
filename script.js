//Ui elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const facebookButton = document.getElementById('facebook');
const twitterButton = document.getElementById('twitter');
const copyButton = document.getElementById('copy');
const quoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const snackbar = document.getElementById('snackbar');
const leftQuoteIcon = document.getElementById("leftQuoteIcon");

// Get quotes from api
let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    // quoteContainer.hidden = true;
    leftQuoteIcon.style.display = "none";
    quoteText.hidden = true;
    authorText.hidden = true;
}

function removeLoadingSpinner() {
    // quoteContainer.hidden = false;
    leftQuoteIcon.style.display = "inline-block";
    quoteText.hidden = false;
    authorText.hidden = false;
    loader.hidden = true;
}

//Display quote on screen
function displayQuote(quote) {
    authorText.textContent = quote.author ? quote.author : 'Unknown';

    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
}

//Show new quote
function newQuote() {
    const index = Math.floor(Math.random() * apiQuotes.length);
    const quote = apiQuotes[index];
    displayQuote(quote);
}

async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        removeLoadingSpinner();
    } catch(err) {
        removeLoadingSpinner();
        quoteText.textContent = "Some error occured. Please try again later!"
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

function copyQuoteToClipboard() {
    const el = document.createElement('textarea');
    el.value = quoteText.textContent + " - " + authorText.textContent;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    snackbar.className = "show";
    setTimeout(function() { 
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
}

twitterButton.addEventListener('click', tweetQuote);
quoteButton.addEventListener('click', newQuote);
copyButton.addEventListener('click', copyQuoteToClipboard);

//On Load
getQuotes();