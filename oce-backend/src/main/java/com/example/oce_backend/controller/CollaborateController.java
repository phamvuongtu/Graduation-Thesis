package com.example.oce_backend.controller;

import com.example.oce_backend.model.SharedCode;
import com.example.oce_backend.service.CollaborativeCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
public class CollaborateController {

    @Autowired
    private CollaborativeCodeService collaborativeCodeService;

    private static final Logger logger = Logger.getLogger(CollaborateController.class.getName());

    @PostMapping("/generate-collaborate-link")
    public ResponseEntity<Map<String, String>> generateCollaborateLink(@RequestBody Map<String, Object> payload) {
        String code = (String) payload.get("code");
        int expiryHours;
        String language = (String) payload.get("language");

        try {
            expiryHours = Integer.parseInt(payload.get("expiryHours").toString());
        } catch (NumberFormatException e) {
            logger.warning("Invalid expiryHours value: " + payload.get("expiryHours"));
            return ResponseEntity.badRequest().body(null);
        }

        logger.info("Received request to generate collaborate link for code: " + code);
        SharedCode sharedCode = collaborativeCodeService.generateCollaborateLink(code, expiryHours, language);
        logger.info("Generated collaborate link with uniqueId: " + sharedCode.getUniqueId());

        Map<String, String> response = new HashMap<>();
        response.put("link", "http://localhost:3000/collaborate/" + sharedCode.getUniqueId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get-collaborate-link/{id}")
    public ResponseEntity<Map<String, String>> getCollaborateLink(@PathVariable String id) {
        logger.info("Received request to get collaborate link with uniqueId: " + id);
        Optional<SharedCode> sharedCode = collaborativeCodeService.getCollaborateLink(id);

        return sharedCode.map(code -> {
            Map<String, String> response = new HashMap<>();
            response.put("code", code.getCode());
            response.put("language", code.getLanguage());
            logger.info("Found collaborate link for uniqueId: " + id);
            return ResponseEntity.ok(response);
        }).orElseGet(() -> {
            logger.warning("Collaborate link not found for uniqueId: " + id);
            return ResponseEntity.status(404).body(null);
        });
    }

    @MessageMapping("/collaborate/{id}")
    @SendTo("/topic/collaborate/{id}")
    public Message send(@DestinationVariable String id, Message message) throws Exception {
        return message;
    }
}
