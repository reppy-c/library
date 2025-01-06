const myLibrary = []

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

function addBookToLibrary() {
    
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295);

console.log(theHobbit.info());