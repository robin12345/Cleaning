export default class Popup {
  constructor() {
    this.popup = document.querySelector('.popup');

    this.eventsListener();
  }


  eventsListener() {
    const phone = document.getElementById('phone');
    const shadow = document.querySelector('.shadow');
    const popupClose = document.querySelector('.popup__close');
    let callBtns = document.querySelectorAll('.ask-call');

    phone.addEventListener('input', function (e) {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? ` - ` + x[3] : '');
    });

    for (let i = 0; i < callBtns.length; i++) {
      callBtns[i].addEventListener("click", this.togglePopup.bind(this, true), false)
    }

    shadow.addEventListener("click", this.togglePopup.bind(this, false), false);
    popupClose.addEventListener("click", this.togglePopup.bind(this, false), false);
  }

  togglePopup(open) {
    open ? this.popup.classList.add("popup--active") : this.popup.classList.remove("popup--active");
  }
}