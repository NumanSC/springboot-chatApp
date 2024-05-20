package com.socu.loginjwt.messages;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.socu.loginjwt.domain.user.UserService;

import lombok.RequiredArgsConstructor;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/messages")
public class MessagesController {

    private final MessageService messageService;

    @Autowired
    private UserService userService;

    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody Messages message) {

        Long senderId = message.getSender();
        Long receiverId = message.getReceiver();
        String content = message.getContent();

        System.out.println(userService.findById(senderId).getId());

        if (senderId == userService.findById(senderId).getId()
                && receiverId == userService.findById(receiverId).getId()) {
            System.out.println("Sender and receiver found");
        }

        if (senderId == null || receiverId == null || content == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid message");
        }

        messageService.sendMessage(senderId, receiverId, content);

        return ResponseEntity.ok("Message sent successfully");
    }

    @GetMapping("/{sender}")
    public ResponseEntity<List<Messages>> getUserMessages(@PathVariable Long sender) {

        System.out.println("giris");
        List<Messages> userMessages = messageService.getMessagesByUser(sender);

        System.out.println("Messages for user: " + userMessages);

        return ResponseEntity.ok(userMessages);
    }

}
