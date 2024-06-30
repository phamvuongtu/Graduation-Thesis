package com.example.oce_backend.repository;

import com.example.oce_backend.model.SharedCode;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface SharedCodeRepository extends MongoRepository<SharedCode, String> {
    Optional<SharedCode> findByUniqueId(String uniqueId);
}