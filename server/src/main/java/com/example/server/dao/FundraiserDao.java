package com.example.server.dao;

import com.example.server.models.Fundraiser;
import com.example.server.models.Ngo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FundraiserDao extends JpaRepository<Fundraiser,Long> {
    public List<Fundraiser> findByNgo(Ngo ngo);
    public List<Fundraiser> findByStatus(String st);

}
