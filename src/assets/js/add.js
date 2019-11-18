export default () => {
  (function () {
    const $addCategory = document.querySelector('.create-main-work');
    const $mainCreateInput = document.querySelector('.main-create-input');

    const $addDetail = document.querySelector('.create-detail-btn');
    const $detailCreateInput = document.querySelector('.detail-create-input');

    const toggle = (target) => {
      target.classList.toggle('on', !target.classList.contains('on'));
      target.nextElementSibling.focus();
    };

    const add = (target, keyCode) => {
      let value = target.value.trim();
      if (keyCode !== 13 || value === '') return;

      target.previousElementSibling.classList.remove('on');
      console.log(value);
      target.value = '';
    };

    // Events
    $addCategory.onclick = ({ target }) => {
      toggle(target);
    };

    $mainCreateInput.onkeyup = ({ target, keyCode }) => {
      add(target, keyCode);
    };

    $mainCreateInput.onblur = ({ target }) => {
      const value = target.value.trim();
      if (value !== '') return;

      target.previousElementSibling.classList.remove('on');
    };

    $addDetail.onclick = ({ target }) => {
      toggle(target);
    };

    $detailCreateInput.onkeyup = ({ target, keyCode }) => {
      add(target, keyCode);
    };

    $detailCreateInput.onblur = ({ target }) => {
      const value = target.value.trim();
      if (value !== '') return;

      target.previousElementSibling.classList.remove('on');
    };
  }());
};