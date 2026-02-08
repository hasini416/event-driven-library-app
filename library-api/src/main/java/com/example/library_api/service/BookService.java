package com.example.library_api.service;

import com.example.library_api.event.BookCreatedEvent;
import com.example.library_api.event.EventPublisher;
import com.example.library_api.model.Book;
import com.example.library_api.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final EventPublisher eventPublisher;

    public List<Book> getAllBooks() {

        return bookRepository.findAll();

    }

    public Book saveBook(Book book) {

        Book savedBook = bookRepository.save(book);

        // 2. Create the Event object
        BookCreatedEvent event = new BookCreatedEvent(
                savedBook.getId(),
                savedBook.getTitle(),
                savedBook.getAuthor()
        );

        // 3. Publish the Event (Fire and Forget)
        eventPublisher.publishBookCreatedEvent(event);

        // 4. Return immediately
        return savedBook;
    }

    public Book findBookByID(Long id) {
        return bookRepository.getReferenceById(id);
    }

    public void deleteBookById(Long id) {
        bookRepository.deleteById(id);
    }

    public Book updateBook(Long id, Book bookDetails) {
        // 1. Check if the book exists
        return bookRepository.findById(id).map(existingBook -> {
            // 2. Update the fields
            existingBook.setTitle(bookDetails.getTitle());
            existingBook.setAuthor(bookDetails.getAuthor());
            existingBook.setAvailable(bookDetails.isAvailable());

            // 3. Save the updated record
            return bookRepository.save(existingBook);
        }).orElseThrow(() -> new RuntimeException("Book not found with id " + id));
    }
}
