package com.example.server.services;

import com.example.server.models.Activity;
import com.example.server.models.Ngo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ActivityService {
    public List<Activity> getActivities(Ngo ngo);
    public Activity addActivity(Activity activity);
    public Activity updateActivity(Activity activity);

    public void deleteActivity(Long id);
    public Optional<Activity> getActivity(Long id);



}
