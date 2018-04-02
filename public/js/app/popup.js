import IMask from 'imask';

export default class Popup {
  constructor() {
    this.popup = document.querySelector('.popup');

    this.eventsListener();
  }


  eventsListener() {
    const phone = document.getElementById('phone');
    const shadow = document.querySelector('.shadow');
    const popupClose = document.querySelector('.popup__close');
    const callBtns = document.querySelectorAll('.ask-call');

    const maskOptions = {
      mask: '+{7}(000)000-00-00'
    };

    new IMask(phone, maskOptions);

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