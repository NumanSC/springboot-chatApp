// package com.socu.loginjwt.messages;

// import java.io.IOException;
// import java.util.Collections;
// import java.util.HashMap;
// import java.util.HashSet;
// import java.util.Map;
// import java.util.Set;

// import com.fasterxml.jackson.core.JsonProcessingException;
// import com.fasterxml.jackson.databind.ObjectMapper;

// import jakarta.websocket.OnClose;
// import jakarta.websocket.OnMessage;
// import jakarta.websocket.OnOpen;
// import jakarta.websocket.Session;
// import jakarta.websocket.server.ServerEndpoint;

// @ServerEndpoint(value = "/messages")
// public class MessagesWebSocketServer {

// private static final Set<Session> sessions = Collections.synchronizedSet(new
// HashSet<>());
// private static final Map<Long, Session> userSessions =
// Collections.synchronizedMap(new HashMap<>());

// @OnOpen
// public void onOpen(Session session) {
// sessions.add(session);
// System.out.println("New session opened: " + session.getId());
// }

// @OnMessage
// public void onMessage(String message, Session session) throws IOException {
// ObjectMapper objectMapper = new ObjectMapper();
// try {
// Messages receivedMessage = objectMapper.readValue(message, Messages.class);
// Long receiverId = receivedMessage.getReceiver();
// Session receiverSession = userSessions.get(receiverId);
// if (receiverSession != null && receiverSession.isOpen()) {
// receiverSession.getBasicRemote().sendText(message);
// } else {
// // Handle case when receiver session is not available or closed
// System.out.println("Receiver is not available");
// }
// } catch (JsonProcessingException e) {
// e.printStackTrace();
// }
// }

// @OnClose
// public void onClose(Session session) {
// sessions.remove(session);
// System.out.println("Session closed: " + session.getId());
// }

// public static void addUserSession(Long userId, Session session) {
// userSessions.put(userId, session);
// }

// public static void removeUserSession(Long userId) {
// userSessions.remove(userId);
// }
// }
