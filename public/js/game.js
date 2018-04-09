(function(){

	// Constants
	const cardArea = document.getElementById('cardArea');
	const startGameButton = document.getElementById('startGame');

	// Event Listeners
	startGameButton.addEventListener('click', newGame);

	// Clears any existing game and starts a new game
	function newGame() {

		// Fade in the game board if not visible
		let gameBoard = document.getElementById('gameBoard');
		$(gameBoard).fadeIn();

		// Remove cards from previous game
		while (cardArea.firstChild) {
	    	cardArea.removeChild(cardArea.firstChild);
		}

		// Temporary holder for card elements
		let newCards = document.createDocumentFragment();

		for(let i = 0; i < 16; i++) {

			// Create a match number for each item e.g. 1,1,2,2,3,3
			let matchNumber = Math.ceil((i + 1) / 2);

			// Create card element
			let card = document.createElement('div');
			card.classList.add('card');
			card.setAttribute('data-match', matchNumber);

			// Create card top (Back of the card)
			let front = document.createElement('div');
    		front.classList.add('front');
    		front.style.display = 'none';

    		// Create card bottom (Front of the card with the picture)
    		let back = document.createElement('div');
    		back.classList.add('back');
    		back.style.backgroundImage = `url('public/images/cards/${matchNumber}.png')`;

    		// Append the card top and bottom to the card
    		card.appendChild(front);
    		card.appendChild(back);

    		// Append the new card to the temporary card holder
    		newCards.appendChild(card);

		}

		// Shufle the cards
		shuffleChildren(newCards);

		// Add the new cards to the DOM card area
		cardArea.appendChild(newCards);

		// Fade the cards in one by one
	  	for(let j = 0; j < cardArea.children.length; j++) {

	  		// Set length of delay for card fade in
	  		let delay = j * 40;

	  		// Fade in the card
	  		setTimeout(function(){
	  			$(cardArea).children().eq(j).children('.front').fadeIn();
	  		}, delay);

	  	}

	}

	// Shuffles the children of a parent DocumentFragment
	function shuffleChildren(parent) {

		for(let i = parent.children.length; i >= 0; i--) {
	  		parent.appendChild(parent.children[Math.random() * i | 0]);
	  	}

	}
	

})();