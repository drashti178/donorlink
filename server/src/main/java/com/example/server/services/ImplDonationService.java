package com.example.server.services;

import com.example.server.dao.DonationDao;
import com.example.server.models.Donation;
import com.example.server.models.Donor;
import com.example.server.models.Ngo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImplDonationService implements DonationService{
    @Autowired
    private DonationDao donationDao;
    @Override
    public Donation addDonation(Donation donation) {
        return null;
    }

    @Override
    public List<Donation> getDonationByNgo(Ngo ngo) {
        return donationDao.findByNgo(ngo);

    }

    @Override
    public List<Donation> getDonationByUser(Donor donor) {
        return donationDao.findByDonor(donor);
    }

    @Override
    public Donation getNgoTopDonor(Ngo ngo) {
        return null;
    }
}
