export default () => {
  // DOMs
  const $mainWork = document.querySelector('.main-work');

  function onDragStart(event) {
    const id = event.target.parentNode.id;

    event.dataTransfer.setDragImage(event.target.parentNode,145,47);
    event.dataTransfer.setData('text/plain', id);
  }

  function onDrop(event) {
    const id = event.dataTransfer.getData('text');

    const draggableElement = document.getElementById(id);

    const dropzone = event.target.parentNode.parentNode.parentNode;

    if (dropzone.classList.contains('detail-work')) {
      dropzone.appendChild(draggableElement);

      event.dataTransfer.clearData();
      event.stopPropagation();
    }
  }

  function onDragOver(event) {
    event.preventDefault();
  }

  // Events
  $mainWork.ondragstart = e => {
    onDragStart(e);
  };

  $mainWork.ondragover = e => {
    onDragOver(e);
  };
  $mainWork.ondrop = e => {
    onDrop(e);
  };
};