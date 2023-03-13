package com.example.server.services;

import com.example.server.models.Donation;
import com.example.server.models.Donor;
import com.example.server.models.Ngo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImplDonationService implements DonationService{
    @Override
    public Donation addDonation(Donation donation) {
        return null;
    }

    @Override
    public List<Donation> getDonationByNgo(Ngo ngo) {
        return null;
    }

    @Override
    public List<Donation> getDonationByUser(Donor donor) {
        return null;
    }

    @Override
    public Donation getNgoTopDonor(Ngo ngo) {
        return null;
    }
}
