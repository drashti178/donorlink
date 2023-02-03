package com.example.server.dao;

import com.example.server.models.Ngo;
import com.example.server.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDao extends JpaRepository<User,Long> {

    public Optional<User> findByusername(String username);
    public User findByEmail(String email);

    public Boolean existsByusername(String username);
    public Boolean existsByEmail(String email);
}
