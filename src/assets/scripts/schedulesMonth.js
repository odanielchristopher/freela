// JS

// Função para calcular o tamanho da tela
function getScreenSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return { width, height };
}

// Função para atualizar o carrossel e os inputs de acordo com o tamanho da tela
function updateCarousel() {
  const windowWidth = getScreenSize().width;

  let numberCards = 0;
  if (windowWidth > 1290) {
    numberCards = 4;
  } else if (windowWidth > 1070) {
    numberCards = 3;
  } else if (windowWidth > 730){
    numberCards = 2;
  } else {
    numberCards = 1;
  }

  const carouselContainer = document.querySelector('.cmp-main__schedule-list_cards');
  const cards = carouselContainer.querySelectorAll('.cmp-schedules__card');
  const prevButton = document.querySelector('.cmp-contentlist__schedules_prev-btn');
  const nextButton = document.querySelector('.cmp-contentlist__schedules_next-btn');
  const radioButtonsContainer = document.querySelector('.cmp-contentlist__schedules_radio-buttons');

  let radioButtons;
let currentRadioIndex = 0;

// Função para atualizar os botões de rádio com base no índice do conjunto de cards atual
function updateRadioButtons() {
  const selectedRadioIndex = currentCardIndex / numberCards;
  if (selectedRadioIndex !== currentRadioIndex) {
    currentRadioIndex = selectedRadioIndex;
    radioButtons.forEach((radioButton, index) => {
      radioButton.checked = index === selectedRadioIndex;
    });
  }
}

// Função para mostrar os cards com base no índice do conjunto de cards selecionado
function showCardsByRadio(index) {
  const startIndex = index * numberCards;
  showCards(startIndex);
  currentCardIndex = startIndex;
  updateRadioButtons();
}

// Atualize o número de inputs de acordo com o número de cards visíveis
function updateRadioButtonsContainer() {
  const radioButtonsContainer = document.querySelector('.cmp-contentlist__schedules_radio-buttons');
  radioButtonsContainer.innerHTML = '';
  for (let i = 0; i < Math.ceil(cardCount / numberCards); i++) {
    const input = document.createElement('input');
    input.type = 'radio';
    input.classList.add('cmp-contentlist__schedules_radio-input');
    input.name = 'schedules_radio-btn';
    input.id = `cmp-schedules_radio-btn${i + 1}`;
    if (i === currentRadioIndex) {
      input.checked = true;
    }

    const label = document.createElement('label');
    label.htmlFor = `cmp-schedules_radio-btn${i + 1}`;

    input.addEventListener('change', () => {
      showCardsByRadio(i);
    });

    radioButtonsContainer.appendChild(input);
    radioButtonsContainer.appendChild(label);
  }

  radioButtons = document.querySelectorAll('.cmp-contentlist__schedules_radio-input');
}

  const cardCount = cards.length;
  let currentCardIndex = 0;

  function showCards(startIndex) {
    cards.forEach((card, index) => {
      if (index >= startIndex && index < startIndex + numberCards) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function showNextCards() {
    currentCardIndex += numberCards;
    if (currentCardIndex >= cardCount) {
      currentCardIndex = 0;
    }
    showCards(currentCardIndex);
    updateRadioButtons();
  }

  function showPrevCards() {
    currentCardIndex -= numberCards;
    if (currentCardIndex < 0) {
      currentCardIndex = Math.floor((cardCount - 1) / numberCards) * numberCards;
    }
    showCards(currentCardIndex);
    updateRadioButtons();
  }

  function updateRadioButtons() {
    const radioButtons = document.querySelectorAll('.cmp-contentlist__schedules_radio-input');
    const selectedRadioIndex = currentCardIndex / numberCards;
    radioButtons.forEach((radioButton, index) => {
      radioButton.checked = index === selectedRadioIndex;
    });
  }

  prevButton.addEventListener('click', showPrevCards);
  nextButton.addEventListener('click', showNextCards);

  // Atualize o número de inputs de acordo com o número de cards visíveis
  radioButtonsContainer.innerHTML = '';
  for (let i = 0; i < Math.ceil(cardCount / numberCards); i++) {
    const input = document.createElement('input');
    input.type = 'radio';
    input.classList.add('cmp-contentlist__schedules_radio-input');
    input.name = 'schedules_radio-btn';
    input.id = `cmp-schedules_radio-btn${i + 1}`;
    if (i === 0) {
      input.checked = true;
    }

    const label = document.createElement('label');
    label.htmlFor = `cmp-schedules_radio-btn${i + 1}`;

    radioButtonsContainer.appendChild(input);
    radioButtonsContainer.appendChild(label);
  }

  // Atualize o número de inputs de acordo com o número de cards visíveis
  updateRadioButtonsContainer();

  // Mostrar o primeiro conjunto de cards
  showCards(currentCardIndex);

  // Mostrar o primeiro conjunto de cards
  showCards(currentCardIndex);
}



// Ouça o evento de redimensionamento da janela para atualizar o carrossel e os inputs
window.addEventListener('resize', updateCarousel);

// Atualize o carrossel e os inputs quando a página for carregada
document.addEventListener('DOMContentLoaded', updateCarousel);


