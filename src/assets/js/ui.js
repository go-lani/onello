export default () => {
  const $wrap = document.querySelector('#wrap');
  const $menuBtn = document.querySelector('.menu-close');

  $menuBtn.onclick = () => {
    $wrap.classList.toggle('gnb-close', !$wrap.classList.contains('gnb-close'));
  };
};