const formBook = document.getElementById('form-book');
const title = document.getElementById('title');
const genre = document.getElementById('genre');
const author = document.getElementById('author');
const readed = document.getElementById('readed');
const paragraph = document.getElementById('paragraph');

async function postBook(evt) {
    evt.preventDefault();

    if (title.value === '' || genre.value === '' || author.value === '')
        alert('Complete los campos!');

    const sendBody = {
        title: title.value,
        genre: genre.value,
        author: author.value,
        read: document.querySelector('#readed').checked
    }

    try {
        const res = await fetch('/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendBody)
        });

        if (res.status === 400) {
            throw Error('Ya existe este libro!');
        }
        
        alert('Libro guardado!');
    } catch (error) {
        alert(error);
        return;
    };
}

async function getBooks(evt){
    evt.preventDefault();

    const res = await fetch('/api/books');
    const books = await res.json();
    
    console.log(books);
    const elements = books.map(book => JSON.stringify(book,null,4));

    paragraph.innerText = elements;
}


formBook.querySelector('#post').addEventListener('click', postBook);
formBook.querySelector('#get').addEventListener('click', getBooks);