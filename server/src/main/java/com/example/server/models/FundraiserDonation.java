package com.example.server.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class FundraiserDonation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fd_id;

    @ManyToOne
    @JoinColumn(name = "fund_id")
    private Fundraiser fundraiser;

    @ManyToOne
    @JoinColumn(name = "donor_id")
    private Donor donor;
    private Date date;
    private Long amount;

    public FundraiserDonation() {
    }

    public FundraiserDonation( Fundraiser fundraiser, Donor donor, Date date, Long amount) {
        this.fd_id = fd_id;
        this.fundraiser = fundraiser;
        this.donor = donor;
        this.date = date;
        this.amount = amount;
    }

    public Long getFd_id() {
        return fd_id;
    }

    public void setFd_id(Long fd_id) {
        this.fd_id = fd_id;
    }

    public Fundraiser getFundraiser() {
        return fundraiser;
    }

    public void setFundraiser(Fundraiser fundraiser) {
        this.fundraiser = fundraiser;
    }

    public Donor getDonor() {
        return donor;
    }

    public void setDonor(Donor donor) {
        this.donor = donor;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }
}
