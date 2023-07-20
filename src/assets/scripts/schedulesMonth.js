
  document.addEventListener('DOMContentLoaded', function () {
    const carouselContainer = document.querySelector('.cmp-main__schedule-list_cards');
    const cards = carouselContainer.querySelectorAll('.cmp-schedules__card');
    const prevButton = document.querySelector('.cmp-contentlist__schedules_prev-btn');
    const nextButton = document.querySelector('.cmp-contentlist__schedules_next-btn');
    const radioButtons = document.querySelectorAll('.cmp-contentlist__schedules_radio-input');
    const cardCount = cards.length;
    let currentCardIndex = 0;

    function showCards(startIndex) {
      cards.forEach((card, index) => {
        if (index >= startIndex && index < startIndex + 4) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    }

    function showNextCards() {
      currentCardIndex += 4;
      if (currentCardIndex >= cardCount) {
        currentCardIndex = 0;
      }
      showCards(currentCardIndex);
      updateRadioButtons();
    }

    function showPrevCards() {
      currentCardIndex -= 4;
      if (currentCardIndex < 0) {
        currentCardIndex = Math.floor((cardCount - 1) / 4) * 4;
      }
      showCards(currentCardIndex);
      updateRadioButtons();
    }

    function updateRadioButtons() {
      const selectedRadioIndex = currentCardIndex / 4;
      radioButtons.forEach((radioButton, index) => {
        radioButton.checked = index === selectedRadioIndex;
      });
    }

    prevButton.addEventListener('click', showPrevCards);
    nextButton.addEventListener('click', showNextCards);

    radioButtons.forEach((radioButton, index) => {
      radioButton.addEventListener('change', () => {
        currentCardIndex = index * 4;
        showCards(currentCardIndex);
      });
    });

    // Mostrar o primeiro conjunto de cards
    showCards(currentCardIndex);
  });
