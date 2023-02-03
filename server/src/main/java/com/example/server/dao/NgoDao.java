package com.example.server.dao;

import com.example.server.models.Ngo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NgoDao extends JpaRepository<Ngo,Long> {

    public Optional<Ngo> findByNgoname(String ngoname);
    public Ngo findByEmail(String email);

    public Boolean existsByNgoname(String ngoname);
    public Boolean existsByEmail(String email);
}
