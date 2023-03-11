package com.example.server.services;

import com.example.server.dao.DonorDao;
import com.example.server.models.Donor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    private PasswordEncoder passwordEncoder;
    @Autowired
    private DonorDao userDao;

    @Override
    public List<Donor> getUsers() {
        List<Donor> users;
        try{
            users = (List<Donor>)userDao.findAll();
        }
        catch (Exception e)
        {
            throw e;
        }
        return users;
    }

    @Override
    public Donor addUser(Donor user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        try{
            userDao.save(user);
        }
        catch(Exception e){
            throw e;
        }
        return user;
    }

    @Override
    public Donor getUser(Long id) {
        Donor user = new Donor();
        try{
            user = userDao.getReferenceById(id);
        }
        catch (Exception e)
        {
            throw e;
        }
        return user;
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
