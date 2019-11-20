const xRail = () => {
  $('#co-work-container').mCustomScrollbar({
    axis: 'x',
    theme: 'light-3',
    autoExpandScrollbar: true,
    advanced: {autoExpandHorizontalScroll: true}
  });
};

const yRail = () => {
  $('.detail-work-box').mCustomScrollbar({
    axis: 'y',
    theme: 'light-3',
    autoExpandScrollbar: true,
  });
};

xRail();