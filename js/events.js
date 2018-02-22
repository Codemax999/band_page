setTimeout(() => {

  const url = window.location.href;
  switch (true) {
    case url.includes('index'):
      addImageListeners();
      break;
    case url.includes('news'):
      // nothing
      break;
    case url.includes('events'):
      // nothing
      break;
    case url.includes('timeline'):
      // nothing 
      break;
    case url.includes('contact'):
      addInputListeners();
      break;
    default: 
      addImageListeners();
  }
}, 500);

// image listeners
const addImageListeners = () => { 

  // featured news card, item image, details div, underline
  const featured = document.querySelector('.news-featured');
  const image = document.querySelector('.featured-img');
  const details = document.querySelector('.news-item-details-0');
  const under = document.querySelector('.under-0');

  // mouse over 
  featured.addEventListener('mouseover', () => {
    image.classList.add('img-active');
    details.classList.add('news-item-active');
    under.classList.add('under-active');
  });

  // mouse out
  featured.addEventListener('mouseout', () => {
    image.classList.remove('img-active');
    details.classList.remove('news-item-active');
    under.classList.remove('under-active');
  });
  

  // list of sub news card elements
  for (let item of document.querySelectorAll('.sub-news')) {

    // mouse over 
    item.addEventListener('mouseover', e => newsItemMouseOver(e));

    // mouse out
    item.addEventListener('mouseout', e => newsItemMouseOut(e));
  }
};

// news list item mouse over 
const newsItemMouseOver = e => {

  const subImage = document.querySelector(`.sub-img-${e.target.id}`);
  const subDetails = document.querySelector(`.news-item-details-${e.target.id}`);
  const subUnder = document.querySelector(`.under-${e.target.id}`);

  subImage.classList.add('img-active');
  subDetails.classList.add('news-item-active');
  subUnder.classList.add('under-active');
}

// news list item mouse out
const newsItemMouseOut = e => {

  const subImage = document.querySelector(`.sub-img-${e.target.id}`);
  const subDetails = document.querySelector(`.news-item-details-${e.target.id}`);
  const subUnder = document.querySelector(`.under-${e.target.id}`);

  subImage.classList.remove('img-active');
  subDetails.classList.remove('news-item-active');
  subUnder.classList.remove('under-active');
}


// input listeners
const addInputListeners = () => {

  // email
  const email = document.querySelector('.input-email');
  email.addEventListener('keyup', e => {

    const errMsg = document.querySelector('.err-msg');
    if (e.target.validity.valid) errMsg.textContent = '';
    else errMsg.textContent = 'Invalid email';
  });

  // message
  const message = document.querySelector('.input-message');
  message.addEventListener('keyup', e => {

    // add count to span
    const textCount = document.querySelector('.text-count');
    textCount.textContent = e.target.value.trim().length;

    // if invalid change to red
    const msg = document.querySelector('.message-valid');
    if (e.target.value.trim().length > 150) msg.classList.add('message-invalid');
    else msg.classList.remove('message-invalid');
  });
};