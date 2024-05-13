// Arrays
const books = [];
const users = [];
const admins = [];
const rating = [{ userLogin: "example1", nameOfBook: "Scott Pilgrim's Precious Little Life", ratingScore: 10 }, { userLogin: "example2", nameOfBook: "Scott Pilgrim's Precious Little Life", ratingScore: 9 }];

// Books
class Book {
    constructor(bookName, bookAuthor, bookYear, bookStatus, bookId) {
        this.bookName = bookName;
        this.bookAuthor = bookAuthor;
        this.bookYear = bookYear;
        this.bookStatus = bookStatus;
        this.bookId = bookId;
        books.push(this);
    };
    addRating() {
        let check = false;
        let check2 = false;
        let userLogin = prompt("Please, enter your Login");
        let userPassword = prompt("Please, enter your Password");
        for (let user of users) {
            if (user.login === userLogin && user.password === userPassword) {
                for (let item of user.listOfCompletedBooks) {
                    for (let item of rating) {
                        if (item.userLogin === userLogin && item.nameOfBook === this.bookName) {
                            alert("You have already rated this book!");
                            return null;
                        }
                    }
                    if (item === this.bookName) {
                        let nameOfBook = this.bookName;
                        let ratingScore = prompt("And now, please rate the book on a scale from 0 to 10");
                        if (isNaN(ratingScore)) {
                            alert("You sly fox! You ought to write a number!")
                        } else if (Number(ratingScore) < 0 || Number(ratingScore) > 10) {
                            alert("As I said: on a scale from 1 to 10");
                        } else {
                            alert("Your review has been recorded, if it was good: thank you!");
                            ratingScore = Number(ratingScore);
                            rating.push({ userLogin, nameOfBook, ratingScore });
                        }
                        check2 = true;
                    }
                }
                check = true;
            }
        }
        if (check == false) {
            console.log("You've entered wrong login and/or password");
        }
        if (check2 == false) {
            console.log("You haven't read this book");
        }
    }
    getAverageRating() {
        let sum = 0;
        let count = 0;
        for (let item of rating) {
            if (item.nameOfBook === this.bookName) {
                sum += item.ratingScore;
                count++;
            }
        }
        if (count > 0) {
            sum = sum / count;
            sum = sum.toFixed(2);
            console.log("Average rating for " + this.bookName + " is " + sum + " out of 10");
        } else {
            alert("This book doesn't have a rating yet or you have misspelled its name");
        }
    }

};

const scottPart1 = new Book("Scott Pilgrim's Precious Little Life", "Bryan Lee O'Malley's", "2004", "available", 1);
const scottPart2 = new Book("Scott Pilgrim vs the World", "Bryan Lee O'Malley's", "2005", "available", 2);
const scottPart3 = new Book("Scott Pilgrim and the Infinite Sadness", "Bryan Lee O'Malley's", "2006", "available", 3);
const scottPart4 = new Book("Scott Pilgrim Gets it Together", "Bryan Lee O'Malley's", "2007", "available", 4);
const scottPart5 = new Book("Scott Pilgrim vs the Universe", "Bryan Lee O'Malley's", "2009", "available", 5);
const scottPart6 = new Book("Scott Pilgrim's Finest Hour", "Bryan Lee O'Malley's", "2010", "available", 6);
const lotrPart1 = new Book("The Fellowship of the Ring", "John Tolkien", "1954", "taken", 7);
const lotrPart2 = new Book("The Two Towers", "John Tolkien", "1954", "taken", 8);
const lotrPart3 = new Book("The Return of the King", "John Tolkien", "1955", "taken", 9);
const harryPotterPart1 = new Book("Harry Potter and the Philosopher's Stone", "Joanne Rowling", "1997", "available", 10);

