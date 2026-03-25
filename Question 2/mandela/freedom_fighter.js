
(function () {
  const totalImages = 6;
  let favouriteCount = 0;         // how many pictures are added to favorites
  let remaining = totalImages;    // how many pictures are remaining

  
  const originalOrder = {};       

  document.addEventListener('DOMContentLoaded', function () {
    const picsDiv = document.getElementById('pics');
    const wrappers = picsDiv.querySelectorAll('.pic-wrapper');

    wrappers.forEach(function (wrapper, index) {
      const img = wrapper.querySelector('img');
      originalOrder[img.id] = index;
    });

    picsDiv.addEventListener('click', function (e) {
      const img = e.target.closest('img');
      if (!img) return;  
      const wrapper = img.closest('.pic-wrapper');
      moveToFavourites(img, wrapper);
    });

    const favouritesDiv = document.getElementById('favourites');
    favouritesDiv.addEventListener('click', function (e) {
      const img = e.target.closest('img');
      if (!img) return;
      const wrapper = img.closest('.pic-wrapper');
      revertToMain(img, wrapper);
    });
  });

  function moveToFavourites(img, wrapper) {
    if (img.classList.contains('selected')) return;

    favouriteCount++;
    remaining--;

    img.classList.add('selected');

    const favouritesDiv = document.getElementById('favourites');
    favouritesDiv.appendChild(wrapper);

    addAction('Moved ' + img.src.split('/').pop() + ' to favorites');

    const imgNumber = img.id.replace('img-', '');
    updateConfirmation('Image ' + imgNumber + ' selected as favorite number ' + favouriteCount + '.');

    if (favouriteCount === totalImages) {
      updateConfirmation('All images have been selected!');
    }

    updateCounter();
  }

  function revertToMain(img, wrapper) {
    favouriteCount--;
    remaining++;

    img.classList.remove('selected');

    const picsDiv = document.getElementById('pics');
    const siblings = Array.from(picsDiv.querySelectorAll('.pic-wrapper'));
    const targetIndex = originalOrder[img.id];

    let inserted = false;
    for (let i = 0; i < siblings.length; i++) {
      const sibImg = siblings[i].querySelector('img');
      if (originalOrder[sibImg.id] > targetIndex) {
        picsDiv.insertBefore(wrapper, siblings[i]);
        inserted = true;
        break;
      }
    }
    if (!inserted) {
      picsDiv.appendChild(wrapper);
    }

    addAction('Reverted ' + img.src.split('/').pop() + ' back to the main list');

    updateConfirmation('Image reverted. ' + remaining + ' image(s) remaining.');

    updateCounter();
  }

  function addAction(message) {
    const actionsList = document.getElementById('actions');
    const li = document.createElement('li');
    li.textContent = message;
    actionsList.appendChild(li);
  }

  function updateConfirmation(message) {
    const confirmDiv = document.getElementById('confirmation');
    confirmDiv.textContent = message;
  }
  
  function updateCounter() {
    document.getElementById('remaining-count').textContent = remaining;
  }
})();
