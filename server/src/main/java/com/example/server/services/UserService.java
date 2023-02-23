package com.example.server.services;

import com.example.server.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    public List<User> getUsers();

    public User addUser(User user);
    public Optional<User> getUser(Long id);

    public User getUserByToken();

}
