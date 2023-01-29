package com.example.server.services;

import com.example.server.dao.NgoDao;
import com.example.server.models.Ngo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NgoServiceImpl implements  NgoService{
   @Autowired
    private NgoDao ngoDao;
    @Override
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

}
