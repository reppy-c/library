const myLibrary = []
const div_bookShelf = document.querySelector('#bookshelf');
const div_modal = document.querySelector('#scrim');
const form_addBook = document.querySelector('#form-addBook');

// Just keep incrementing ID for a book
// Will probably need to move to a hash instead when working with a real DB
var bookIDCounter = 1; 

// Book constructor
class Book {
    
    constructor(title, author, pages, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = bookIDCounter;
        bookIDCounter++;
    }
    
    info() {
        var returnString = this.title + " by " + this.author + ", " + this.pages;

        if(this.read)
            returnString += ", read.";
        else returnString += ", not read yet.";

        return(returnString);
    };
}

// Add the book to the array
function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Render entire library
function renderLibrary() {
    // For each book in the library, create and prepend
    myLibrary.forEach((book) => {
        div_bookShelf.prepend(createBookHTML(book));
    })
}

// Render one additional book
function renderBook(book) {
    div_bookShelf.prepend(createBookHTML(book));
}

// Function returns single book HTML with properly hidden bits etc.
function createBookHTML(book) {
    
    // This is the div to return
    const bookToCreate = document.createElement("div");

    // The index of the new item (length of array)
    bookToCreate.id = book.id;
    bookToCreate.classList.add("book");
    
    const bookHTML = (book) => `
        <div class="book-top">
            <span class="badge read jost">READ</span>
            <span class="badge unread jost">UNREAD</span>
        </div>
        
        <div class="book-mid">
            <h2>${book.title}</h2>
            <p>${book.author}</p>
            <p>${book.pages} pages</p>
        </div>

        <div class="book-bottom">
            <a class="book-markUnread jost" onclick="toggleReadStatus(this, ${book.id})">Mark As Unread</a>
            <a class="book-markRead jost" onclick="toggleReadStatus(this, ${book.id})">Mark As Read</a>
            <a class="book-remove jost" onclick="remove(this, ${book.id})">Remove</a>
        </div>
    `;
    bookToCreate.innerHTML = bookHTML(book);

    // Depending if read or not, hide the corresponding badge and CTA
    if(book.read) {
        bookToCreate.classList.add("read");
    }

    return bookToCreate;
}

// Toggles the scrim between display:none and flex
function toggleBookModal() {
    if(div_modal.style.display == "") {
        div_modal.style.display = "flex";
    } else {
        div_modal.style.display = "";
    }
}

// Toggles a book between read and unread in array and DOM
function toggleReadStatus(element, bookID) {
    myLibrary.forEach((book) => {
        if(book.id == bookID) {
            if(book.read == true) {
                book.read = false;
                element.parentNode.parentNode.classList.remove("read");
            }
            else {
                book.read = true;
                element.parentNode.parentNode.classList.add("read");
            }
        }        
    })
}

// Removes a book from array and DOM
function remove(element, bookID) {

    myLibrary.forEach((book) => {
        if(book.id == bookID) {
            const indexy = myLibrary.indexOf(book);
            
            myLibrary.splice(indexy, 1);
            element.parentNode.parentNode.remove();
        }
    })
}

// Main

// Add event listener to the add card
form_addBook.addEventListener('submit', function(event) {
    
    event.preventDefault();
    
    const formData = new FormData(form_addBook);
    const newBook = new Book(formData.get('add-title'), formData.get('add-author'), formData.get('add-pages'), formData.get('readStatus'))
    addBookToLibrary(newBook);

    toggleBookModal();
    form_addBook.reset();

    renderBook(newBook);
});

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary(book1);

const book2 = new Book('The Fellowship of the Ring', 'J.R.R. Tolkien', 673, true);
addBookToLibrary(book2);

const book3 = new Book('Here One Moment', 'Liane Moriarty', 722, true);
addBookToLibrary(book3);

const book4 = new Book('What Does It Feel Like', 'Sophie Kinsella', 563, true);
addBookToLibrary(book4);

renderLibrary();


