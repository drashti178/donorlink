package com.example.server.services;

import com.example.server.dao.UserDao;
import com.example.server.models.Ngo;
import com.example.server.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@Service
@CrossOrigin("*")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public List<User> getUsers() {
        List<User> users;
        try{
            users = (List<User>)userDao.findAll();
        }
        catch (Exception e)
        {
            throw e;
        }
        return users;
    }

    @Override
    public User addUser(User user) {
        try{
            userDao.save(user);
        }
        catch(Exception e){
            throw e;
        }
        return user;
    }

    @Override
    public Optional<User> getUser(Long id) {

        Optional<User> user = null;
        try{
            user = userDao.findById(id);
        }
        catch (Exception e)
        {
            throw e;
        }
        return user;
    }

    @Override
    public User getUserByToken() {
        return null;
    }



}
