// eslint-disable-next-line max-classes-per-file
class Bookdetails {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Collection {
  static getData() {
    const bookCollection = JSON.parse(localStorage.getItem('bookCollection')) || [];
    return bookCollection;
  }

  static add(newBook) {
    const bookCollection = Collection.getData();
    bookCollection.push(newBook);
    localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
  }

  static remove(index) {
    let bookCollection = Collection.getData();
    bookCollection = bookCollection.filter((book, bookIndex) => bookIndex !== +index);
    localStorage.setItem('bookCollection', JSON.stringify(bookCollection));
  }
}

class Display {
  static renderBooks() {
    const bookCollectionList = document.querySelector('.book-list');
    const bookCollection = Collection.getData();
    bookCollectionList.innerHTML = bookCollection
      .map((book, bookIndex) => (bookIndex % 2 === 0 ? `
<div class="container show">
<ul class="sub-container">
<li>
"${book.title}" by
</li>
<li>
${book.author}
</li>
</ul>
<button class='removebtn' 
id="remove-btn"
data-index='${bookIndex}'>Remove
</button>        
</div>
        ` : `
<div class="container">
<ul class="sub-container">
<li>
"${book.title}" by
</li>
<li>
${book.author}
</li>
</ul>
<button class='removebtn' 
id="remove-btn"
data-index='${bookIndex}'>Remove
</button>        
</div>
`)).join('');
  }
}

document.addEventListener('DOMContentLoaded', Display.renderBooks);

const addBtn = document.getElementById('add-form');
const bookTitle = document.querySelector('.titleinput');
const bookAuthor = document.querySelector('.authorinput');

addBtn.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = bookTitle.value;
  const author = bookAuthor.value;
  const newBook = new Bookdetails(title, author);
  if (title && author) {
    // Add book and refresh book collection.
    Collection.add(newBook);
    Display.renderBooks();
    addBtn.reset();
  }
});

const bookCollectionList = document.querySelector('.book-list');
bookCollectionList.addEventListener('click', (e) => {
  if (e.target.matches('.removebtn')) {
    const indexNo = e.target.dataset.index;
    // A function to remove book
    Collection.remove(indexNo);
    Display.renderBooks();
  }
});

const list = document.querySelector('.list-link');
const addNew = document.querySelector('.add-link');
const contact = document.querySelector('.contact-link');
const date = document.getElementById('date-time');

const live = () => {
  const newDate = Date().slice(0, 25);
  date.innerHTML = newDate;
};
setInterval(live, 1000);

const listSection = document.querySelector('.container1');
const addSection = document.querySelector('.form');
const contactSection = document.querySelector('.contact');
const hr = document.querySelector('.hr');

list.addEventListener('click', () => {
  listSection.style.display = 'flex';
  addSection.style.display = 'none';
  contactSection.style.display = 'none';
  hr.style.display = 'none';
  document.querySelector('.list-link').style.color = 'blue';
  document.querySelector('.add-link').style.color = 'black';
  document.querySelector('.contact-link').style.color = 'black';
});
addNew.addEventListener('click', () => {
  listSection.style.display = 'none';
  addSection.style.display = 'flex';
  contactSection.style.display = 'none';
  document.querySelector('.list-link').style.color = 'black';
  document.querySelector('.add-link').style.color = 'blue';
  document.querySelector('.contact-link').style.color = 'black';
});
contact.addEventListener('click', () => {
  listSection.style.display = 'none';
  addSection.style.display = 'none';
  contactSection.style.display = 'flex';
  document.querySelector('.list-link').style.color = 'black';
  document.querySelector('.add-link').style.color = 'black';
  document.querySelector('.contact-link').style.color = 'blue';
});
