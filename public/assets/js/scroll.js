const xRail = () => {
  $('#co-work-container').mCustomScrollbar({
    axis: 'x',
    theme: 'light-3',
    autoExpandScrollbar: true,
    advanced: {autoExpandHorizontalScroll: true}
  });
};

const yRail = () => {
  console.log(111);
  $('.detail-work-box').mCustomScrollbar({
    axis: 'y',
    theme: 'light-3',
    autoHideScrollbar: true
  });
};

yRail();
xRail();