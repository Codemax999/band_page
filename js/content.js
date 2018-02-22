// get data
getData = url => {
  return new Promise((resolve, reject) => {
    const data = new XMLHttpRequest();
    data.open('Get', url);
    data.onload = () => data.status === 200 ? resolve(data.response) : reject(data.statusText);
    data.onerror = err => reject(err);
    data.send();
  });
}

getData('data/data.json').then(data => {

  // Parse JSON
  data = JSON.parse(data);

  // determine which content to load
  const url = window.location.href;
  switch (true) {
    case url.includes('index'):
      window.url = 'index';
      loadNews(data.news);
      loadAbout(data.about);
      loadEvents(data.events);
      loadMembers(data.members);
      break;
    case url.includes('news'):
      window.url = 'news';
      loadNews(data.news);
      break;
    case url.includes('events'):
      window.url = 'events';
      loadEvents(data.events);
      break;
    case url.includes('timeline'):
      window.url = 'timeline';
      loadAbout(data.about);
      loadMembers(data.members);
      break;
    case url.includes('contact'):
      window.url = 'contact';
      break;
    default:
      window.url = 'index';
      loadNews(data.news);
      loadAbout(data.about);
      loadEvents(data.events);
      loadMembers(data.members);
  }
}).catch(err => console.error(err));

// Load Data
loadNews = news => { 

  for (x in news) {

    // featured item 
    if (Number(x) === 0) {

      // for index only
      if (window.url === 'index') {

        // create details wrap 
        const details = document.createElement('div');
        details.innerHTML = 
        `
          <img src="${news[x].imageURL}" class="featured-img"/>
          <div class="details news-item-details-${x}">
            <h4>${new Date(news[x].postDate).toLocaleDateString("en-US").replace(/\//g, '.')}</h4>
            <h1>${news[x].title}</h1>
            <div class="under under-${x}"></div>
          </div>
        `;
        document.querySelector(`.news-featured`).appendChild(details);

      } else {

        // header
        document.querySelector(`.featured-article-header`).textContent = news[x].title;

        // content 
        const details = document.querySelector(`.featured-article`);
        details.innerHTML = 
        `
          <h2>${new Date(news[x].postDate).toLocaleDateString("en-US").replace(/\//g, '.')}</h2>
          <p>${news[x].text}</p>
          <div class="article-body">
            <img src="${news[x].imageURL}"/>
          </div>
        `;
      }

    } else {

      // create li 
      const item = document.createElement('li');
      item.className = `news sub-news news-item-${x}`;
      item.innerHTML = 
      `
        <img src="${news[x].imageURL}" class="news-img sub-img-${x}" id="${x}"/>
        <div class="details news-item-details-${x}" id="${x}">
          <h4 id="${x}">${new Date(news[x].postDate).toLocaleDateString("en-US").replace(/\//g, '.')}</h4>
          <h2 id="${x}">${news[x].title}</h2>
          <div class="under under-${x}" id="${x}"></div>
        </div>
      `;
      document.querySelector('.news-list').appendChild(item);

      // only show 5 results
      if (Number(x) === 4 && window.url === 'index') return;
    }
  }
}

loadEvents = events => {

  for (x in events) {

    // create row
    const row = document.createElement('tr');
    row.className = `event-list-${x}`;
    row.innerHTML = 
    `
      <td>
        <div class="event-day">${new Date(events[x].date).getDay()}</div>
        <div class="event-month">${new Date(events[x].date).toLocaleString("en-us", { month: "short" })}</div>
      </td>
      <td>
        <div class="event-location">${events[x].city}, ${events[x].state}</div>
        <div class="event-venue">${events[x].venue}</div>
      </td>
      <td>
        <img src="images/location.png"/>
      </td>
      <td>
        <img src="images/ticket.png"/>
      </td>
    `;
    document.querySelector('.event-list').appendChild(row);

    // only show 3 events on index page
    if (Number(x) === 3 && window.url === 'index') return;
  }
}

loadMembers = members => {

  for (x in members) {

    // create li
    const item = document.createElement('li');
    item.className = `member-item-${x}`;
    item.innerHTML = `<img src="${members[x].imageURL}"/>`;
    document.querySelector('.members-list').appendChild(item);

    // if on timeline page
    if (window.location.href.includes('timeline')) {

      // create h3
      const name = document.createElement('h3');
      name.textContent = `${members[x].firstname} ${members[x].lastname}`;
      document.querySelector(`.member-item-${x}`).appendChild(name);

      // create h4
      const instrument = document.createElement('h4');
      instrument.textContent = members[x].instrument;
      document.querySelector(`.member-item-${x}`).appendChild(instrument);
    }
  }
}

loadAbout = about => {

  // create em
  const quote = document.createElement('em');
  quote.textContent = about.quote;
  document.querySelector('.band-description').appendChild(quote);

  // create p 
  const paragraph = document.createElement('p');
  paragraph.textContent = about.copy;
  document.querySelector('.band-description').appendChild(paragraph);
}