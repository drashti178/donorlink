package com.example.server.services;

import com.example.server.dao.ClaimDao;
import com.example.server.models.Claims;
import com.example.server.models.Donation;
import com.lowagie.text.*;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
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
    public String uploadCerti(String path, ByteArrayInputStream inputStream) throws IOException {

            // Create the output directory if it doesn't exist
            File folder = new File(path);
            if (!folder.exists()) {
                folder.mkdirs();
            }
            String randomID= UUID.randomUUID().toString();
            String fileName=randomID.concat(".pdf");

            // Create the output file and write the input stream to it
            File outputFile = new File(folder, fileName);
            try (FileOutputStream outputStream = new FileOutputStream(outputFile)) {
                IOUtils.copy(inputStream, outputStream);
            }

            // Handle the response as appropriate for your application
            if (outputFile.exists()) {
                // Successful upload
                System.out.println("File uploaded successfully to folder " + path + "!");
            } else {
                // Error uploading file
                System.err.println("Error uploading file to folder " + path + "!");
            }

        //        String name = file.getOriginalFilename();
////        String filePath = path+ File.separator+name;
//        String randomID= UUID.randomUUID().toString();
//        String fileName=randomID.concat(name.substring(name.lastIndexOf(".")));
//        String filePath = path+ File.separator+fileName;
//        File f=new File(path);
//        if(!f.exists())
//        {
//            f.mkdir();
//        }
//        Files.copy(file.getInputStream(), Paths.get(filePath));
//
//
        return fileName;
    }

    @Override
    public void issueCertificate(long id) {

    }

}
