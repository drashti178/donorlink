package com.example.server.services;

import com.example.server.dao.ActivityDao;
import com.example.server.dao.NgoDao;
import com.example.server.models.Activity;
import com.example.server.models.Ngo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;


@Service
public class NgoServiceImpl implements  NgoService{
    private PasswordEncoder passwordEncoder;
    @Autowired
    public NgoServiceImpl(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
    @Autowired
    private NgoDao ngoDao;
    @Override
    public Ngo addNgo(Ngo ngo) {

        ngo.setPassword(passwordEncoder.encode(ngo.getPassword()));
        try{
            ngoDao.save(ngo);
        }
        catch (Exception e)
        {
            throw e;
        }

        return ngo;
    }

    @Override
    public Ngo getNgo(Long id) {
        Ngo ngo = new Ngo();
        try {
            ngo = ngoDao.getReferenceById(id);
        }
        catch (Exception e)
        {
            throw e;
        }
        return ngo;
    }
    @Override
    public List<Ngo> getNgos() {

      return ngoDao.findAll();
    }

    @Override
    public List<Ngo> getNgosbywork(String work) {

        return ngoDao.findByAreaofwork(work);
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