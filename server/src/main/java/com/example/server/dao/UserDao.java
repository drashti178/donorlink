package com.example.server.dao;

import com.example.server.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDao extends JpaRepository<User,Long> {

    public User findByUsername(String username);
    public User findByEmail(String email);

    public Boolean existsByUsername(String username);
    public Boolean existsByEmail(String email);
}
