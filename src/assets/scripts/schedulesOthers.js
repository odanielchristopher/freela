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
    carouseSlidePercentage = 102.45;
  } else {
    numberCards = 1;
    carouseSlidePercentage = 105.84;
  }

  const carouselContainer = document.querySelector('.cmp-contentlist__main-carrossel_wrapper');
  const cards = carouselContainer.querySelectorAll('.cmp-schedules__card');
  const prevButton = document.querySelector('.cmp-contentlist__carrossel_prev-btn');
  const nextButton = document.querySelector('.cmp-contentlist__carrossel_next-btn');

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
  }

  function showPrevCards() {
    currentCardIndex -= numberCards;
    if (currentCardIndex < 0) {
      currentCardIndex = Math.floor((cardCount - 1) / numberCards) * numberCards;
    }
    showCards(currentCardIndex);
  }

  prevButton.addEventListener('click', showPrevCards);
  nextButton.addEventListener('click', showNextCards);

  // Mostrar o primeiro conjunto de cards
  showCards(currentCardIndex);
}

// Ouça o evento de redimensionamento da janela para atualizar o carrossel e os inputs
window.addEventListener('resize', updateCarousel);

// Atualize o carrossel e os inputs quando a página for carregada
document.addEventListener('DOMContentLoaded', updateCarousel);
