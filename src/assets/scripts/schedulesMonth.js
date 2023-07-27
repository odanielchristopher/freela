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
  let carouseSlidePercentage = 0;
  if (windowWidth > 1290) {
    numberCards = 4;
    carouseSlidePercentage = 100;
  } else if (windowWidth > 820) {
    numberCards = 2;
    carouseSlidePercentage = 102.3;
  } else {
    numberCards = 1;
    carouseSlidePercentage = 105.68;
  }

  const carouselContainer = document.querySelector('.cmp-contentlist__main-carrossel_wrapper');
  const cards = carouselContainer.querySelectorAll('.cmp-schedules__card');
  const prevButton = document.querySelector('.cmp-contentlist__carrossel_prev-btn');
  const nextButton = document.querySelector('.cmp-contentlist__carrossel_next-btn');
  const radioButtonsContainer = document.querySelector('.cmp-contentlist__main-carrossel_pagination');

  const cardCount = cards.length;
  let currentCardIndex = 0;

  function showCards(startIndex) {
    carouselContainer.style.transition = 'transform 0.5s ease-in-out'; // Adiciona transição para o carrossel
    carouselContainer.style.transform = `translateX(-${startIndex * (carouseSlidePercentage / numberCards)}%)`;
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
    const radioButtons = document.querySelectorAll('.cmp-contentlist__main-carrossel_input');
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
    input.classList.add('cmp-contentlist__main-carrossel_input');
    input.name = 'cmp-contentlis__carrossel-input_radio';
    input.id = `cmp-contentlist__carrossel-input${i + 1}`;
    if (i === 0) {
      input.checked = true;
    }

    input.addEventListener('change', () => {
      showCards(i * numberCards);
      currentCardIndex = i * numberCards;
      updateRadioButtons();
    });

    const label = document.createElement('label');
    label.htmlFor = `cmp-contentlist__carrossel-input${i + 1}`;

    radioButtonsContainer.appendChild(input);
    radioButtonsContainer.appendChild(label);
  }

  // Mostrar o primeiro conjunto de cards
  showCards(currentCardIndex);
}

// Ouça o evento de redimensionamento da janela para atualizar o carrossel e os inputs
window.addEventListener('resize', updateCarousel);

// Atualize o carrossel e os inputs quando a página for carregada
document.addEventListener('DOMContentLoaded', updateCarousel);
