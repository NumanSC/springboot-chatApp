// package com.socu.loginjwt.messages;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.messaging.handler.annotation.DestinationVariable;
// import org.springframework.messaging.handler.annotation.MessageMapping;
// import org.springframework.messaging.handler.annotation.Payload;
// import org.springframework.messaging.simp.SimpMessagingTemplate;
// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.CrossOrigin;

// @Controller
// @CrossOrigin
// public class WebSocketController {

// @Autowired
// private SimpMessagingTemplate messagingTemplate;

// @MessageMapping("/chat/{receiverId}")
// public void chatEndpoint(@DestinationVariable String receiverId, @Payload
// Messages wsMessage) {
// System.out.println("Sender: " + wsMessage.getSender() + ", Receiver: " +
// receiverId + ", Content: "
// + wsMessage.getContent());
// messagingTemplate.convertAndSendToUser(receiverId, "/topic/messages",
// wsMessage);
// }
// }
