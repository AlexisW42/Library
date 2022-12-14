const booksMyShelf = [];
const placeCard = document.querySelector('.shelf');
const newBookButton = document.querySelector('.add-book-button');
const addBookScreen = document.querySelector('.add-book-screen');
const inputAddBookForm = document.querySelectorAll('input');
const closeForm = document.querySelector('.close-form')
const addToShelfButton = document.querySelector('.add-to-shelf')

showBooks();

class Book {

  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  showInfo = function () {
    if (this.read) {
      return `<div class="text-card-book"> 
                <span style="font-size: 1.5rem">${this.title}</span><br>
                by ${this.author}<br>
                ${this.pages} pages<br>
                read yet
              </div>`;
    }
    else {
      return `<div class="text-card-book"> 
                <span style="font-size: 1.5rem">${this.title}</span><br>
                by ${this.author}<br>
                ${this.pages} pages<br>
                not read yet
              </div>`;
    }
  }
}

function addBooksMyShelf(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  booksMyShelf.push(newBook);
  showBooks();
}

Book.prototype.readChange = function () {
  this.read = !this.read;
}

function showBooks() {
  placeCard.innerHTML = "";
  if (booksMyShelf.length === 0)
    thereAreNoBooks();
  else {
    booksMyShelf.forEach((element, index) => {

      const remove = document.createElement('button');
      remove.innerHTML = 'remove';
      remove.addEventListener('click', removeBook);

      const change = document.createElement('button');
      change.innerHTML = 'Change status';
      change.addEventListener('click', changeStatus);

      const tag = document.createElement('div');
      tag.setAttribute('class', 'card');
      tag.setAttribute('id', index);
      tag.innerHTML = `${element.showInfo()}`
      tag.appendChild(change);
      tag.appendChild(remove);
      placeCard.appendChild(tag);
    });
  }
}

function removeBook(e) {
  booksMyShelf.splice(e.target.parentElement.id, 1);
  showBooks();
}

function changeStatus(e) {
  let index = e.target.parentElement.id;
  booksMyShelf[index].readChange();
  showBooks();
}

function thereAreNoBooks() {
  const tag = document.createElement('div');
  tag.innerHTML = `There are currently no books`
  placeCard.appendChild(tag);
}

function deleteInputs() {
  inputAddBookForm.forEach(element => {
    element.value = '';
  });
  inputAddBookForm[3].checked = false;
}

newBookButton.addEventListener('click', (e) => {
  addBookScreen.style.display = 'grid';
});

closeForm.addEventListener('click', (e) => {
  addBookScreen.style.display = 'none';
  deleteInputs();
});

addToShelfButton.addEventListener('click', (e) => {
  addBookScreen.style.display = 'none';
  let title = inputAddBookForm[0].value;
  let author = inputAddBookForm[1].value;
  let pages = inputAddBookForm[2].value;
  let read = inputAddBookForm[3].checked;
  addBooksMyShelf(title, author, pages, read)
  deleteInputs();
});