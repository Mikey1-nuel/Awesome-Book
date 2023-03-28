/* checking the local storage for a book collection list. If non present,
we create a new array to store new books. */

let bookCollection = JSON.parse(localStorage.getItem('bookCollection')) || [];

// Getting documents from html

const bookCollectionList = document.querySelector('.book-list');
const addBtn = document.getElementById('add-form');
const bookTitle = document.querySelector('.titleinput');
const bookAuthor = document.querySelector('.authorinput');

// Function to add a new book to the collection

function add(title, author) {
  bookCollection.push({ title, author });
  localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
}

// Function to remove book from collection

function remove(index) {
  bookCollection = bookCollection.filter((book, bookIndex) => bookIndex !== +index);
  localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
}

// Function to render the book list

function renderBooks() {
  bookCollectionList.innerHTML = bookCollection
    .map(
      (book, bookIndex) => `
          <div class="container">
            <li>
              ${book.title}
            </li>
            <li>
              ${book.author}
            </li>
            <button class='removebtn' 
            id="remove-btn"
            data-index='${bookIndex}'>Remove
            </button>        
            <hr class='book-separation'>
          </div>
        `,
    )
    .join('');
}

renderBooks();
