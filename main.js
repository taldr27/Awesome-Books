var books = [];

const booksContainer = document.getElementById('books-cont');

function displayBooks() {
  booksContainer.innerHTML = '';
  for(var i = 0; i < books.length; i +=1) {
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
};

function addBook(title, author) {
    books.push({ title, author });
    displayBooks();
  }

  function removeBook(index) {
   const filt = books.filter((a,i)=> {
    if(index == a){
        books.splice(i,1);
    }
   });
   window.localStorage.setItem('books', JSON.stringify(books));
  };
  
  document.forms[0].onsubmit = (event) => {
    event.preventDefault();
    const thisForm = event.target;
    const title = thisForm[0].value;
    const author = thisForm[1].value;
    addBook(title, author);
    window.localStorage.setItem('books', JSON.stringify(books));
  };

  window.onload = () => {
  if (localStorage.getItem('books')) {
    books = JSON.parse(localStorage.getItem('books'));
  }

  displayBooks();
};