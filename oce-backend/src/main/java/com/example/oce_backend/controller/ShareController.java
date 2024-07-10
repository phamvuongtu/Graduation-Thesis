package com.example.oce_backend.controller;

import com.example.oce_backend.model.SharedCode;
import com.example.oce_backend.service.SharedCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api")
public class ShareController {

    @Autowired
    private SharedCodeService sharedCodeService;

    private static final Logger logger = Logger.getLogger(ShareController.class.getName());

    @PostMapping("/generate-share-link")
    public ResponseEntity<Map<String, String>> generateShareLink(@RequestBody Map<String, Object> payload) {
        String code = (String) payload.get("code");
        int expiryHours;
        String language = (String) payload.get("language"); // Nhận thông tin về ngôn ngữ

        try {
            expiryHours = Integer.parseInt(payload.get("expiryHours").toString());
        } catch (NumberFormatException e) {
            logger.warning("Invalid expiryHours value: " + payload.get("expiryHours"));
            return ResponseEntity.badRequest().body(null);
        }

        logger.info("Received request to generate share link for code: " + code); // Log khi nhận được yêu cầu API
        SharedCode sharedCode = sharedCodeService.generateShareLink(code, expiryHours, language); // Gọi phương thức với 3 tham số
        logger.info("Generated share link with uniqueId: " + sharedCode.getUniqueId()); // Log khi lưu dữ liệu vào cơ sở dữ liệu

        Map<String, String> response = new HashMap<>();
        response.put("link", "http://localhost:3000/share/" + sharedCode.getUniqueId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get-shared-code/{id}")
    public ResponseEntity<Map<String, Object>> getSharedCode(@PathVariable String id) {
        logger.info("Received request to get shared code with uniqueId: " + id); // Log khi nhận được yêu cầu API
        return sharedCodeService.getSharedCode(id)
                .map(sharedCode -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("code", sharedCode.getCode());
                    response.put("language", sharedCode.getLanguage()); // Trả về ngôn ngữ
                    response.put("editable", sharedCode.isEditable());
                    logger.info("Found shared code for uniqueId: " + id); // Log khi tìm thấy dữ liệu
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> {
                    logger.warning("Shared code not found for uniqueId: " + id); // Log khi không tìm thấy dữ liệu
                    return ResponseEntity.status(404).body(null);
                });
    }
}
