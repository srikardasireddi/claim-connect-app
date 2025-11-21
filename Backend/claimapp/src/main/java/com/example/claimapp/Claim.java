package com.example.claimapp;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data // Lombok generates Getters, Setters, and toString automatically
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String claimantName;
    private String policyNumber;
    private String diagnosis;
    private Double amount;
    
    private String status = "PENDING"; // Default status
}