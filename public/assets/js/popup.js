// DOMs
const $wrap = document.querySelector('#wrap');
const $mainwork = document.querySelector('#main-work');

const render = () => {
  const $node = document.createElement('div');

  $node.classList.add('popup-wrap');

  $node.innerHTML += `
    <div class="register-popup">
      <div class="popup-header">
        <div class="popup-title"><span class="a11y-hidden">주제:</span>11/08 프로젝트 주제 회의</div>
        <div class="popup-subtitle">in list <a href="#self">회의 내용</a></div>
        <div class="popup-created-time">19/01/01 12:12:12</div>
      </div>

      <button type="button" class="btn-close-popup layer-close">X</button>

      <div class="popup-main-content clear-fix">
        <div class="content-area">
          <div class="description-area">
            <div class="area-title">Description</div>
            <textarea class="description-content" placeholder="Add a more detailed Description.."></textarea>
            <button type="button" class="btn-save btn40 c5 mt10" style="width: 80px;">Save</button>
          </div>

          <div class="checklist-area">
            <div class="area-title">checklist</div>
            <div class="progress-contents">
              <span class="complete-percent">98%</span>
              <div class="progress-bar">
                <span class="success-bar" style="width: 50%"></span>
              </div>
            </div>
            <ul class="check-list">
              <li><label class="chk" for="check1"><input id="check1" type="checkbox"><span>ddasda</span></label></li>
              <li><label class="chk" for="check2"><input id="check2" type="checkbox"><span>ddasda</span></label></li>
            </ul>
            <button type="button" class="btn-check-add btn40 c5 mt20" style="width: 120px;">add an item</button>
            <button type="button" class="btn-delete btn30 c6" style="width: 100px;">delete</button>
          </div>
        </div>

        <div class="popup-add-ons">
          <div class="members-info">
            <div class="title">MEMBERS</div>
            <ul class="members-list">
              <li>P</li>
              <li>정</li>
              <li>김</li>
              <li>+</li>
            </ul>
          </div>
          <div class="labels">
            <div class="title">LABELS</div>
            <ul class="colors-list">
              <li class="yellow">
                <label><input type="checkbox" class="state-check"><span>노랑색</span></span></label>
              </li>
              <li class="orange">
                <label><input type="checkbox" class="state-check"><span>주황색</span></span></label>
              </li>
              <li class="red">
                <label><input type="checkbox" class="state-check"><span>빨강색</span></span></label>
              </li>
              <li class="blue">
                <label><input type="checkbox" class="state-check"><span>파랑색</span></span></label>
              </li>
            </ul>
          </div>
          <div class="add-check">
            <button type="button" class="btn-checklist btn40 c2" style="width: 100%;">CHECKLIST</button>
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
// $mainwork.addEventListener('click', (e) => {
//   if (!e.target.parentNode.classList.contains('detail-inner')) return;

//   openPopup();
// });

window.onload = openPopup;