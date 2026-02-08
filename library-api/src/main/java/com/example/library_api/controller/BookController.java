package com.example.library_api.controller;

import com.example.library_api.model.Book;
import com.example.library_api.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BookController {

    private final BookService bookService;

    @GetMapping
    public List<Book> findAll(){
        return bookService.getAllBooks();
    }

    @PostMapping
    public Book save(@RequestBody Book book){
        return bookService.saveBook(book);
    }

    @GetMapping("/{id}")
    public Book findOne(@PathVariable Long id){
        return bookService.findBookByID(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        bookService.deleteBookById(id);
    }

    @PutMapping("/{id}")
    public Book update(@PathVariable Long id, @RequestBody Book book){
        return bookService.updateBook(id,book);
    }

}
