let showBookButton = document.querySelector('#showBookButton');
let addBookModal = document.querySelector('#addBookModal');

let bookForm = document.querySelector('#bookForm');
let titleInput = document.querySelector('#title');
let authorInput = document.querySelector('#author');
let pagesInput = document.querySelector('#pages');
let readStatus = document.querySelector('#status');

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
    let userInput = new Book(titleInput.value, authorInput.value, pagesInput.value, readStatus.value)

    myLibrary.push(userInput);
    e.preventDefault();
    addBookModal.close()
    bookForm.reset();
    addBookToLibrary();
});

cancelButton.addEventListener('click', () =>{
    addBookModal.close();
});  

function addBookToLibrary(){
    
    console.log(myLibrary
        
    )
}
