// import smoothscroll from 'smoothscroll-polyfill';
//
// smoothscroll.polyfill();
window.__forceSmoothScrollPolyfill__ = true;

export default class Scroll {
  constructor() {
    this.eventsListener();
  }


  anchorLinkHandler(e) {
    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
    const targetID = e.currentTarget.getAttribute("href");
    const targetAnchor = document.querySelector(targetID);

    e.preventDefault();

    if (!targetAnchor) return;

    const originalTop = distanceToTop(targetAnchor) - 200;

    window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });

    const checkIfDone = setInterval(function() {
      const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
      if (distanceToTop(targetAnchor) === 0 || atBottom) {
        targetAnchor.tabIndex = "-1";

        window.history.pushState("", "", targetID);

        clearInterval(checkIfDone);
      }
    }, 1000);
  }

  eventsListener() {
    const linksToAnchors = document.querySelectorAll('a[href^="#"]');

    linksToAnchors.forEach(each => (each.onclick = this.anchorLinkHandler.bind(this)));
  }
}