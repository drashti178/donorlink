package com.example.server.dao;

import com.example.server.models.Ngo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NgoDao extends JpaRepository<Ngo,Long> {
    public Boolean existsByNgoname(String ngoname);

    public Boolean existsByEmail(String email);

    public Boolean existsAllByEmail(String email);

    public Ngo findByEmail(String email);

    public Ngo findFirstByEmailOrderByNgoname(String email);

    public Ngo findByNgoname(String ngoname);

    public List<Ngo> findByAreaofwork(String areaofwork);
}