// Users
class User {
    constructor(login, password) {
        this.login = login;
        this.password = password;
        this.listOfCompletedBooks = [];
        users.push(this);
    };
    listBooks() {
        console.log("Please, check our library and remember the id of the book that you want to borrow: ")
        console.log("---");
        for (let book of books) {
            console.log("Book's name: " + book.bookName);
            console.log("Book's author: " + book.bookAuthor);
            console.log("Year: " + book.bookYear);
            console.log("Book's status: " + book.bookStatus);
            console.log("Id: " + book.bookId);
            console.log("---")
        }
    };
    findBooksByName() {
        let searchName = prompt("Please, enter one keyword from the book's name");
        console.log("---");
        for (let book of books) {
            let temporary = book.bookName.split(" ");
            for (let i = 0; i < temporary.length; i++) {
                if (searchName == temporary[i]) {
                    console.log("Book's name: " + book.bookName);
                    console.log("Book's author: " + book.bookAuthor);
                    console.log("Year: " + book.bookYear);
                    console.log("Book's status: " + book.bookStatus);
                    console.log("Id: " + book.bookId);
                    console.log("---");
                }
            }
        };
    };
    findBooksByAuthor() {
        let searchAuthor = prompt("Please, enter Author's name or last name");
        console.log("---");
        for (let book of books) {
            let temporary = book.bookAuthor.split(" ");
            for (let i = 0; i < temporary.length; i++) {
                if (searchAuthor == temporary[i]) {
                    console.log("Book's name: " + book.bookName);
                    console.log("Book's author: " + book.bookAuthor);
                    console.log("Year: " + book.bookYear);
                    console.log("Book's status: " + book.bookStatus);
                    console.log("Id: " + book.bookId);
                    console.log("---");
                }
            }
        };
    };
    borrowBook() {
        let check = false;
        let userChoice = prompt("Please enter the id of the book that you want to borrow:");
        for (let book of books) {
            if (book.bookId === Number(userChoice) && book.bookStatus === "available") {
                console.log("The book " + book.bookName + " has been assigned to you. You have 2 weeks to read and return the book. Or else...");
                book.bookStatus = "taken";
                check = true;
            }
        }
        if (check == false) {
            console.log("The book with entered id hasn't been found or it isn't available at the moment");
        }
    };
    returnBook() {
        let check = false;
        let userChoice = prompt("Please enter the id of the book that you want to return:");
        for (let book of books) {
            if (book.bookId === Number(userChoice) && book.bookStatus === "taken") {
                this.listOfCompletedBooks.push(book.bookName);
                console.log("Thanks for returning " + book.bookName + " in time!");
                book.bookStatus = "available";
                check = true;
            }
        }
        if (check == false) {
            console.log("The book with entered id hasn't been found or it isn't taken at the moment");
        }
    };
}

const astrid = new User("Astrid", "astrid123");
const william = new User("William", "william123");
const vera = new User("Vera", "vera123");
const noah = new User("Noah", "noah123");

// Admins
class Admin {
    constructor(login, password) {
        this.login = login;
        this.password = password;
        admins.push(this);
    };
    findBooksByName() {
        let searchName = prompt("Please, enter one keyword from the book's name");
        console.log("---");
        for (let book of books) {
            let temporary = book.bookName.split(" ");
            for (let i = 0; i < temporary.length; i++) {
                if (searchName == temporary[i]) {
                    console.log("Book's name: " + book.bookName);
                    console.log("Book's author: " + book.bookAuthor);
                    console.log("Year: " + book.bookYear);
                    console.log("Book's status: " + book.bookStatus);
                    console.log("Id: " + book.bookId);
                    console.log("---");
                }
            }
        };
    };
    findBooksByAuthor() {
        let searchAuthor = prompt("Please, enter Author's name or last name");
        console.log("---");
        for (let book of books) {
            let temporary = book.bookAuthor.split(" ");
            for (let i = 0; i < temporary.length; i++) {
                if (searchAuthor == temporary[i]) {
                    console.log("Book's name: " + book.bookName);
                    console.log("Book's author: " + book.bookAuthor);
                    console.log("Year: " + book.bookYear);
                    console.log("Book's status: " + book.bookStatus);
                    console.log("Id: " + book.bookId);
                    console.log("---");
                }
            }
        };
    };
    listAvailableBooks() {
        console.log("---")
        for (let book of books) {
            if (book.bookStatus === "available") {
                console.log("Book's name: " + book.bookName);
                console.log("Book's author: " + book.bookAuthor);
                console.log("Year: " + book.bookYear);
                console.log("---")
            }
        }
    };
}
const adminVlad = new Admin("Vlad Zhuravel", "Vlad123");
const adminDenys = new Admin("Denys Kohut", "Denys123");