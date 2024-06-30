package com.example.oce_backend.service;

import com.example.oce_backend.model.SharedCode;
import com.example.oce_backend.repository.SharedCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class SharedCodeService {

    @Autowired
    private SharedCodeRepository sharedCodeRepository;

    public SharedCode generateShareLink(String code) {
        SharedCode sharedCode = new SharedCode();
        sharedCode.setCode(code);
        sharedCode.setUniqueId(UUID.randomUUID().toString());
        sharedCode.setExpirationTime(LocalDateTime.now().plusHours(1)); // Set expiration time to 1 hour

        return sharedCodeRepository.save(sharedCode);
    }

    public Optional<SharedCode> getSharedCode(String uniqueId) {
        Optional<SharedCode> sharedCode = sharedCodeRepository.findByUniqueId(uniqueId);
        if (sharedCode.isPresent() && !sharedCode.get().isExpired()) {
            return sharedCode;
        }
        return Optional.empty();
    }
}