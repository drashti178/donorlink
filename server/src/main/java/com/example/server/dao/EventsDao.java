package com.example.server.dao;

import com.example.server.models.Claims;
import com.example.server.models.Donor;
import com.example.server.models.Events;
import com.example.server.models.Ngo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventsDao extends JpaRepository<Events,Long> {
    public List<Events> findAllByNgo(Ngo ngo);

    public List<Events> findAll();
}
