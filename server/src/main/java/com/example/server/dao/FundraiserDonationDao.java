package com.example.server.dao;

import com.example.server.models.Donor;
import com.example.server.models.Fundraiser;
import com.example.server.models.FundraiserDonation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FundraiserDonationDao extends JpaRepository<FundraiserDonation,Long> {
    public List<FundraiserDonation> findByFundraiser(Fundraiser fundraiser);
    public List<FundraiserDonation> findByDonor(Donor donor);
}
