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
    book.innerHTML = `<span class="title">'${books[i].title}' by ${books[i].author}</span>  `;
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

  addBook(title, author);
  thisForm[0].value = '';
  thisForm[1].value = '';
  window.localStorage.setItem('books', JSON.stringify(books));
};

window.onload = () => {
  if (localStorage.getItem('books')) {
    books = JSON.parse(localStorage.getItem('books'));
  }
  displayBooks();
};