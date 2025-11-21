package com.example.claimapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "*") // VERY IMPORTANT: Allows React to access this backend
public class ClaimController {

    @Autowired
    private ClaimRepository claimRepository;

    // 1. Get all claims
    @GetMapping
    public List<Claim> getAllClaims() {
        return claimRepository.findAll();
    }

    // 2. Submit a new claim
    @PostMapping
    public Claim createClaim(@RequestBody Claim claim) {
        return claimRepository.save(claim);
    }
}