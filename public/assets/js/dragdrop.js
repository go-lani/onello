function dragStart(e) {
  console.warn('dragStart');
  const parentNode = e.target.parentElement;
  e.dataTransfer.setDragImage(parentNode,0,0);
  e.dataTransfer.setData('targetId', e.target.parentElement.id);
}

function drag(e) {
  console.log('drag');
}

function drop(e) {
  console.warn('drop');
  const targetId = e.dataTransfer.getData('targetId');
  e.preventDefault();
  e.target.appendChild(document.getElementById(targetId));
}