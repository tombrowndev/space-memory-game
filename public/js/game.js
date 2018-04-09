(function(){

	// Constants
	const cardArea = document.getElementById('cardArea');
	const startGameButton = document.getElementById('startGame');

	// Game variables
	let tempCard = null;

	// Event Listeners
	startGameButton.addEventListener('click', newGame);
	cardArea.addEventListener('click', turnCard);

	// Clears any existing game and starts a new game
	function newGame(e) {

		// Stop button click from redirecting
		e.preventDefault();

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
    		//front.style.display = 'none';

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

		// Add the flip animation event to the new cards
		$('.card').flip({'trigger' : 'manual'});

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

	// Process a card click
	function turnCard(e) {

		// Check if the target was a card top, do nothing if it isn't
		if(!e.target.classList.contains('front')) return;

		// Store the card element and value that belongs to this card top
		let thisCard = e.target.parentElement;
		let thisValue = thisCard.getAttribute('data-match');

		// These will hold the previous card and values if they exist
		let prevCard;
		let prevValue;

		// Check if this is a first card flip
		if(tempCard === null) {

			// Store this card for comparison to future second card
			tempCard = thisCard;


		} else {

			// Retrieve the first card
			prevCard = tempCard;
			prevValue = tempCard.getAttribute('data-match');

			// Remove the temporary card asap for responsivness
			tempCard = null;

		}

		// Flip the card
		$(thisCard).flip(true, function(){

			// Check if this is the second card
			if(typeof prevCard !== 'undefined') {
				
				// If the match values match
				if(prevValue === thisValue) {

					// Blinking effect on card match
					$(thisCard).effect('pulsate');
					$(prevCard).effect('pulsate');

					// Do nothing
					return;

				} else {

					// Shake and Flip this card back
					$(thisCard).effect({
						effect: 'shake',
						complete: function(){
							setTimeout(function(){
								$(thisCard).flip(false);
							}, 500);
						}
					});

					// Shake and Flip the previous card back
					$(prevCard).effect({
						effect: 'shake',
						complete: function(){
							setTimeout(function(){
								$(prevCard).flip(false);
							}, 500);
						}
					});

				}

			}


		});

	}
	

})();