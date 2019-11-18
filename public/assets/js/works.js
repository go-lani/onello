let works = [];

const $mainWork = document.querySelector('.main-work');
const $mainWorkinput = document.querySelector('.main-create-input');

const subwork = (workId, sublist) => {
  let html = '';

  sublist.forEach((subwork) => {
    html += `
      <li id="${workId}-${subwork.id}" class="work-item" draggable="true">
        <a href="#self" class="detail-inner">
          <div class="importance">
            <span class="high">높음</span>
          </div>
          <div class="title">${subwork.title}</div>
          <div class="date">${subwork.date}</div>
        </a>
        <button type="button" class="delete-detail-btn"><img src="./assets/images/common/delete-btn.png" alt=""></button>
      </li>
    `;
  });
  return html;
};

const render = (works) => {
  let html = '';

  works = works;

  works.forEach((todo) => {
    html +=
      `
    <li id="${todo.id}">
      <div class="title-box">
        <div class="title">${todo.title}</div>
        <input type="text" class="modify-input" placeholder="주제를 입력해주세요">
      </div>
    <div class="detail-work-box">
      <ul class="detail-work" droppable="true">
        ${subwork(todo.id, todo.list)}
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
  ajax.get('http://localhost:3000/works/')
    .then(res => JSON.parse(res))
    .then(render);
};

const addTodo = () => {

};

window.onload = () => {
  getTodo();
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
          console.log(resolve(xhr.response));
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