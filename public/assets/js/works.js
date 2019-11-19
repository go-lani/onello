let works = [];

const $mainWork = document.querySelector('.main-work');
const $addCategory = document.querySelector('.create-main-work');
const $mainCreateInput = document.querySelector('.main-create-input');

const state = labels => {
  let html = '';

  labels = labels.filter(label => label.check);

  labels.forEach(label => {
    html += `
      <span class="${label.state}">${label.state}</span>`;
  });

  return html;
};

const subworkRender = (workId, subWork) => {
  let html = '';

  subWork.forEach(({ id, title, date, labels }) => {
    html += `
      <li id="${workId}-${id}" class="work-item" draggable="true">
        <a href="#self" class="detail-inner">
          <div class="importance">
            ${state(labels)}
          </div>
          <div class="title">${title}</div>
          <div class="date">${date}</div>
        </a>
        <button type="button" class="delete-detail-btn"><img class="delete-detail-btn button-img" src="./assets/images/common/delete-btn.png" alt=""></button>
       </li>`;
  });
  return html;
};

const render = works => {
  works = works;

  let html = '';

  works.forEach(work => {
    html +=
    `
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
    },
    patch (url, payload) {
      return req('PATCH', url, payload);
    },
    delete(url) {
      return req('DELETE', url);
    }
  };
})();

const getMaxId = () => {
  let maxId = 0;
  ajax.get('http://localhost:5000/works')
    .then(res => JSON.parse(res))
    .then(works => Math.max(0, ...works.map(work => work.id)) + 1)
    .then(id => maxId = id)

  return maxId;
};

const getWork = () => {
  ajax.get('http://localhost:5000/works/')
    .then(res => JSON.parse(res))
    .then(render)
};

let data = [];

const createWork = title => {
  ajax.post('http://localhost:5000/works/', { id: getMaxId(), title })
    .then(ajax.get('http://localhost:5000/works/').then(res => JSON.parse(res)).then(res => {
      $('#co-work-container').mCustomScrollbar("destroy");
      render(res);
      xRail();
    }));
};

const toggle = (target) => {
  target.classList.toggle('on', !target.classList.contains('on'));
  target.nextElementSibling.focus();
};

const add = (target, keyCode) => {
  let value = target.value.trim();
  if (keyCode !== 13 || value === '') return;

  target.previousElementSibling.classList.remove('on');
  createWork(value);
  target.value = '';
};

// Events
window.onload = () => {
  getWork();
};

$addCategory.onclick = ({ target }) => {
  toggle(target);
};

$mainWork.onfocusout = ({ target }) => {
  console.log(target);
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

$mainWork.onkeyup = ({ target, keyCode }) => {
  add(target, keyCode);
};

const deleteItem = (titleId, subTitleId) => {
  ajax.get(`http://localhost:3000/works/${titleId}`)
    .then(res => JSON.parse(res).list)
    .then(subTitle => subTitle.filter(item => item.id !== +subTitleId))
    .then(res => data = res)
    .then(res => ajax.patch(`http://localhost:3000/works/${titleId}`, { id : titleId, list : res }))
    .then(getTodo);
};

window.onload = () => {
  getTodo();
};

$mainWork.onclick = e => {
  if (!e.target.classList.contains('button-img')) return;

  const { id } = e.target.parentNode.parentNode;

  let titleId = `${id}`.split('-')[0]
  let subTitleId = `${id}`.split('-')[1]

  deleteItem(titleId, subTitleId);
}