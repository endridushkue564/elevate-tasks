/* 
   Filename: complexCode.js
   Description: This code demonstrates a complex implementation of a library management system. It allows users to add, remove, and search for books, as well as keeping track of borrowed and returned books. It also provides statistical information and generates reports based on the library data.
*/

class Book {
  constructor(title, author, genre, year) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.year = year;
  }
}

class Library {
  constructor() {
    this.books = [];
    this.borrowedBooks = [];
    this.returnedBooks = [];
  }

  addBook(title, author, genre, year) {
    const book = new Book(title, author, genre, year);
    this.books.push(book);
  }

  removeBook(title) {
    const index = this.books.findIndex((book) => book.title === title);
    if (index !== -1) {
      const removedBook = this.books.splice(index, 1);
      return removedBook[0];
    }
    return null;
  }

  searchBooks(query, field) {
    let searchResults;
    switch (field) {
      case "title":
        searchResults = this.books.filter(
          (book) => book.title.toLowerCase().includes(query.toLowerCase())
        );
        break;
      case "author":
        searchResults = this.books.filter(
          (book) => book.author.toLowerCase().includes(query.toLowerCase())
        );
        break;
      case "genre":
        searchResults = this.books.filter(
          (book) => book.genre.toLowerCase().includes(query.toLowerCase())
        );
        break;
      case "year":
        searchResults = this.books.filter(
          (book) => book.year.toString().includes(query)
        );
        break;
      default:
        searchResults = [];
        break;
    }
    return searchResults;
  }

  borrowBook(title) {
    const book = this.removeBook(title);
    if (book) {
      this.borrowedBooks.push(book);
    }
    return book;
  }

  returnBook(title) {
    const book = this.removeBook(title);
    if (book) {
      this.returnedBooks.push(book);
    }
    return book;
  }

  getStatistics() {
    const totalBooks = this.books.length;
    const totalBorrowedBooks = this.borrowedBooks.length;
    const totalReturnedBooks = this.returnedBooks.length;
    return {
      totalBooks,
      totalBorrowedBooks,
      totalReturnedBooks,
    };
  }

  generateReport() {
    let report = "Library Report:\n\n";
    const { totalBooks, totalBorrowedBooks, totalReturnedBooks } =
      this.getStatistics();
    report += `Total Books: ${totalBooks}\n`;
    report += `Total Borrowed Books: ${totalBorrowedBooks}\n`;
    report += `Total Returned Books: ${totalReturnedBooks}\n\n`;

    report += "Books in Library:\n";
    this.books.forEach((book) => {
      report += `Title: ${book.title}\n`;
      report += `Author: ${book.author}\n`;
      report += `Genre: ${book.genre}\n`;
      report += `Year: ${book.year}\n\n`;
    });

    report += "Borrowed Books:\n";
    this.borrowedBooks.forEach((book) => {
      report += `Title: ${book.title}\n`;
      report += `Author: ${book.author}\n`;
      report += `Genre: ${book.genre}\n`;
      report += `Year: ${book.year}\n\n`;
    });

    report += "Returned Books:\n";
    this.returnedBooks.forEach((book) => {
      report += `Title: ${book.title}\n`;
      report += `Author: ${book.author}\n`;
      report += `Genre: ${book.genre}\n`;
      report += `Year: ${book.year}\n\n`;
    });

    return report;
  }
}

// Usage Example
const library = new Library();

// Adding books
library.addBook("The Great Gatsby", "F. Scott Fitzgerald", "Fiction", 1925);
library.addBook("To Kill a Mockingbird", "Harper Lee", "Fiction", 1960);
library.addBook("1984", "George Orwell", "Fiction", 1949);

// Searching books
const searchResults = library.searchBooks("fiction", "genre");
console.log("Search Results:", searchResults);

// Borrowing and returning books
library.borrowBook("To Kill a Mockingbird");
library.returnBook("To Kill a Mockingbird");

// Generating report
const report = library.generateReport();
console.log("Library Report:\n", report);
```

Note: This is just one example of how a complex code can look. You can modify and expand upon it to meet your requirements.