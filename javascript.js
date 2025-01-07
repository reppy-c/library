const myLibrary = []
const div_bookShelf = document.querySelector('#bookshelf');

function Book(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        var returnString = this.title + " by " + this.author + ", " + this.pages;

        if(this.read)
            returnString += ", read.";
        else returnString += ", not read yet.";

        return(returnString);
    };
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Clear out old library and render new
function renderLibrary() {

    // Delete old HTML
    // For each book in the library
        // Create the HTML
        // Append it to the bookshelf HTML

    const bookToCreate = createBookHTML(myLibrary[0]);

    div_bookShelf.appendChild(bookToCreate);
}

// Function returns single book HTML with properly hidden bits etc.
function createBookHTML(book) {
    
    // This is the div to return
    const bookToCreate = document.createElement("div");

    // The index of the new item (length of array)
    bookToCreate.id = myLibrary.length;
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
            <a class="book-markUnread jost" href="">Mark As Unread</a>
            <a class="book-markRead jost" href="">Mark As Read</a>
            <a class="book-remove jost" href="">Remove</a>
        </div>
    `;
    bookToCreate.innerHTML = bookHTML(book);

    // Depending if read or not, hide the corresponding badge and CTA
    if(book.read) {
        console.log("hi");
        bookToCreate.getElementsByClassName('badge unread')[0].classList.add("hide");
        bookToCreate.getElementsByClassName('book-markRead')[0].classList.add("hide");
    } else {
        bookToCreate.getElementsByClassName('badge read')[0].classList.add("hide");
        bookToCreate.getElementsByClassName('book-markUnread')[0].classList.add("hide");
    }

    return bookToCreate;
}


const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);

addBookToLibrary(theHobbit);

renderLibrary();