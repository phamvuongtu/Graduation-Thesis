package com.example.oce_backend.controller;

import com.example.oce_backend.model.SharedCode;
import com.example.oce_backend.service.SharedCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ShareController {

    @Autowired
    private SharedCodeService sharedCodeService;
    private static final String FRONTEND_URL = "https://online-code-editor-frontend-five.vercel.app";

    @PostMapping("/generate-share-link")
    public ResponseEntity<Map<String, String>> generateShareLink(@RequestBody Map<String, String> payload) {
        String code = payload.get("code");
        SharedCode sharedCode = sharedCodeService.generateShareLink(code);
        Map<String, String> response = new HashMap<>();
        response.put("link", FRONTEND_URL + "share/" + sharedCode.getUniqueId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get-shared-code/{id}")
    public ResponseEntity<Map<String, String>> getSharedCode(@PathVariable String id) {
        return sharedCodeService.getSharedCode(id)
                .map(sharedCode -> {
                    Map<String, String> response = new HashMap<>();
                    response.put("code", sharedCode.getCode());
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> ResponseEntity.status(404).body(null));
    }
}