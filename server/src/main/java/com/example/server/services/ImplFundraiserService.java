package com.example.server.services;

import com.example.server.dao.FundraiserDao;
import com.example.server.models.Fundraiser;
import com.example.server.models.Ngo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ImplFundraiserService implements FundraiserService{
    @Autowired
    private FundraiserDao fundraiserDao;
    @Override
    public List<Fundraiser> getFundraisers(Ngo ngo) {
        return fundraiserDao.findByNgo(ngo);
    }

    @Override
    public Fundraiser addFundraiser(Fundraiser fundraiser) {
        fundraiserDao.save(fundraiser);
        return fundraiser;
    }

    @Override
    public Fundraiser getFundraiser(Long id) {
        Fundraiser fr=fundraiserDao.getReferenceById(id);

        return fr;
    }

    @Override
    public void deleteFundraiser(Long id) {
        Fundraiser fr=fundraiserDao.getReferenceById(id);
        fundraiserDao.delete(fr);

    }
}
