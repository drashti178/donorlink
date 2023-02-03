package com.example.server.services;

import com.example.server.dao.UserDao;
import com.example.server.models.Ngo;
import com.example.server.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
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
    public User getUser(Long id) {
        User user = new User();
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
