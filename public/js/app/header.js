import Global from './global';

export default class Header extends Global {
  constructor () {
    super();

    this.header = document.querySelector(".header__info--middle");
    this.header__menu = document.querySelector(".header__menu");
    this.menuBut = document.getElementById("header-nav__open");

    this.sticky = this.header.offsetTop;
    this.srollHandler();

    this.closeMenu = this.closeMenu.bind(this);
    this.eventsListener();
  }


  eventsListener() {
    let shadow = document.querySelector(".header__shadow");
    let links = document.querySelectorAll('.header__menu-item');

    window.addEventListener("scroll", this.srollHandler.bind(this));
    this.menuBut.addEventListener("change", this.toggleMenu.bind(this));
    shadow.addEventListener("click", this.closeMenu);

    for (let i = 0; i < links.length; i++) {
      links[i].addEventListener("click", this.closeMenu, false)
    }
  }

  toggleMenu({target}) {
    if (target.checked) {
      this.header__menu.classList.add("header__menu--visible");
    } else {
      this.header__menu.classList.remove("header__menu--visible");
    }
  }

  closeMenu () {
    this.menuBut.checked = false;
    this.header__menu.classList.remove("header__menu--visible");
  }

  srollHandler() {
    if (window.pageYOffset >= this.sticky) {
      this.header.classList.add("header__info--sticky");
    } else {
      this.header.classList.remove("header__info--sticky");
    }
  }
}