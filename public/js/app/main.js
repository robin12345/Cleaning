import Global from './global';


export default class Main extends Global {
    constructor () {
        super();

        this.eventsListener();
    }


    eventsListener() {
        // const shadow = document.querySelector('.shadow');
        // const mBtn = document.querySelector('.m-btn');
        // const mClose = document.querySelector('.l-menu__m-close');
        //
        // shadow.addEventListener("click", () => {
        //   this.toggleMenu();
        // });
        //
        // mClose.addEventListener("click", () => {
        //     this.toggleMenu();
        // });
        //
        // mBtn.addEventListener("click", () => {
        //     this.toggleMenu();
        // });
    }

    toggleMenu() {
        // const menu = document.querySelector('.l-menu');
        //
        // menu.classList.toggle("l-menu--open");
    }
}