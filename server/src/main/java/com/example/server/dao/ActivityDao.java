package com.example.server.dao;

import com.example.server.models.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ActivityDao extends JpaRepository<Activity,Long > {

}
