package com.example.oce_backend.service;

import com.example.oce_backend.model.SharedCode;
import com.example.oce_backend.repository.SharedCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import java.util.logging.Logger;

@Service
public class SharedCodeService {

    @Autowired
    private SharedCodeRepository sharedCodeRepository;
    private static final Logger logger = Logger.getLogger(SharedCodeService.class.getName());

    public SharedCode generateShareLink(String code, int expiryHours, String language) {
        SharedCode sharedCode = new SharedCode();
        sharedCode.setCode(code);
        sharedCode.setUniqueId(UUID.randomUUID().toString());
        sharedCode.setExpirationTime(LocalDateTime.now().plusHours(expiryHours)); // Set expiration time based on user input
        sharedCode.setLanguage(language); // Set ngôn ngữ
        sharedCode.setEditable(false); // Set editable to true
        sharedCode.setActiveUsers(0); // Initialize active users to 0

        sharedCode = sharedCodeRepository.save(sharedCode);
        logger.info("Saved shared code with uniqueId: " + sharedCode.getUniqueId()); // Log khi lưu dữ liệu vào cơ sở dữ liệu
        return sharedCode;
    }

    public Optional<SharedCode> getSharedCode(String uniqueId) {
        Optional<SharedCode> sharedCode = sharedCodeRepository.findByUniqueId(uniqueId);
        if (sharedCode.isPresent() && !sharedCode.get().isExpired()) {
            logger.info("Found shared code with uniqueId: " + uniqueId); // Log khi tìm thấy dữ liệu
            return sharedCode;
        }
        logger.warning("Shared code not found or expired for uniqueId: " + uniqueId); // Log khi không tìm thấy hoặc đã hết hạn
        return Optional.empty();
    }

    @Scheduled(fixedRate = 3600000) //10000
    // Run every hour (3600000 milliseconds = 1 hour)
    public void cleanUpExpiredCodes() {
        LocalDateTime now = LocalDateTime.now();
        logger.info("Running cleanUpExpiredCodes at: " + now);
        long deletedCount = sharedCodeRepository.deleteByExpirationTimeLessThan(now);
        logger.info("Deleted " + deletedCount + " expired codes.");
    }
}
