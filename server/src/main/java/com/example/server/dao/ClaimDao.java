package com.example.server.dao;

import com.example.server.models.Claims;
import com.example.server.models.Donation;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ClaimDao  extends JpaRepository<Claims,Long> {
    public Claims findByDonation(Donation donation);
}
