package com.example.server.services;

import com.example.server.models.*;

import java.util.List;

public interface DonationService {

    public Donation addDonation(Donation donation);
    public List<Donation> getDonationByNgo(Ngo ngo);

    public List<Donation> getDonationByUser(Donor donor);
    public List<FundraiserDonation> getFDonationByUser(Donor donor);
    public List<FundraiserDonation> getFDonationByfundraiser(Fundraiser fundraiser);
    public Donation getNgoTopDonor(Ngo ngo);

}

