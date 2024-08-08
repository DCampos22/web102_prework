/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (const game of games){

        // create a new div element, which will become the game card
        const gameCard = document.createElement('div');

        // add the class game-card to the list
        gameCard.classList.add('game-card');


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `
            <img src="${game.img}" class="game-img" alt="Image of ${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged}</p>
            <p>Goal: $${game.goal}</p>
            <p>Backers: ${game.backers}</p>
        `;


        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalMoneyPledged = GAMES_JSON.reduce((total, game)=> total + game.pledged, 0);

// set inner HTML using template literal

raisedCard.innerHTML = `$${totalMoneyPledged.toLocaleString()}`;
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter((games)=>{
        return games.pledged < games.goal
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
    console.log(`Number of unfunded games: ${unfundedGames.length}`);


}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);

    console.log(`Number of funded games: ${fundedGames.length}`);


}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;
const numberOfUnfundedGames = unfundedCount.length;
console.log(`Number of unfunded games: ${numberOfUnfundedGames}`);


// create a string that explains the number of unfunded games using the ternary operator
const displayStr = 
`A total of $${totalMoneyPledged.toLocaleString()} has been raised for ${GAMES_JSON.length} ${GAMES_JSON.length > 1 ? 'games' : 'game'}. 
Currently, ${unfundedCount} ${unfundedCount > 1 ? 'games' : 'game'} remain unfunded. We need your help to fund these amazing games!`;



// create a new DOM element containing the template string and append it to the description container

const fundingContent = document.createElement('p');
fundingContent.innerHTML = displayStr;
descriptionContainer.appendChild(fundingContent);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, secondTopGame] = sortedGames;

const topGameName = topGame.name;
const secondTopGameName = secondTopGame.name;

console.log("First word of the most funded game:", topGameName.split(' ')[0]); //zoo
console.log("First word of the second most funded game:", secondTopGameName.split(' ')[0]); //how

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGame = document.createElement('p');
firstGame.innerHTML = topGameName;
firstGameContainer.appendChild(firstGame); //this only shows title of second game

// do the same for the runner up item
const secondGame = document.createElement('p');
secondGame.innerHTML = secondTopGameName;
secondGameContainer.appendChild(secondGame);//this shows nothing

/************************************************************************************
 * Added Features: Search Bar
 * Skills used: spread operator, destructuring, template literals, sort 
 */

document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.querySelector('#search-box input[type="text"]');
  
    searchBox.addEventListener('input', () => {
      const query = searchBox.value.toLowerCase();
      const gameCards = document.querySelectorAll('.game-card');
  
      gameCards.forEach(card => {
        const gameName = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = gameName.includes(query) ? 'block' : 'none';
      });
    });
  });
  


