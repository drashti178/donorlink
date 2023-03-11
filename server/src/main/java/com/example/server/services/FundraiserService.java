package com.example.server.services;

import com.example.server.models.Fundraiser;
import com.example.server.models.Ngo;

import java.util.List;

public interface FundraiserService {
    public List<Fundraiser> getFundraisers(Ngo ngo);
    public Fundraiser addFundraiser(Fundraiser fundraiser);
    public Fundraiser getFundraiser(Long id);
    public void deleteFundraiser(Long id);
}
