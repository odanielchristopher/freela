// JS
document.addEventListener("DOMContentLoaded", function() {
  // Selecionar os elementos relevantes do carrossel
  const prevBtn = document.querySelector('.cpm-main__navigation-prevbnt');
  const nextBtn = document.querySelector('.cpm-main__navigation-nextbnt');
  const inputs = document.querySelectorAll('.cmp-main__navigation_radio');

  // Definir o índice inicial do input selecionado
  let currentIndex = 0;

  // Atualizar o input selecionado e os botões de navegação
  function updateNavigation() {
    inputs.forEach((input, index) => {
      if (index === currentIndex) {
        input.checked = true;
        input.parentElement.classList.add("active");
      } else {
        input.parentElement.classList.remove("active");
      }
    });

    // Desabilitar o botão anterior quando o primeiro input estiver selecionado
    prevBtn.disabled = currentIndex === 0;

    // Desabilitar o botão próximo quando o último input estiver selecionado
    nextBtn.disabled = currentIndex === inputs.length - 1;
  }

  // Atualizar o carrossel quando um botão de navegação for clicado
  function updateCarousel(action) {
    if (action === 'next') {
      currentIndex = (currentIndex + 1) % inputs.length;
    } else if (action === 'prev') {
      currentIndex = (currentIndex - 1 + inputs.length) % inputs.length;
    }
    updateNavigation();
  }

  // Adicionar evento de clique ao botão de próxima imagem
  nextBtn.addEventListener('click', () => {
    updateCarousel('next');
  });

  // Adicionar evento de clique ao botão de imagem anterior
  prevBtn.addEventListener('click', () => {
    updateCarousel('prev');
  });

  // Adicionar evento de clique aos inputs para atualizar o carrossel
  inputs.forEach((input, index) => {
    input.addEventListener('click', () => {
      currentIndex = index;
      updateNavigation();
    });
  });

  // Atualizar o estado do carrossel inicialmente
  updateNavigation();
});

