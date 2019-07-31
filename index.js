var date = new Date().getDay();
var day = document.querySelector('.hours').getElementsByTagName('tr')[date];
day.id = 'current-day';

var earlyAnimationOffsetInPixels = 200;

var images = document.querySelectorAll('.image');
var subheadings = document.querySelectorAll('.subheading');
var hours = document.querySelector('.hours');
var storeHistory = document.querySelector('.history');
var menu = document.querySelector('.menu');
var tables = document.querySelectorAll('.category');

function getBreakPointsArray(array) {
  var returnArray = [];
  array.forEach(function(element) {
    returnArray.push({
      bp: Math.max(0, element.offsetTop - earlyAnimationOffsetInPixels),
      ref: element,
      shown: false
    });
  });

  return returnArray;
}

var imageBreakpoints = getBreakPointsArray(images);
var subheadingBreakpoints = getBreakPointsArray(subheadings);

window.onload = function() {
  var numberOfElementsToShowInitially = 3;
  imageBreakpoints.forEach(function(point, index) {
    if (index < numberOfElementsToShowInitially) {
      point.shown = true;
      point.ref.children[0].style = 'transform: scale(1); opacity: 1;';
    }
  });

  subheadingBreakpoints[0].shown = true;
  subheadingBreakpoints[0].ref.style = 'opacity: 1;';

  tables.forEach(function(table, index) {
    if (index % 2 === 0) {
      table.classList.add('tables-left-initial');
    } else {
      table.classList.add('tables-right-initial');
    }
  });
};

function showMenu(table) {
  setTimeout(function() {
    table.classList.remove('tables-left-initial');
    table.classList.remove('tables-right-initial');
    table.classList.add('tables-enter');
  }, 100);
}

var position = window.scrollY;
function handleBreakPointAnimations() {
  position = window.scrollY;
  imageBreakpoints.forEach(function(point, index) {
    if (!point.shown && position >= point.bp) {
      point.shown = true;
      point.ref.children[0].style = 'transform: scale(1); opacity: 1;';
    }
  });

  subheadingBreakpoints.forEach(function(point) {
    if (!point.shown && position >= point.bp) {
      point.shown = true;
      point.ref.style = 'opacity: 1;';
    }
  });

  if (position >= hours.offsetTop - earlyAnimationOffsetInPixels) {
    hours.classList.add('hours-enter');
  }

  if (position >= storeHistory.offsetTop - earlyAnimationOffsetInPixels) {
    storeHistory.classList.add('history-enter');
  }

  tables.forEach(function(table, index) {
    if (position >= table.offsetTop - earlyAnimationOffsetInPixels) {
      showMenu(table);
    }
  });
}

window.addEventListener('scroll', handleBreakPointAnimations);
