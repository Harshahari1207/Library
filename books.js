const addBookButton = document.querySelector(".add-book-button");
const submitButton = document.querySelector(".submit-button");
const resetButton = document.querySelector(".reset-button");


// Form Validation
const title = document.querySelector('#title');
const titleError1 = document.querySelector("#titleError");
title.addEventListener("keyup", titleError);
const author = document.querySelector('#author');
const authorError1 = document.querySelector("#authorError");
author.addEventListener("keyup", authorError);
const submitError = document.querySelector("#submitError");

// Empty library
const myLibrary = [];

// constructor 
function Book(Title, Author, Pages, read){
    this.Title = Title;
    this.Author = Author;
    this.Pages = Pages;
    this.Read = read;
}

// adding book to library
function addBookToLibrary(Title, Author, Pages, Read){
    let book = new Book(Title, Author, Pages, Read);
    myLibrary.unshift(book);
    displayBooksOnPage();
}


// Displaying and extra stuff
function displayBooksOnPage(){
    const books = document.querySelector(".books");

    // Remove previously created divs
    const removeDivs = document.querySelectorAll(".card");
    for(let i=0; i<removeDivs.length; i++){
        removeDivs[i].remove();
    }
    let index = 0;
    myLibrary.forEach(myLibrarys =>{
        // Creating card in Library div
        const card = document.createElement("div");
        card.classList.add("card");
        books.appendChild(card);

        // Creating Remove Book button in the book individually
        const removeBookButton = document.createElement("button");
        removeBookButton.classList.add("remove-button");
        removeBookButton.textContent = "Delete";
        console.log("Show current array objects inside of foreach", myLibrary);

        // Linking the data attribute of the remove button to the array and card
        removeBookButton.dataset.linkedArray = index;
        console.log("Index: ", removeBookButton.dataset.linkedArray);
        console.log("Show the datatset link back to the array....", removeBookButton);
        card.appendChild(removeBookButton);
        // Function for removing form the library
        removeBookButton.addEventListener("click", removeBookFromLibrary);
        function removeBookFromLibrary(){
            let retrieveBootToRemove = removeBookButton.dataset.linkedArray;
            console.log("Attempting to remove the Book index of....", parseInt(retrieveBootToRemove));
            myLibrary.splice(parseInt(retrieveBootToRemove), 1);
            card.remove();
            displayBooksOnPage();
        }

        // Create read status of a book
        const readStatusButton = document.createElement("button");
        readStatusButton.classList.add("read-status-button");
        
        readStatusButton.textContent = "Read status";

        // Link the data attribute of the toggle read button to the array and card
        readStatusButton.dataset.linkedArray = index;
        console.log("linked index of the toggling book....", readStatusButton.dataset.linkedArray);
        card.appendChild(readStatusButton);

        // Create event listner/toggle logic for array objects prototype for read status change
        readStatusButton.addEventListener("click", toggleReadStatus);
        function toggleReadStatus(){
            let retrieveBookToToggle = readStatusButton.dataset.linkedArray;
            console.log("indexof read: ",readStatusButton.dataset.linkedArray);
            Book.prototype = Object.create(Book.prototype);
            const toggleBook = new Book();
            console.log("Toggle book",toggleBook)
            console.log("prototype",Book.prototype);
            console.log("what is the toggle initial value?...", myLibrary[parseInt(retrieveBookToToggle)].Read);
            if((myLibrary[parseInt(retrieveBookToToggle)].Read) == "Yes"){
                toggleBook.Read = "No";
                myLibrary[parseInt(retrieveBookToToggle)].Read = toggleBook.Read;
            }else{
                toggleBook.Read = "Yes";
                myLibrary[parseInt(retrieveBookToToggle)].Read = toggleBook.Read;
            }
            displayBooksOnPage();
        }
        // Displaying every book information
        for(let key in myLibrarys){
            console.log(`${key}: ${myLibrarys[key]}`);
            const para = document.createElement("p");
            para.textContent = (`${key}: ${myLibrarys[key]}`);
            card.appendChild(para);
        }
        index++;
        
    })
}

// Adding book into library
addBookButton.addEventListener("click", displayBookForm);
function displayBookForm(){
    document.getElementById("add-book-form").style.display = "";
    document.getElementById("add-book-form").style.backgroundColor = "var(--primaryColor)";
}


// Intaking data from form and submiting form
submitButton.addEventListener("click", intakeFormData);
function intakeFormData(){
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let read = document.getElementById("Read").value;
    
    document.getElementById("add-book-form").style.display = "none";
    // Checking if form is complete or not
    if((title == "") || (author == "") || (pages == "") || (read == "")){
        return;
    }

    // Calling the function to input the datato array
    addBookToLibrary(title, author, pages, read);
    document.getElementById("add-book").reset();
}

// Clearing form
resetButton.addEventListener("click", clearForm);
function clearForm(){
    document.getElementById("add-book").reset();
}


function titleError(){
    
    title1 = title.value;
    console.log(title1);
    if(title1.length === 0){
        titleError1.innerHTML = "Title is required";
        return false;
    }
    // if(!title1.match(/^[A-Za-z]&/)){
    //     titleError1.innerHTML = "Error";
    //     return false;
    // }
    titleError1.style.color = "green";
    titleError1.innerHTML = 'Valid';
    return true;
}
function authorError(){
    
    author1 = author.value;
    console.log(author1);
    if(author1.length === 0){
        authorError1.innerHTML = "Author Name is required";
        authorError1.style.color = "red";
        return false;
    }
    if(author1.match(/^[A-Za-z\s]*$/)){
        console.log(author1);
        authorError1.innerHTML = "Valid";
        authorError1.style.color = "green";
        return true;
    }
    // }if(author1.match(/\W|_/)){
    //     authorError1.innerHTML = "Name shouldn't have special characters";
    //     authorError1.style.color = "green";
    //     return false;
    // }
    authorError1.style.color = "red";
    authorError1.innerHTML = 'Name should not have numbers and special characters';
    return false;
}

// submitButton.addEventListener("click", validForm);

function validForm(){
    if(!titleError() || !authorError()){
        submitError.innerHTML = "Fix the error that appear in the input of the form"
        submitError.style.color = "red";
        submitError.setTimeout(function(){
            submitError.style.display = 'none';
        }, 1000);
        return false;
    }
    // }else{
    //     submitError.innerHTML = "";
    //     intakeFormData;

    //     return true;
        

    // }
}