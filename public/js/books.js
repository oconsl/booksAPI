const formBook = document.getElementById("form-book");
const title = document.getElementById("title");
const genre = document.getElementById("genre");
const author = document.getElementById("author");
const readed = document.getElementById("readed");
const paragraph = document.getElementById("paragraph");
const bookId = document.getElementById("book-id");

async function postBook(evt) {
  evt.preventDefault();

  if (title.value === "" || genre.value === "" || author.value === "")
    alert("Complete los campos!");

  const sendBody = {
    title: title.value,
    genre: genre.value,
    author: author.value,
    read: document.querySelector("#readed").checked,
  };

  try {
    const res = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendBody),
    });
    const bookAdded = await res.json();

    console.log(bookAdded);
    alert("Libro guardado!");
  } catch (error) {
    alert(error);
    return;
  }
}

async function getBooks(evt) {
  evt.preventDefault();

  const res = await fetch("/api/books", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const books = await res.json();

  console.log(books);
  const elements = books.map((book) => JSON.stringify(book, null, "    "));

  paragraph.innerText = elements;
}

async function deleteBookById(evt) {
  evt.preventDefault();

  const res = await fetch("/api/books/" + bookId.value, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });

  alert("Libro borrado!");
}

async function putBookById(evt) {
  evt.preventDefault();

  const sendBody = {
    title: title.value,
    genre: genre.value,
    author: author.value,
    read: document.querySelector("#readed").checked,
  };

  const res = await fetch("/api/books/" + bookId.value, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(sendBody),
  });

  alert("Libro modificado!");
}

formBook.querySelector("#post").addEventListener("click", postBook);
formBook.querySelector("#get").addEventListener("click", getBooks);
formBook.querySelector("#delete").addEventListener("click", deleteBookById);
formBook.querySelector("#put").addEventListener("click", putBookById);
