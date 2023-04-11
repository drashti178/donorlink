package com.example.server.services;

import com.example.server.models.Claims;
import com.example.server.models.Donation;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Optional;

public interface ClaimService {

    public Claims findByDonation(Donation donation);

    public String uploadCerti(String path, ByteArrayInputStream inputStream) throws IOException;
    public void issueCertificate(long id);
}
