package com.example.server.services;

import com.example.server.dao.ActivityDao;
import com.example.server.models.Activity;
import com.example.server.models.Ngo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class ImplActivityService implements  ActivityService{

    @Autowired
    private ActivityDao activityDao;


    @Override
    public List<Activity> getActivities(Ngo ngo) {
        return activityDao.findByNgo(ngo);

    }

    @Override
    public Activity addActivity(Activity activity) {
        activityDao.save(activity);
        return activity;
    }

    @Override
    public Activity updateActivity(Activity activity) {

        activityDao.save(activity);
        return activity;
    }

    @Override
    public void deleteActivity(Long id) {
        Activity act = activityDao.getReferenceById(id);
        activityDao.delete(act);
    }

    @Override
    public Optional<Activity> getActivity(Long id) {
        return activityDao.findById(id);
    }
}