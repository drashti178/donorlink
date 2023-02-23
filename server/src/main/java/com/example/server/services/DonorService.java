package com.example.server.services;

import com.example.server.models.Donor;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DonorService {
    public List<Donor> getUsers();

    public Donor addUser(Donor user);
    public Donor getUser(Long id);
    public String uploadImage(String path, MultipartFile file) throws IOException;

}
