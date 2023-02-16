package com.example.server.services;

import com.example.server.dao.ActivityDao;
import com.example.server.dao.NgoDao;
import com.example.server.models.Activity;
import com.example.server.models.Ngo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;


@Service
public class NgoServiceImpl implements  NgoService{
   @Autowired
    private NgoDao ngoDao;

   @Autowired
   private ActivityDao activityDao;
    @Override
    @CrossOrigin(origins = "http://localhost:3000")
    public List<Ngo> getNgos() {
        List<Ngo> ngos;
        try{
            ngos = (List<Ngo>)ngoDao.findAll();
        }
        catch (Exception e)
        {
            throw e;
        }
        return ngos;
    }

    @Override
    @CrossOrigin(origins = "http://localhost:3000")
    public Ngo addNgo(Ngo ngo) {
        try{
            ngoDao.save(ngo);
        }
        catch (Exception e)
        {
            throw e;
        }

        return ngo;
    }

    @Override
    public Ngo getNgo(Long id) {
        Ngo ngo = new Ngo();
        try {
            ngo = ngoDao.getReferenceById(id);
        }
        catch (Exception e)
        {
            throw e;
        }
        return ngo;
    }

    @Override
    public Activity getActivity(Long id) {
        Activity activity = new Activity();
        try{
            activity = activityDao.getReferenceById(id);
        }
        catch (Exception e)
        {
            throw e;
        }
        return activity;
    }

    @Override
    public Activity addActivity(Activity activity) {
        try{
            activityDao.save(activity);
        }
        catch (Exception e)
        {
            throw e;
        }
        return  activity;
    }

}
