package com.example.library_api.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookCreatedEvent implements Serializable {
    private Long bookId;
    private String title;
    private String author;
}