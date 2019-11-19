const $mainWork = document.querySelector('.main-work');
const $addCategory = document.querySelector('.create-main-work');
const $mainCreateInput = document.querySelector('.main-create-input');

const render = works => {
  works = works;
  let html = '';
  works.forEach(work => {
    html += `
    <li id="${work.id}">
      <div class="title-box">
          <div class="title">${work.title}</div>
          <input type="text" class="modify-input" placeholder="주제를 입력해주세요">
      </div>
      <div class="detail-work-box">
        <ul class="detail-work" droppable="true">
        ${work.list ? subworkRender(work.id, work.list) : false}
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
    .then(render)
};

const toggle = (target) => {
  target.classList.toggle('on', !target.classList.contains('on'));
  target.nextElementSibling.focus();
};

let getWorkId = 0;

const getSubId = (workId, value) => {
  return ajax.get(`http://localhost:3000/works/${workId}`)
    .then(res => JSON.parse(res).list)
    .then(work => work.length ? Math.max(...work.map(list => list.id)) + 1 : 1)
    .then(res => 
      { 
      const getDate = new Date();
      const year = ('' + getDate.getFullYear()).substring(2, 4);
      const month = getDate.getMonth() + 1;
      const day = getDate.getDate();
      const hour = getDate.getHours();
      const minute = getDate.getMinutes();
      const second = getDate.getSeconds();
      
      const subWorkDate = `${year}/${month}/${day} ${hour}:${minute}:${second}`;
      let data=[];
    
      ajax.get(`http://localhost:3000/works/${workId}`)
        .then(res => JSON.parse(res))
        .then(work => [...work.list, {id: res, title: value, date: subWorkDate }])
        .then(res => ajax.patch(`http://localhost:3000/works/${workId}`, {"id": workId,"list": res}))
        .then(getTodo)
      }
    )
};

const add = (target, keyCode) => {
  let value = target.value.trim();
  if (keyCode !== 13 || value === '') return;

  target.previousElementSibling.classList.remove('on');
  target.value = '';
  
  if ( !target.classList.contains('detail-create-input') ) return;
  
  const workId = target.parentNode.parentNode.id;
  const subWorkId = getSubId(workId, value);
};
  
const subworkRender = (workId, subWork) => {
  let html = '';

  subWork.forEach(({ id, title, date }) => {
    html += `
      <li id="${workId}-${id}" class="work-item" draggable="true">
        <a href="#self" class="detail-inner">
          <div class="importance">
            <span class="high">높음</span>
          </div>
          <div class="title">${title}</div>
          <div class="date">${date}</div>
        </a>
        <button type="button" class="delete-detail-btn"><img src="./assets/images/common/delete-btn.png" alt=""></button>
      </li>`;
  });

  return html;
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
    },
    patch(url, payload) {
      return req('PATCH', url, payload);
    }
  };
})();

// Events

window.onload = () => {
  getTodo();
};

$addCategory.onclick = ({ target }) => {
  toggle(target);
};

$mainWork.onfocusout = ({ target }) => {
  console.log(target);
};

$mainWork.onkeyup = ({ target, keyCode }) => {
  add(target, keyCode);
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