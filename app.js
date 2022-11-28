/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.bookid = Math.random().toFixed(1);
  }
}

class StoreBook {
  constructor() {
    // Array of objects for the book items
    this.BookData = [];
  }
  // Add new Book to the book list

  addBook(newbook) {
    this.BookData.push(newbook);
    localStorage.setItem('BookDB', JSON.stringify(this.BookData));
    DisplayBooks(newbook);
  }

  // Remove book from the list
  removeBook(bookid) {
    const rmvbook = document.getElementById(bookid);
    rmvbook.remove();
    this.BookData = this.BookData.filter((x) => x.bookid !== bookid);
    localStorage.setItem('BookDB', JSON.stringify(this.BookData));
  }
}

const savebook = new StoreBook();
// Get input value
function getformInput() {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const insertbook = new Book(title.value, author.value);
  return insertbook;
}

// Display teh list of books on the web page
function DisplayBooks(index) {
  const listOfbooks = document.querySelector('.awesome-book-list');
  const displaybook = document.createElement('div');
  displaybook.classList.add('book-item');
  displaybook.setAttribute('id', index.bookid);
  displaybook.innerHTML = `<p>${index.title} <br/> ${index.author}</p>`;
  const removeBook = document.createElement('button');
  removeBook.innerHTML = 'Remove';
  removeBook.addEventListener('click', () => savebook.removeBook(index.bookid));
  displaybook.appendChild(removeBook);
  const hr = document.createElement('h1');
  hr.innerHTML = '<hr/>';
  displaybook.appendChild(hr);
  listOfbooks.appendChild(displaybook);
}

// Add Button
const addnewBook = document.getElementById('add-btn');
addnewBook.addEventListener('click', () => {
  const item = getformInput();
  savebook.addBook(item);
});

// const formValidate = document.querySelector('.addbook');
// formValidate.addEventListener('submit', (e) =>{
//   const title = document.querySelector('#title').value;
//   const author = document.querySelector('#author').value;
//   if (title==''){
//     alert('This required!');
//   }

// });

window.onload = () => {
  savebook.BookData = JSON.parse(localStorage.getItem('BookDB' || '[]'));
  if (savebook.BookData === null) {
    savebook.BookData = [];
    return;
  }
  savebook.BookData.forEach((item) => DisplayBooks(item));
};