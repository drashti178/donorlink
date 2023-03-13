package com.example.server.services;

import com.example.server.dao.FundraiserDao;
import com.example.server.dao.FundraiserDonationDao;
import com.example.server.models.Donor;
import com.example.server.models.Fundraiser;
import com.example.server.models.FundraiserDonation;
import com.example.server.models.Ngo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ImplFundraiserService implements FundraiserService{
    @Autowired
    private FundraiserDao fundraiserDao;
    @Autowired
    private FundraiserDonationDao fundraiserDonationDao;
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

    @Override
    public FundraiserDonation addDonation(FundraiserDonation donation) {
        return fundraiserDonationDao.save(donation);
    }

    @Override
    public List<FundraiserDonation> getDonationByFundraiser(Fundraiser fundraiser) {
        return fundraiserDonationDao.findByFundraiser(fundraiser);
    }


    @Override
    public List<FundraiserDonation> getDonationByDonor(Donor donor) {
        return fundraiserDonationDao.findByDonor(donor);
    }


}
