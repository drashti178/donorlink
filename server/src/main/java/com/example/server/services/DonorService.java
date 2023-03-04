package com.example.server.services;

import com.example.server.models.Donor;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DonorService {
    public List<Donor> getDonors();

    public Donor addDonor(Donor donor);
    public Donor getDonor(Long id);
    public String uploadImage(String path, MultipartFile file) throws IOException;

}
