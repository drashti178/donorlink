package com.example.server.services;

import com.example.server.models.User;

import java.util.List;

public interface UserService {
    public List<User> getUsers();

    public User addUser(User user);
    public User getUser(Long id);
}
