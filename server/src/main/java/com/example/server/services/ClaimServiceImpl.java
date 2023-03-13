package com.example.server.services;

import com.example.server.dao.ClaimDao;
import com.example.server.models.Claims;
import com.example.server.models.Donation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;



@Service
public class ClaimServiceImpl implements  ClaimService{

    @Autowired
    private ClaimDao claimDao;

    @Override
    public Claims findByDonation(Donation donation) {
        return claimDao.findByDonation(donation);
    }

    @Override
    public String uploadImage(String path, MultipartFile file) throws IOException {
        String name = file.getOriginalFilename();
//        String filePath = path+ File.separator+name;
        String randomID= UUID.randomUUID().toString();
        String fileName=randomID.concat(name.substring(name.lastIndexOf(".")));
        String filePath = path+ File.separator+fileName;
        File f=new File(path);
        if(!f.exists())
        {
            f.mkdir();
        }
        Files.copy(file.getInputStream(), Paths.get(filePath));


        return fileName;
    }
}