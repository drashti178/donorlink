package com.example.server.services;

import com.example.server.dao.DonationDao;
import com.example.server.dao.FundraiserDonationDao;
import com.example.server.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImplDonationService implements DonationService{
    @Autowired
    private DonationDao donationDao;
    @Autowired
    private FundraiserDonationDao fdonationDao;
    @Override
    public Donation addDonation(Donation donation) {
        return null;
    }

    @Override
    public List<Donation> getDonationByNgo(Ngo ngo) {
        return donationDao.findByNgoOrderByAmountDesc(ngo);

    }

    @Override
    public List<Donation> getDonationByUser(Donor donor) {
        return donationDao.findByDonor(donor);
    }

    @Override
    public List<FundraiserDonation> getFDonationByUser(Donor donor) {
        return fdonationDao.findByDonor(donor);
    }

    @Override
    public List<FundraiserDonation> getFDonationByfundraiser(Fundraiser fundraiser) {
        return fdonationDao.findByFundraiser(fundraiser);
    }

    @Override
    public Donation getNgoTopDonor(Ngo ngo) {
        return null;
    }
}
