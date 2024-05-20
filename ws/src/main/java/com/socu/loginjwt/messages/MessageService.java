package com.socu.loginjwt.messages;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public void sendMessage(Long senderId, Long receiverId, String content) {

        if (senderId == null || receiverId == null) {
            throw new IllegalArgumentException("Sender or receiver not found");
        }

        Messages message = new Messages();
        message.setSender(senderId);
        message.setReceiver(receiverId);
        message.setContent(content);
        messageRepository.save(message);
    }

    public List<Messages> getMessagesByUser(Long sender) {
        return messageRepository.findBySenderOrReceiver(sender, sender);

    }
}
