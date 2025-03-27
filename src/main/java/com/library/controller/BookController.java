package com.library.controller;

import com.library.entity.Book;
import com.library.repository.BookRepository;
import com.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5500")
@RestController
@RequestMapping("/books")
public class BookController {
    @Autowired
    private BookService bookService;


    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @Autowired
    private BookRepository bookRepository;

    // API for searching books by ID or Title
    @GetMapping("/search")
    public ResponseEntity<?> searchBooks(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String title) {

        // For searching by ID 
        if (id != null) {
            Optional<Book> book = bookRepository.findById(id);
            if (book.isPresent()) {
                return ResponseEntity.ok(book.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("message", "No book found with ID: " + id));
            }
        }

        // For searching by Title
        if (title != null && !title.isEmpty()) {
            List<Book> books = bookRepository.findByTitleContainingIgnoreCase(title);
            if (!books.isEmpty()) {
                return ResponseEntity.ok(books);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Collections.singletonMap("message", "No book found with title: " + title));
            }
        }

        return ResponseEntity.badRequest()
                .body(Collections.singletonMap("message", "Provide either an ID or Title to search."));
    }

    // API for adding a new book
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    //API for updating a book
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {
        return bookService.updateBook(id, book);
    }

    //API for deleting a book
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
    }
}

