(function () {
  const total = 6;
  let favouriteCount = 0;
  let remaining = total;

  const originalOrder = {};

  document.addEventListener('DOMContentLoaded', function () {
    const picsDiv = document.getElementById('pics');
    const favDiv  = document.getElementById('favorites');

    const counter = document.createElement('p');
    counter.id = 'counter';
    counter.innerHTML = 'Images remaining: <span id="remaining-count">' + total + '</span>';
    picsDiv.parentNode.insertBefore(counter, picsDiv.nextSibling);

    const confirmation = document.createElement('p');
    confirmation.id = 'confirmation';
    document.getElementById('actions').parentNode.insertBefore(confirmation, document.getElementById('actions'));

    const imgs = picsDiv.querySelectorAll('img.mandela');
    imgs.forEach(function (img, i) {
      originalOrder[img.src] = i;
      img.title = img.alt;
    });

    picsDiv.addEventListener('click', function (e) {
      if (e.target.tagName !== 'IMG') return;
      moveToFavourites(e.target);
    });

    favDiv.addEventListener('click', function (e) {
      if (e.target.tagName !== 'IMG') return;
      revertToMain(e.target);
    });
  });

  function moveToFavourites(img) {

    if (img.classList.contains('selected')) return;

    favouriteCount++;
    remaining--;

    img.classList.add('selected');

    document.getElementById('favorites').appendChild(img);

    addAction('Moved ' + img.src.split('/').pop() + ' to favorites');

    if (favouriteCount === total) {
      setConfirmation('All images have been selected!');
    } else {
      setConfirmation('Image ' + ' selected as favorite number ' + favouriteCount + '.');
    }

    updateCounter();
  }

  function revertToMain(img) {
    favouriteCount--;
    remaining++;

    img.classList.remove('selected');

    const picsDiv = document.getElementById('pics');
    const siblings = Array.from(picsDiv.querySelectorAll('img.mandela'));
    const targetIdx = originalOrder[img.src];

    let inserted = false;
    for (let i = 0; i < siblings.length; i++) {
      if (originalOrder[siblings[i].src] > targetIdx) {
        picsDiv.insertBefore(img, siblings[i]);
        inserted = true;
        break;
      }
    }
    if (!inserted) picsDiv.appendChild(img);

    addAction('Reverted ' + img.src.split('/').pop() + ' back to the main list');
    setConfirmation('Image reverted. ' + remaining + ' image(s) remaining.');

    updateCounter();
  }

  function addAction(message) {
    const li = document.createElement('li');
    li.textContent = message;
    document.getElementById('actions').appendChild(li);
  }

  function setConfirmation(message) {
    document.getElementById('confirmation').textContent = message;
  }

  function updateCounter() {
    document.getElementById('remaining-count').textContent = remaining;
  }

  function getImgNumber(img) {
    const match = img.src.match(/(\d+)/);
    return match ? match[1] : '?';
  }
})();
