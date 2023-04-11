package com.example.server.services;

import com.example.server.models.Donor;
import com.example.server.models.Fundraiser;
import com.example.server.models.FundraiserDonation;
import com.example.server.models.Ngo;

import java.util.List;

public interface FundraiserService {
    public List<Fundraiser> getFundraisersByStatus(String st);
    public List<Fundraiser> getFundraisers(Ngo ngo);
    public Fundraiser addFundraiser(Fundraiser fundraiser);
    public Fundraiser getFundraiser(long id);
    public void stopFundraiser(long id);

    public FundraiserDonation addDonation(FundraiserDonation donation);
    public List<FundraiserDonation> getDonationByFundraiser(Fundraiser fundraiser);

    public List<FundraiserDonation> getDonationByDonor(Donor donor);

}
