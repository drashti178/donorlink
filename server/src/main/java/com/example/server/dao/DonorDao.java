package com.example.server.dao;

import com.example.server.models.Donor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DonorDao extends JpaRepository<Donor,Long> {

    public Donor findByusername(String username);
    public Donor findByEmail(String email);

    public Boolean existsByusername(String username);
    public Boolean existsByEmail(String email);

//    public List<Donor> findAllOrderByTotaldonation();

}
