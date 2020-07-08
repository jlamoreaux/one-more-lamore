const $ = (elem) => {
  return document.querySelector(elem);
};

const $$ = (elems) => {
  return document.querySelectorAll(elems);
};

const headerMenu = $('#header__menu');
const headerAlerts = $('#header__alerts');
const alertsList = $('#alerts__list');

let currentOpenMenu = '';

const removeElement = (element) => {
  $(element).parentNode.removeChild($(element));
};

// Works like jQuery's $(document).ready.
// Supports IE8+. Courtesy of http://youmightnotneedjquery.com/
function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState != 'loading')
        fn();
    });
  }
}


// Automatically open any external link in a new window
// Courtesy of https://robwise.github.io/blog/javascript-external-links-open-new-window
ready(function () {

    var website = window.location.hostname;
    console.log(website);

  var internalLinkRegex = new RegExp('^((((http:\\/\\/|https:\\/\\/)(www\\.)?)?'
                                     + website
                                     + ')|(localhost:\\d{4})|(\\/.*))(\\/.*)?$', '');

  var anchorEls = document.querySelectorAll('a');
  var anchorElsLength = anchorEls.length;

  for (var i = 0; i < anchorElsLength; i++) {
    var anchorEl = anchorEls[i];
    var href = anchorEl.getAttribute('href');

    if (!internalLinkRegex.test(href)) {
      anchorEl.setAttribute('target', '_blank');
    }
  }
});



const showMenu = (elem) => {
  // if (currentOpenMenu.classList) {
  //   currentOpenMenu.classList.remove('open');
  // }
  $(elem).classList.toggle('open');
  currentOpenMenu = $(elem);
  if ($(elem).classList.contains('open')) {
    setTimeout(() => {
      hideOnClickOutside(elem);
    }, 100);
  }
};

// const showAlerts = () => {
//   headerAlerts.classList.toggle('open');
//   // hideOnClickOutside(headerAlerts);
// };

const clearAlerts = async () => {
  fetch("/account/clear-alerts")
    .then(
      alertsList.innerHTML = '<li class="alerts__item">All notifications have been cleared</li>'
  ).then(removeElement('#alert__badge'));
};

const hideOnClickOutside = (element) => {
  const outsideClickListener = event => {
    // if (!element.contains(event.target) && isVisible(element)) { // or use: event.target.closest(selector) === null
    if(event.target.closest(element) === null) {
      $(element).classList.remove('open');
      currentOpenMenu = '';
      removeClickListener();
    }
  };
 
  const removeClickListener = () => {
    document.removeEventListener("click", outsideClickListener);
  };

  document.addEventListener('click', outsideClickListener);
};

// // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js
// const isVisible = elem => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

window.onload = () => {
  $('#alerts__icon').addEventListener('mouseenter', () => {
    event.target.classList = ('fa fa-bell');
  });
  $('#alerts__icon').addEventListener('mouseout', () => {
    event.target.classList = ('fa fa-bell-o');
  });
};