function onDragStart(event) {
  const id = event.target.parentNode.id;

  event.dataTransfer.setDragImage(event.target.parentNode,145,47);
  event.dataTransfer.setData('text/plain', id);
}

function drag(e) {
  console.log('drag');
}

function drop(e) {
  const targetId = e.dataTransfer.getData('targetId');
  e.preventDefault();
  e.target.appendChild(document.getElementById(targetId));
}

function onDrop(event) {
  const id = event.dataTransfer.getData('text');

  const draggableElement = document.getElementById(id);

  const dropzone = event.target.parentNode.parentNode.parentNode;

  if (dropzone.classList.contains('detail-work')) {
    dropzone.appendChild(draggableElement);
    event.dataTransfer.clearData();
  };
}

function onDragOver(event) {
  event.preventDefault();
}
