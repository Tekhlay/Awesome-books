class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
      this.bookid = Math.random().toFixed(1);
    }
  }
  class StoreBook {
    constructor() {
      this.BookData = [];
    }

    // Add Book 
    
    addBook(new_book) {
        this.BookData.push(new_book);
        localStorage.setItem('BookDB', JSON.stringify(this.BookData));
        DisplayBooks(new_book);
    }

    // code for Remove book here

  }
  const savebook = new StoreBook();
  function getformInput() {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const insertbook = new Book(title.value, author.value);
    return insertbook;
  }
  function DisplayBooks(index) {
    const listOfbooks = document.querySelector('.awesome-book-list');
    const displaybook = document.createElement('div');
    displaybook.classList.add('book-item');
    displaybook.setAttribute('id', index.bookid);
    displaybook.innerHTML = `
    <p>${index.title}<p>
    <p>${index.author}</p>
    `;
    const removeBook = document.createElement('button');
    removeBook.innerHTML = 'Remove';
    removeBook.addEventListener('click', () => savebook.removeBook(index.bookid));
    displaybook.appendChild(removeBook);
    const hr = document.createElement('h1');
    hr.innerHTML ='<hr/>';
    displaybook.appendChild(hr);
    listOfbooks.appendChild(displaybook);
  }
  // Add Button
  const addnewBook = document.getElementById('add-btn');
  addnewBook.addEventListener('click', () => {
    const item = getformInput();
    savebook.addBook(item);
  });