package com.example.server.services;

import com.example.server.models.Claims;
import com.example.server.models.Donation;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface ClaimService {

    public Claims findByDonation(Donation donation);

    public String uploadImage(String path, MultipartFile file) throws IOException;
}
