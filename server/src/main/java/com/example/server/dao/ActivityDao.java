package com.example.server.dao;

import com.example.server.models.Activity;
import com.example.server.models.Ngo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ActivityDao extends JpaRepository<Activity,Long > {
    public Activity findByActivityname(String activityname);

    public List<Activity> findByNgo(Ngo ngo);


}
