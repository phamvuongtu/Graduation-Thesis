package com.example.oce_backend.handler;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Logger;

@Component
public class CodeEditorHandler extends TextWebSocketHandler {

    private static final Logger logger = Logger.getLogger(CodeEditorHandler.class.getName());
    private static final ConcurrentHashMap<String, Set<WebSocketSession>> rooms = new ConcurrentHashMap<>();
    private static final ConcurrentHashMap<String, String> currentCode = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String roomId = getRoomId(session);
        rooms.computeIfAbsent(roomId, k -> ConcurrentHashMap.newKeySet()).add(session);
        logger.info("User connected to room: " + roomId);
        session.sendMessage(new TextMessage("Connected to room: " + roomId));

        // Gửi mã code hiện tại đến tab mới
        if (currentCode.containsKey(roomId)) {
            session.sendMessage(new TextMessage(currentCode.get(roomId)));
        }

        broadcastUserCount(roomId);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String roomId = getRoomId(session);
        String newCode = message.getPayload();

        logger.info("Received message in room " + roomId + ": " + newCode);

        currentCode.put(roomId, newCode);

        for (WebSocketSession s : rooms.get(roomId)) {
            if (s.isOpen() && !s.getId().equals(session.getId())) {
                s.sendMessage(new TextMessage(newCode));
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        String roomId = getRoomId(session);
        Set<WebSocketSession> sessions = rooms.get(roomId);
        if (sessions != null) {
            sessions.remove(session);
            if (sessions.isEmpty()) {
                rooms.remove(roomId);
                currentCode.remove(roomId);
            } else {
                broadcastUserCount(roomId);
            }
        }
        logger.info("User disconnected from room: " + roomId);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        logger.warning("Transport error: " + exception.getMessage());
    }

    private void broadcastUserCount(String roomId) {
        Set<WebSocketSession> sessions = rooms.get(roomId);
        if (sessions != null) {
            int userCount = sessions.size();
            String message = "users:" + userCount;
            for (WebSocketSession session : sessions) {
                if (session.isOpen()) {
                    try {
                        session.sendMessage(new TextMessage(message));
                    } catch (Exception e) {
                        logger.warning("Error broadcasting user count: " + e.getMessage());
                    }
                }
            }
        }
    }

    private String getRoomId(WebSocketSession session) {
        return session.getUri().getPath().split("/")[2];
    }
}
