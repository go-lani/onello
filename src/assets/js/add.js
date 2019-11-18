export default () => {
  const $mainWork = document.querySelector('.main-work');
  const $addCategory = document.querySelector('.create-main-work');
  const $mainCreateInput = document.querySelector('.main-create-input');

  const toggle = (target) => {
    target.classList.toggle('on', !target.classList.contains('on'));
    target.nextElementSibling.focus();
  };

  const add = (target, keyCode) => {
    let value = target.value.trim();
    if (keyCode !== 13 || value === '') return;

    target.previousElementSibling.classList.remove('on');
    target.value = '';
  };

  // Events
  $addCategory.onclick = ({ target }) => {
    toggle(target);
  };

  $mainWork.onfocusout = ({ target }) => {
    console.log(target);
  };

  $mainCreateInput.onkeyup = ({ target, keyCode }) => {
    add(target, keyCode);
  };

  $mainCreateInput.onblur = ({ target }) => {
    const value = target.value.trim();
    if (value !== '') return;

    target.previousElementSibling.classList.remove('on');
  };

  $mainWork.onclick = ({ target }) => {
    if (target.classList.contains('create-detail-btn') || target.classList.contains('title')) toggle(target);
  };

  $mainWork.onkeyup = ({ target, keyCode }) => {
    console.log(target.value);
    add(target, keyCode);
  };
};