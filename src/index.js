/* eslint-disable no-func-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
let cards = [];
let sum = 0;
let houseSum = 0;
let valores = [sum, houseSum];
let hasBlackJack = false;
let isAlive = false;
let betState = false;
let goal = 21;
let winner = false;
let loser = false;
let bet = 0;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
let houseEl = document.getElementById("house-el");
let winnerEl = document.getElementById("winner-el");
let potEl = document.getElementById("pot-el");




function player(name, chips) {
	this.name = name;
	this.chips = chips;
}


player = new player ("Player chips", 200);


function getRandomCard() {
	let randomNumber = Math.floor( Math.random()*13 ) + 1;
	if (randomNumber > 10) {
		return 10;
	} else {
		return randomNumber;
	} 
}


function startGame() {

	playerEl.textContent = player.name + ": $" + player.chips;

	if (betState === true){
		isAlive = true;
		winner = false;
		let firstCard = getRandomCard();
		let secondCard = getRandomCard();
		cards = [firstCard, secondCard];
		sum = firstCard + secondCard;
		houseSum = 0;
		houseEl.textContent = "House sum:";
		renderGame();
	} else {
		alert("You need to bet!");
	}
    
}

function saveBet() {
	bet = document.getElementById("userInput").value;
	document.getElementById("userInput").value = "";
	alert(bet);
	betState = true;
	return bet;    
}

function calculateChips() {
	if (winner === true) {
		player.chips += bet;
		playerEl.textContent = player.name + ": $" + player.chips;
	} else if (loser === true) {
		player.chips -= bet;
		playerEl.textContent = player.name + ": $" + player.chips;
	} else {}
}

function renderGame() {
	cardsEl.textContent = "Cards: ";
	
	for (let i = 0; i < cards.length; i++) {
		cardsEl.textContent += cards[i] + " ";
		winnerEl.textContent = "Winner:";
	}
    
	sumEl.textContent = "Sum: " + sum;
	if (sum <= 20) {
		message = "Do you want to draw a new card?";
	} else if (sum === 21) {
		message = "You've got Blackjack!";
		hasBlackJack = true;
		winner = true;
		betState = false;
		calculateChips();
	} else {
		message = "You're out of the game!";
		isAlive = false;
		betState = false;
		loser = true;
		winnerEl.textContent += " " + "The house win!";
		calculateChips();
	}
	messageEl.textContent = message;
}


function restart() {
	window.location.reload();
}

function newCard() {
	if (isAlive === true && hasBlackJack === false) {
		let card = getRandomCard();
		sum += card;
		cards.push(card);
		renderGame();        
	}
}



function stop() {

	betState = false;
	if (isAlive === true) {
		while (houseSum < sum && houseSum < 21) {
			houseSum += getRandomCard();
		}

		houseEl.textContent += houseSum;      

		if (sum>21 || sum === houseSum && hasBlackJack === false || sum < houseSum && houseSum <= 21){
			winnerEl.textContent += " " + "The house win!";
			loser = true;
			calculateChips();
			console.log(player.chips);
		} else if (sum === 21 || sum > houseSum || houseSum > 21) {
			winnerEl.textContent += " " + "You win!!";
			winner = true;
			calculateChips();
			console.log(player.chips);
		} else {}
		
	} else {}

}

