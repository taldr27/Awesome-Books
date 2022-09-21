const booksContainer = document.getElementById('books-cont');
class Collect {
  constructor() {
    this.books = [];
  }

  removeBook(index) {
    this.books.splice(index, 1);
    window.localStorage.setItem('books', JSON.stringify(this.books));
  }

  displayBooks() {
    booksContainer.innerHTML = '';
    for (let i = 0; i < this.books.length; i += 1) {
      const book = document.createElement('li');
      book.innerHTML = `<span class="title">'${this.books[i].title}' by ${this.books[i].author}</span>`;
      const btn = document.createElement('button');
      btn.className = 'list-btn';
      const hrLine = document.createElement('hr');
      btn.textContent = 'Remove';
      book.append(btn);
      booksContainer.append(hrLine);
      btn.onclick = () => {
        this.removeBook(i);
        this.displayBooks();
      };
      booksContainer.append(book);
    }
  }

  addBook(title, author) {
    this.books.push({ title, author });
    this.displayBooks();
  }
}

const books = new Collect();

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
    books.addBook(title, author);
    thisForm[0].value = '';
    thisForm[1].value = '';
  }
  window.localStorage.setItem('books', JSON.stringify(books));
};
// function save() {
//   if (localStorage.getItem('books')) {
//     books = JSON.parse(localStorage.getItem('books'));
//     console.log(localStorage);
//   }
//   books.displayBooks();
// }
// window.onload = save();

// window.onload = () => {
//   if (localStorage.getItem('books')) {
//     books = JSON.parse(localStorage.getItem('books'));
//   }

//   displayBooks();
// };


// Setting Time
function refreshTime() {
  const timeDisplay = document.getElementById('time');
  const dateString = new Date().toLocaleString();
  const formattedString = dateString.replace(', ', ' - ');
  timeDisplay.textContent = formattedString;
}
setInterval(refreshTime, 1);