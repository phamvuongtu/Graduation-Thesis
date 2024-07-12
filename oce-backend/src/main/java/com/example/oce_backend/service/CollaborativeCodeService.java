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
public class CollaborativeCodeService {

    @Autowired
    private SharedCodeRepository sharedCodeRepository;
    private static final Logger logger = Logger.getLogger(CollaborativeCodeService.class.getName());


    public SharedCode generateCollaborateLink(String code, int expiryHours, String language) {
        SharedCode sharedCode = new SharedCode();
        sharedCode.setCode(code);
        sharedCode.setUniqueId(UUID.randomUUID().toString());
        sharedCode.setExpirationTime(LocalDateTime.now().plusHours(expiryHours)); // Set expiration time based on user input
        sharedCode.setLanguage(language); // Set ngôn ngữ
        sharedCode.setEditable(true); // Set editable to true
//        sharedCode.setActiveUsers(0); // Initialize active users to 0

        sharedCode = sharedCodeRepository.save(sharedCode);
        logger.info("Saved collaborative code with uniqueId: " + sharedCode.getUniqueId()); // Log when data is saved to the database
        return sharedCode;
    }

    public Optional<SharedCode> getCollaborateLink(String uniqueId) {
        Optional<SharedCode> sharedCode = sharedCodeRepository.findByUniqueId(uniqueId);
        if (sharedCode.isPresent() && !sharedCode.get().isExpired()) {
            logger.info("Found collaborative code with uniqueId: " + uniqueId);
            return sharedCode;
        }
        logger.warning("Collaborative code not found or expired for uniqueId: " + uniqueId);
        return Optional.empty();
    }

    public void updateCode(String uniqueId, String newCode) {
        Optional<SharedCode> optionalSharedCode = sharedCodeRepository.findByUniqueId(uniqueId);
        if (optionalSharedCode.isPresent()) {
            SharedCode sharedCode = optionalSharedCode.get();
            sharedCode.setCode(newCode);
            sharedCodeRepository.save(sharedCode);
            logger.info("Updated collaborative code with uniqueId: " + uniqueId);
        }
    }

//    public void updateActiveUsers(String uniqueId, int activeUsers) {
//        Optional<SharedCode> optionalSharedCode = sharedCodeRepository.findByUniqueId(uniqueId);
//        if (optionalSharedCode.isPresent()) {
//            SharedCode sharedCode = optionalSharedCode.get();
//            sharedCode.setActiveUsers(activeUsers);
//            sharedCodeRepository.save(sharedCode);
//            logger.info("Updated active users for collaborative code with uniqueId: " + uniqueId);
//        }
//    }

    @Scheduled(fixedRate = 3600000) // Run every hour (3600000 milliseconds = 1 hour)
    public void cleanUpExpiredCodes() {
        LocalDateTime now = LocalDateTime.now();
        logger.info("Running cleanUpExpiredCodes at: " + now);
        long deletedCount = sharedCodeRepository.deleteByExpirationTimeLessThan(now);
        logger.info("Deleted " + deletedCount + " expired codes.");
    }
}
