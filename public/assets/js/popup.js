// DOMs
const $wrap = document.querySelector('#wrap');
const $mainwork = document.querySelector('#main-work');

const render = () => {
  const $node = document.createElement('div');

  $node.classList.add('popup-wrap');

  $node.innerHTML += `
    <div class="register-popup">
    <div class="popup-header">
      <div class="popup-title"><span class="a11y-hidden">팝업타이틀:</span>11/08 프로젝트 주제 회의</div>
      <div class="popup-subtitle">in list<a href="#self">회의 내용</a></div>
      <div class="popup-create-time">19/01/01 12:12:12</div>
    </div>

    <button type="button" class="btn-close-popup">X</button>

    <div class="popup-main-content">
      <div class="description-area">
        <div class="area-title">Description</div>
        <textarea class="description-content" placeholder="Add a more detailed Description.."></textarea>
        <button type="button" class="btn-save">Save</button>
      </div>

      <div class="checklist-area">
        <div class="area-title">checklist</div>
        <div class="progress-contents">
          <span class="complete-percent">98%</span>
          <div class="progress-bar">
            <span class="success-bar"></span>
          </div>
        </div>
        <ul>
          <li><label for="check1"><input id="check1" type="checkbox"><span>ddasda</span></label></li>
          <li><label for="check2"><input id="check2" type="checkbox"><span>ddasda</span></label></li>
        </ul>
        <button type="button" class="btn-check-add">add an item</button>
        <button type="button" class="btn-delete">delete</button>
      </div>
    </div>

    <div class="popup-add-ons">
      <div class="members-info">
        <div class="title">MEMBERS</div>
        <ul class="members-list">
          <l1>P</l1>
          <l1>정</l1>
          <l1>김</l1>
          <l1>+</l1>
        </ul>
      </div>
      <div class="labels">
        <div class="title">LABELS</div>
        <ul class="colors-list">
          <li class="none"><span class="a11y-hidden">none</span></li>
          <li class="green"><span class="a11y-hidden">green</span></li>
          <li class="red"><span class="a11y-hidden">red</span></li>
          <li class="blue"><span class="a11y-hidden">blue</span></li>
        </ul>
      </div>
      <div class="check">
        <button type="button" class="btn-checklist">CHECKLIST</button>
      </div>
    </div>
  </div>`;

  $wrap.appendChild($node);
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
    }
  };
})();

const closePopup = (target) => {
  const $popup = target.parentNode.parentNode;

  $popup.remove();
};

const openPopup = () => {
  render();

  const $closeBtn = document.querySelector('.btn-close-popup');

  $closeBtn.onclick = ({ target }) => {
    closePopup(target);
  };
};

// Events
$mainwork.addEventListener('click', (e) => {
  if (!e.target.parentNode.classList.contains('detail-inner')) return;

  openPopup();
});