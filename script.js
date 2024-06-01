let showBookButton = document.querySelector('#showBookButton');
let addBookModal = document.querySelector('#addBookModal');

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
});

cancelButton.addEventListener('submit', () => {
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

    newBookHeader.textContent = book.title;
    newBookAuthor.textContent = book.author;
    newBookPage.textContent = book.pages;
    newStatusText.textContent = book.status;
    deleteButton.textContent = 'Delete'

    let bookIndex = myLibrary.indexOf(book);

    newBookContainer.setAttribute('class', 'book');
    newBookContainer.setAttribute('data-index', bookIndex)
    newBookHeader.setAttribute('class', 'title-container');
    newBookPage.setAttribute('class', 'author');
    newBookAuthor.setAttribute('class', 'pages');
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
};
