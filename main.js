let books = [];

const booksContainer = document.getElementById('books-cont');
function removeBook(index) {
//   const filt = books.filter((a, i) => {
//     if (index === a, 1) {
//       books.splice(i, 1);
//     }
  window.localStorage.setItem('books', JSON.stringify(books));
  books.splice(index, 1);
}

function displayBooks() {
  booksContainer.innerHTML = '';
  for (let i = 0; i < books.length; i += 1) {
    const book = document.createElement('li');
    book.innerHTML = `<span class="title">${books[i].title}</span> <br> ${books[i].author} <br>`;
    const btn = document.createElement('button');
    const hrLine = document.createElement('hr');
    btn.textContent = 'Remove';
    book.append(btn);
    book.append(hrLine);
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

window.onload = () => {
  if (localStorage.getItem('books')) {
    books = JSON.parse(localStorage.getItem('books'));
  }

  displayBooks();
};