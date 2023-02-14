/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */
const listOfbooks = document.querySelector('.awesome-book-list');
const head = document.querySelector('.all-book');
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
    removeSuccess();
    this.BookData = this.BookData.filter((x) => x.bookid !== bookid);
    localStorage.setItem('BookDB', JSON.stringify(this.BookData));
  }
}

const savebook = new StoreBook();
// Get input value
const getformInput = () => {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const insertbook = new Book(title.value, author.value);
  return insertbook;
};

// Display teh list of books on the web page
const DisplayBooks = (index) => {
  let bgcolor = '';
  if (savebook.BookData.indexOf(index) % 2 !== 0) {
    bgcolor = 'white';
  } else {
    bgcolor = 'light';
  }
  const displaybook = document.createElement('div');
  displaybook.classList.add('book-item');
  displaybook.classList.add(bgcolor);
  displaybook.setAttribute('id', index.bookid);
  displaybook.innerHTML = `<p>${index.title} by ${index.author}</p>`;
  const removeBook = document.createElement('button');
  removeBook.innerHTML = 'Remove';
  removeBook.addEventListener('click', () => savebook.removeBook(index.bookid));
  displaybook.appendChild(removeBook);
  listOfbooks.appendChild(displaybook);
};

const title = document.querySelector('#title');
const author = document.querySelector('#author');
// Add Button
const addnewBook = document.getElementById('add-btn');
addnewBook.addEventListener('click', () => {
  if (!title.value || !author.value) {
    showAlert();
  } else {
    const item = getformInput();
    savebook.addBook(item);
    success();
  }
});

window.onload = () => {
  savebook.BookData = JSON.parse(localStorage.getItem('BookDB' || '[]'));
  if (savebook.BookData === null) {
    savebook.BookData = [];
    return;
  }
  savebook.BookData.forEach((item) => DisplayBooks(item));
};

const showAlert = () => {
  const div = document.createElement('div');
  div.className = 'error';
  div.appendChild(document.createTextNode('fields are required'));
  const newB = document.querySelector('.new-books');
  newB.appendChild(div);
  setTimeout(() => {
    document.querySelector('.error').remove();
  }, 2000);
};

const success = () => {
  const div = document.createElement('div');
  div.className = 'success';
  div.appendChild(document.createTextNode('Book successfully added!'));
  const newB = document.querySelector('.new-books');
  newB.appendChild(div);
  setTimeout(() => document.querySelector('.success').remove(), 3000);
};

const removeSuccess = () => {
  const div = document.createElement('div');
  div.className = 'remove-book';
  div.appendChild(document.createTextNode('Book Deleted Successfully!'));
  head.appendChild(div);
  setTimeout(() => document.querySelector('.remove-book').remove(), 3000);
};

const list = document.querySelector('.book-list');
const add = document.querySelector('.addnewbook');
const contact = document.querySelector('.contact');
const listlink = document.querySelector('.list-link');
const addlink = document.querySelector('.add-link');
const contactlink = document.querySelector('.contact-link');

listlink.addEventListener('click', () => {
  list.style.display = 'block';
  listlink.style.color = 'blue';
  contactlink.style.color = 'black';
  addlink.style.color = 'black';
  add.style.display = 'none';
  contact.style.display = 'none';
});

addlink.addEventListener('click', () => {
  add.style.display = 'block';
  list.style.display = 'none';
  contact.style.display = 'none';
  listlink.style.color = 'black';
  contactlink.style.color = 'black';
  addlink.style.color = 'blue';
});

contactlink.addEventListener('click', () => {
  contact.style.display = 'block';
  list.style.display = 'none';
  add.style.display = 'none';
  listlink.style.color = 'black';
  contactlink.style.color = 'blue';
  addlink.style.color = 'black';
});

const date = new Date().toLocaleString();
document.querySelector('.date').innerHTML = date;