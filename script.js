// Existing code...
let showBookButton = document.querySelector('#showBookButton');
let addBookModal = document.querySelector('#addBookModal');

let mainContainer = document.querySelector('.main-content');
let searchBar = document.querySelector('#search');
let bookForm = document.querySelector('#bookForm');
let booksContainer = document.querySelector('.books-container');
let titleInput = document.querySelector('#title');
let authorInput = document.querySelector('#author');
let pagesInput = document.querySelector('#pages');
let readStatus = document.querySelector('#switch');
let notRead = document.querySelector('#notRead');

let book;

let cancelButton = document.querySelector('#cancelBookButton');
let submitButton = document.querySelector('#addBookButton');

showBookButton.addEventListener('click', () => {
    addBookModal.showModal();
});

const myLibrary = [];

function isNoBook(array) {
    let noBookAlert = document.querySelector('.if-no-book');

    if (array.length === 0 || array.every(array => array === undefined)) {
        if (!noBookAlert) {
            noBookAlert = document.createElement('h1');
            noBookAlert.setAttribute('class', 'if-no-book');
            noBookAlert.textContent = `It looks like you don't have any books yet...`;
            mainContainer.append(noBookAlert);
        }
    } else {
        if (noBookAlert) {
            noBookAlert.remove();
        }
    }
}

isNoBook(myLibrary);

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;   
}

Book.prototype.isRead = function (){
    return this.status = 'Already Read'
}

Book.prototype.isNotRead = function (){
    return this.status = 'Not yet read'
}

submitButton.addEventListener('click', (e) => {
    if(titleInput.value && authorInput.value && pagesInput.value){

    let inputReadStatus;

    if (readStatus.checked) {
        book = new Book(titleInput.value, authorInput.value, pagesInput.value, readStatus.value);
        inputReadStatus = true;
    }
    else {
        book = new Book(titleInput.value, authorInput.value, pagesInput.value, notRead.value);
        inputReadStatus = false;
    }

    e.preventDefault();
    myLibrary.push(book);
    addBookModal.close()
    bookForm.reset();
    addBookToLibrary(inputReadStatus);
    isNoBook(myLibrary);
    }

});

cancelButton.addEventListener('click', () => {
    addBookModal.close();
});

function addBookToLibrary(inputReadStatus) {
    let newBookContainer = document.createElement('div');
    let newBookHeader = document.createElement('h3');
    let newBookAuthor = document.createElement('p');
    let newBookPage = document.createElement('p');
    let newBookReadStatus = document.createElement('p');
    let newStatusText = document.createElement('p')
    let newLabelContainer = document.createElement('label');
    let switchAndDelContainer = document.createElement('div');
    let newLabel = document.createElement('label');
    let newSwitch = document.createElement('input');
    newSwitch.type = 'checkbox';
    newSwitch.value = 'Already read'
    let newSlider = document.createElement('span');
    let newHiddenInput = document.createElement('input');
    newHiddenInput.type = 'hidden';
    newHiddenInput.value = 'Not yet read'
    let deleteButton = document.createElement('button')

    newBookHeader.textContent = `Title: ${book.title}`;
    newBookAuthor.textContent = `By: ${book.author}`;
    newBookPage.textContent = `Pages: ${book.pages}`;
    newStatusText.textContent = book.status;
    deleteButton.textContent = 'Delete'

    let bookIndex = myLibrary.indexOf(book);

    newBookContainer.setAttribute('class', 'book');
    newBookContainer.setAttribute('data-index', bookIndex)
    newBookHeader.setAttribute('class', 'title-container');
    newBookPage.setAttribute('class', 'pages');
    newBookAuthor.setAttribute('class', 'author');
    newBookReadStatus.setAttribute('class', 'status');
    switchAndDelContainer.setAttribute('class', 'sw-del-container')
    newLabelContainer.setAttribute('class', 'new-status-label');
    newLabel.setAttribute('class', 'switch');
    newSwitch.setAttribute('class', 'readSwitch');
    newSlider.setAttribute('class', 'slider');
    deleteButton.setAttribute('class', 'delete');

    newBookReadStatus.append(newStatusText)
    newBookReadStatus.append(switchAndDelContainer)
    switchAndDelContainer.append(newLabelContainer);
    switchAndDelContainer.append(newLabel);
    switchAndDelContainer.append(deleteButton);
    newLabel.append(newSwitch);
    newLabel.append(newSlider);
    newLabel.append(newHiddenInput);

    newBookContainer.append(newBookHeader);
    newBookContainer.append(newBookAuthor);
    newBookContainer.append(newBookPage);
    newBookContainer.append(newBookReadStatus);

    booksContainer.append(newBookContainer);

    if(inputReadStatus == true){
        newSwitch.checked = true;
    }

    deleteButton.addEventListener('click', () => {
        delete myLibrary[bookIndex];
        newBookContainer.remove();
        isNoBook(myLibrary)
    });

    newSwitch.addEventListener('change', () =>{
        if(newSwitch.checked){
            myLibrary[bookIndex].isRead();
            newStatusText.innerText = newSwitch.value;
        }
        else{
            myLibrary[bookIndex].isNotRead();
            newStatusText.innerText = newHiddenInput.value;
        }
    })

    console.log(bookIndex)
}

searchBar.addEventListener('input', () => {
    let searchInput = searchBar.value.toLowerCase();
    let books = document.querySelectorAll('.book');

    books.forEach(book => {
        let title = book.querySelector('.title-container').textContent.toLowerCase();
        let author = book.querySelector('.author').textContent.toLowerCase();
        if (title.includes(searchInput) || author.includes(searchInput)) {
            book.style.display = 'block';
        } else {
            book.style.display = 'none';
        }
    });
});
