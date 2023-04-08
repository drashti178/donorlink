package com.example.server.dao;

import com.example.server.models.Donation;
import com.example.server.models.Donor;
import com.example.server.models.Ngo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DonationDao extends JpaRepository<Donation,Long> {
    public List<Donation> findByNgo(Ngo ngo);

    public List<Donation> findByDonor(Donor donor);

    public List<Donation> findByNgoOrderByAmountDesc(Ngo ngo);
}
