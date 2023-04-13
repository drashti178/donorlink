package com.example.server.dao;

import com.example.server.models.Collaborations;
import com.example.server.models.Ngo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CollaborationDao extends JpaRepository<Collaborations,Long> {
    public List<Collaborations> findAllByisApprovedTrue();
}
