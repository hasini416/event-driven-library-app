package com.example.library_api.event;

import com.example.library_api.RabbitConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class EventPublisher {

    private final RabbitTemplate rabbitTemplate;

    public EventPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishBookCreatedEvent(BookCreatedEvent event) {
        // "library.book.created" is the routing key (like a tag)
        rabbitTemplate.convertAndSend(RabbitConfig.EXCHANGE_NAME, "library.book.created", event);
        System.out.println(" [x] Event Published: " + event.getTitle());
    }
}