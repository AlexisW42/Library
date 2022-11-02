const booksMyShelf = [];
const placeCard = document.querySelector('.shelf');
const newBookButton = document.querySelector('.add-book-button');
const addBookScreen = document.querySelector('.add-book-screen');
showBooks();

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.showInfo = function () {
    if (read)
      return `<span style="font-size: 1.5rem">Title: ${this.title}</span><br>
                by: ${this.author}<br>
                ${this.pages} pages<br>
                read yet`
    else
      return `<span style="font-size: 1.5rem">Title: ${this.title}</span><br>
                by: ${this.author}<br>
                ${this.pages} pages<br>
                not read yet`
  }
}

function addBooksMyShelf(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  booksMyShelf.push(newBook);
  showBooks();
}

function showBooks() {
  placeCard.innerHTML = "";
  if (booksMyShelf.length === 0)
    thereAreNoBooks();
  else {
    booksMyShelf.forEach((element, index) => {
      const tag = document.createElement('div');
      tag.setAttribute('class', 'card');
      tag.setAttribute('id', index);
      tag.innerHTML = `${element.showInfo()}`
      placeCard.appendChild(tag);
    });
  }
}

function thereAreNoBooks() {
  const tag = document.createElement('div');
  // tag.setAttribute('class', 'card');
  tag.innerHTML = `There are currently no books`
  placeCard.appendChild(tag);
}