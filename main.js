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
let counter = 0;
class Books {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

// Store
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(id) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}
class Interface {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => Interface.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#books-cont');
    const row = document.createElement('li');
    // const hrLine = document.createElement('hr');

    row.innerHTML = `<span class="title">'${book.title}' by ${book.author}</span>
    <button><a class="delete" id='${book.id}' href="#">Remove</a></button>`;
    list.appendChild(row);
    // list.appendChild(hrLine);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#input_title').value = '';
    document.querySelector('#input_author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', Interface.displayBooks);

// Add book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  counter += 1;
  e.preventDefault();
  const title = document.querySelector('#input_title').value;
  const author = document.querySelector('#input_author').value;
  const id = counter;

  if (title === '' || author === '') {
    const section = document.getElementById('form-section');
    const message = document.createElement('p');
    message.innerHTML = 'Please put something into the fields';
    section.insertAdjacentElement('afterend', message);
    setTimeout(() => { message.remove(); }, 2000);
  } else {
    // Instantiate
    const book = new Books(title, author, id);

    // Add to Interface
    Interface.addBookToList(book);

    Store.addBook(book);

    Interface.clearFields();
  }
});

// Remove Book

document.querySelector('#books-cont').addEventListener('click', (e) => {
  Interface.deleteBook(e.target);
  Store.removeBook(parseInt(e.target.id, 10));
});