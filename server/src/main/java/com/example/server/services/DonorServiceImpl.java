package com.example.server.services;

import com.example.server.dao.DonorDao;
import com.example.server.models.Donor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonorServiceImpl implements DonorService {

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
}
