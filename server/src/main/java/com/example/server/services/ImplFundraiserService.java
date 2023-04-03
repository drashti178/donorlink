package com.example.server.services;

import com.example.server.dao.FundraiserDao;
import com.example.server.dao.FundraiserDonationDao;
import com.example.server.models.Donor;
import com.example.server.models.Fundraiser;
import com.example.server.models.FundraiserDonation;
import com.example.server.models.Ngo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

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
    public Fundraiser getFundraiser(long id) {
        Fundraiser fr=fundraiserDao.getReferenceById(id);

        return fr;
    }

    @Override
    public void stopFundraiser(long id) {
        Fundraiser fr=fundraiserDao.getReferenceById(id);
        Date date = new Date();
        fr.setEnddate(date);
        Date d = fr.getStartdate();
//        DateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
//
//        Date d = new Date(123, 02,18);
        long duration = date.getTime() -d.getTime() ;
        long days = TimeUnit.MILLISECONDS.toDays(duration)%365;
        fr.setDuration(days);


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
