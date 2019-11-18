let works = [];

const $mainWork = document.querySelector('.main-work');
const $mainWorkinput = document.querySelector('.main-create-input');

const render = () => {
  let html = '';
  

  works.forEach(({ id, title }) => {
    html +=
      `
    <li id="${id}">
       <div class="title-box">
        <div class="title">${title}</div>
        <input type="text" class="modify-input" placeholder="주제를 입력해주세요">
       </div>
    <div class="detail-work-box">
      <ul class="detail-work" droppable="true" ondragover='onDragOver(event);'
      ondrop='onDrop(event);'>
      </ul>
    </div>
    <div class="create-detail-work">
      <button type="button" class="btn40 c3 create-detail-btn">해야할일 추가</button>
      <input type="text" class="detail-create-input" placeholder="추가할 목록을 입력하세요">
    </div>
    <button type="button" class="delete-main-work">삭제</button>
  </li>`;
  });
  $mainWork.innerHTML = html;
};
const getTodo = () => {
  works = [
    {
      "id": 1,
      "title": "대주제",
      "list": [
        {
          "id": 1,
          "title": "소주제",
          "date": "19/01/01 12:12:12",
          "Description": "content",
          "labels": { "yellow": { "completed": false }, "orange": { "completed": false }, "red": { "completed": false }, "blue": { "completed": false } },
          "checklist": [
            { "id": 1, "content": "check1", "completed": false },
            { "id": 2, "content": "check2", "completed": false }
          ]
        }
      ]
    }
  ];
};
window.onload = () => {
  getTodo();
  render();
};
const ajax = (() => {
  const req = (method, url, payload) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(payload));

      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 201) {
          resolve(xhr.response);
        }
      };
      xhr.onerror = () => {
        reject(new Error(xhr.status));
      };
    });
  };
  return {
    get(url) {
      return req('GET', url);
    },
    post(url, payload) {
      return req('POST', url, payload);
    }
  };
})();

const generateId = () => {
  return works.length ? Math.max(...works.map(item=>item.id))+1 : 1;
}
const addTodo = (title) => {
  works = [{ id: generateId(), title, list: [] }, ...works];
  
  
}

$mainWorkinput.onkeyup = ({ target, keyCode }) => {
  const title = $mainWorkinput.value.trim();
  if (!title || keyCode !== 13) return;
  target.value = '';
  addTodo(title);
  render();
};



