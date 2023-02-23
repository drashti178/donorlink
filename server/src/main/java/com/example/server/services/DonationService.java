package com.example.server.services;

import com.example.server.models.Donation;
import com.example.server.models.Donor;
import com.example.server.models.Ngo;

import java.util.List;

public interface DonationService {

    public Donation addDonation(Donation donation);
    public List<Donation> getDonationByNgo(Ngo ngo);

    public List<Donation> getDonationByUser(Donor donor);

    public Donation getNgoTopDonor(Ngo ngo);

}

