package com.example.server.services;

import com.example.server.dao.DonorDao;
import com.example.server.models.Donor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class DonorServiceImpl implements DonorService {

    @Autowired
    private DonorDao donorDao;

    @Override
    public List<Donor> getDonors() {
        List<Donor> donors;
        try{
            donors = (List<Donor>)donorDao.findAll();
        }
        catch (Exception e)
        {
            throw e;
        }
        return donors;
    }

    @Override
    public Donor addDonor(Donor donor) {
        try{
            donorDao.save(donor);
        }
        catch(Exception e){
            throw e;
        }
        return donor;
    }

    @Override
    public Donor getDonor(Long id) {
        Donor donor = new Donor();
        try{
            donor = donorDao.getReferenceById(id);
        }
        catch (Exception e)
        {
            throw e;
        }
        return donor;
    }
    @Override
    public String uploadImage(String path, MultipartFile file) throws IOException {
        String name=file.getOriginalFilename();
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
