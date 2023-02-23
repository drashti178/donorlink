package com.example.server.services;

import com.example.server.models.Activity;
import com.example.server.models.Ngo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface NgoService {
    public Ngo addNgo(Ngo ngo);
    public Ngo getNgo(Long id);
    public String uploadImage(String path, MultipartFile file) throws IOException;
}
