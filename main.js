let books = [];

const booksContainer = document.getElementById('books-cont');
function removeBook(index) {
  books.splice(index, 1);
  window.localStorage.setItem('books', JSON.stringify(books));
}

function displayBooks() {
  booksContainer.innerHTML = '';
  for (let i = 0; i < books.length; i += 1) {
    const book = document.createElement('li');
    book.innerHTML = `<span class="title">'${books[i].title}' by ${books[i].author}</span>`;
    const btn = document.createElement('button');
    btn.className = 'list-btn';
    const hrLine = document.createElement('hr');
    btn.textContent = 'Remove';
    book.append(btn);
    booksContainer.append(hrLine);
    btn.onclick = () => {
      removeBook(i);
      displayBooks();
    };
    booksContainer.append(book);
  }
}

function addBook(title, author) {
  books.push({ title, author });
  displayBooks();
}

document.forms[0].onsubmit = (event) => {
  event.preventDefault();
  const thisForm = event.target;
  const title = thisForm[0].value;
  const author = thisForm[1].value;

  if (title === '' || author === '') {
    const section = document.getElementById('form-section');
    const message = document.createElement('p');
    message.innerHTML = 'Please put something into the fields';
    section.insertAdjacentElement('afterend', message);
    setTimeout(() => { message.remove(); }, 3000);
  } else {
    addBook(title, author);
    thisForm[0].value = '';
    thisForm[1].value = '';
  }
  window.localStorage.setItem('books', JSON.stringify(books));
};

window.onload = () => {
  if (localStorage.getItem('books')) {
    books = JSON.parse(localStorage.getItem('books'));
  }

  displayBooks();
};

// Interact with styles
const divList = document.getElementById('div-container');
const formSection = document.getElementById('form-section');
const contact = document.getElementById('contact');


document.getElementById('addNav').addEventListener('click', () => {
  divList.style.display = 'none';
  formSection.style.display = 'block';
  contact.style.display = 'none';
});

document.getElementById('listNav').addEventListener('click', () => {
  divList.style.display = 'flex';
  formSection.style.display = 'none';
  contact.style.display = 'none';
});

document.getElementById('contactNav').addEventListener('click', () => {
  divList.style.display = 'none';
  formSection.style.display = 'none';
  contact.style.display = 'block';
});

function refreshTime() {
  const timeDisplay = document.getElementById('time');
  const dateString = new Date().toLocaleString();
  const formattedString = dateString.replace(', ', ' - ');
  timeDisplay.textContent = formattedString;
}
setInterval(refreshTime, 1);