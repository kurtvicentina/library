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


submitButton.addEventListener('click', (e) => {
    if(readStatus.checked){
        book = new Book(titleInput.value, authorInput.value, pagesInput.value, readStatus.value);
    }
    else{
        book = new Book(titleInput.value, authorInput.value, pagesInput.value, notRead.value);
    }

    e.preventDefault();
    myLibrary.push(book);
    addBookModal.close()
    bookForm.reset();
    addBookToLibrary();
});

cancelButton.addEventListener('click', () =>{
    addBookModal.close();
});

// readStatus.addEventListener('change', changeReadStatus())

// function changeReadStatus(e) {
//     if(readStatus.checked){
//         e.status = readStatus.value
//     }
//         e.status = notRead.value
// }

function addBookToLibrary(){
    
    console.log(myLibrary);

    let newBookContainer = document.createElement('div');
    let newBookHeader = document.createElement('h3');
    let newBookAuthor = document.createElement('p');
    let newBookPage = document.createElement('p');
    let newBookReadStatus = document.createElement('p');
    let newLabelContainer = document.createElement('label');
    let newLabel = document.createElement('label');
    let newSwitch = document.createElement('input');
    newSwitch.type = 'checkbox';
    let newSlider = document.createElement('span');

    newBookHeader.textContent = book.title;
    newBookAuthor.textContent = book.author;
    newBookPage.textContent = book.pages;
    newBookReadStatus.textContent = book.status;

    newBookContainer.setAttribute('class', 'book');
    newBookHeader.setAttribute('class', 'title-container');
    newBookPage.setAttribute('class', 'author');
    newBookAuthor.setAttribute('class', 'pages');
    newBookReadStatus.setAttribute('class', 'status');
    newLabelContainer.setAttribute('class', 'status-label');
    newLabel.setAttribute('class', 'switch');
    newSwitch.setAttribute('id', 'switch');
    newSlider.setAttribute('class', 'slider');


    newBookReadStatus.append(newLabelContainer);
    newBookReadStatus.append(newLabel);
    newLabel.append(newSwitch);
    newLabel.append(newSlider);

    newBookContainer.append(newBookHeader);
    newBookContainer.append(newBookAuthor);
    newBookContainer.append(newBookPage);
    newBookContainer.append(newBookReadStatus);

    booksContainer.append(newBookContainer)
};
