package com.example.library_consumer.listener;

import com.example.library_consumer.event.BookCreatedEvent;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationListener {

    // This creates a temporary queue and binds it to the exchange automatically
    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(value = "notification_queue", durable = "true"),
            exchange = @Exchange(value = "library-exchange", type = "topic"),
            key = "library.book.created"
    ))
    public void handleBookCreated(BookCreatedEvent event) {
        System.out.println(" [!] New Book Notification: '" + event.getTitle() + "' has arrived!");
        // Here you would add code to send an email
    }
}
