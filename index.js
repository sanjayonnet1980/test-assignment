(() => {
	window.addEventListener("DOMContentLoaded", () => {
        generateCards("sort");
        const shuffleBtn = document.querySelector(".shuffle-button"),
            sortBtn = document.querySelector('.sort-button');

		shuffleBtn.addEventListener("click", () => {
			generateCards('random');
		});
		sortBtn.addEventListener("click", () => {
			generateCards("sort");
		});		
	});
	
	const generateCards = (mode) => {
        const count = 9;
		let cards = '',
			tempArray = [],
			number = 0;
		
		while(tempArray.length < count){
			(mode === "sort") ? number = tempArray.length + 1 : number = (Math.ceil(Math.random() * count));
			if(tempArray.indexOf(number) === -1 ) {
				cards += '<div class="card card_' + number + '">' + number + '</div>';
				tempArray.push(number);
			}
		}
		document.querySelector('.cards-container').innerHTML = cards;
	}
})();