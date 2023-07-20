const listItems = document.querySelectorAll('.cmp-main__navigation-list_item');

listItems.forEach(item => {
  const label = item.children[0]
  const input = item.children[1];

  input.addEventListener('click', () => {
    removeClass();
    label.classList.add('cpm_main__label-on');
  });
});

function removeClass() {
  const labelOn = document.querySelector('.cpm_main__label-on');

  labelOn.classList.remove('cpm_main__label-on');
}
