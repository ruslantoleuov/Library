const addBtn = document.querySelector(".btn-add");
const modal = document.querySelector(".modal");
const modalForm = document.querySelector(".modal .form");
const addBook = document.querySelector(".btn-add-book");
const titleInputEl = document.getElementById("title");
const authorInputEl = document.getElementById("author");
const pagesInputEL = document.getElementById("pages");
const isRead = document.getElementById("isRead");
const bookshelfContainer = document.querySelector(".bookshelf");

let myLibrary = [];

class Book {
  constructor(id, title, author, pages, isRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  changeReadStatus() {
    if (this.isRead) {
      this.isRead = false;
    } else {
      this.isRead = true;
    }
  }
}

function showModal() {
  if (!modal.classList.contains("open")) {
    modal.classList.add("open");
  }
}

function closeModal(e) {
  if (e.target === modal && modal.classList.contains("open")) {
    modal.classList.remove("open");
    modalForm.reset();
  }
}

function handleForm(e) {
  e.preventDefault();
  e.target.reset();
}

function generateCard(book) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-id", book.id);
  const titleSpan = document.createElement("span");
  titleSpan.classList.add("title");
  titleSpan.textContent = book.title;
  const authorSpan = document.createElement("span");
  authorSpan.classList.add("author");
  authorSpan.textContent = book.author;
  const pagesSpan = document.createElement("span");
  pagesSpan.classList.add("pages");
  pagesSpan.textContent = `${book.pages} pages`;
  const readButton = document.createElement("button");
  readButton.setAttribute("type", "button");
  if (book.isRead) {
    readButton.textContent = "Read";
    readButton.classList.add("read");
  } else {
    readButton.textContent = "Not read";
    readButton.classList.add("not-read");
  }
  const removeButton = document.createElement("button");
  removeButton.setAttribute("type", "button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove");
  card.append(titleSpan, authorSpan, pagesSpan, readButton, removeButton);
  bookshelfContainer.appendChild(card);
}

function removeCard(e) {
  if (e.target.classList.contains("remove")) {
    for ([index, book] of myLibrary.entries()) {
      if (book.id === e.target.parentNode.dataset.id) {
        myLibrary.splice(index, 1);
        e.target.parentNode.remove();
      }
    }
  }
}

function addBookToLibrary(e) {
  if (
    titleInputEl.value &&
    authorInputEl.value &&
    pagesInputEL.value &&
    modal.classList.contains("open")
  ) {
    myLibrary.push(
      new Book(
        uuidv4(),
        titleInputEl.value,
        authorInputEl.value,
        pagesInputEL.value,
        isRead.checked
      )
    );
    modal.classList.remove("open");
    generateCard(myLibrary[myLibrary.length - 1]);
  }
}

function checkInputField(e) {
  if (e.target.validity.valueMissing) {
    e.target.setCustomValidity("Please fill out this field.");
    e.target.reportValidity();
  } else {
    e.target.setCustomValidity("");
  }
}

function changeClasses(target, remove, add, textContent) {
  target.classList.remove(remove);
  target.classList.add(add);
  target.textContent = textContent;
  for ([index, book] of myLibrary.entries()) {
    if (target.parentNode.dataset.id === book.id) {
      myLibrary[index].changeReadStatus();
    }
  }
}

function toggleReadStatus(e) {
  if (e.target.classList.contains("read")) {
    changeClasses(e.target, "read", "not-read", "Not read");
  } else if (e.target.classList.contains("not-read")) {
    changeClasses(e.target, "not-read", "read", "Read");
  }
}

modal.addEventListener("click", closeModal);
modalForm.addEventListener("submit", handleForm);
addBtn.addEventListener("click", showModal);
addBook.addEventListener("click", addBookToLibrary);
bookshelfContainer.addEventListener("click", removeCard);
bookshelfContainer.addEventListener("click", toggleReadStatus);
titleInputEl.addEventListener("input", checkInputField);
authorInputEl.addEventListener("input", checkInputField);
pagesInputEL.addEventListener("input", checkInputField);
