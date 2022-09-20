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

  