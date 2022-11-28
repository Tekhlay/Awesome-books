let BookData = {};

function addBook(new_book) {
    //BookData.push(new_book);
    localStorage.setItem('BookDB', JSON.stringify(BookData));
    // addToUI(book);
  }
const addform = document.querySelector('.addbook');
const title = document.querySelector('#title');
const author = document.querySelector('#author');

addform.addEventListener('submit', (e) =>{
    e.preventDefault();
    BookData = {
        'title' : title.value,
        'author': author.value,
    };
    addBook(book);
})