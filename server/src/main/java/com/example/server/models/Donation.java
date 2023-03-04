package com.example.server.models;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long d_id;

    @ManyToOne
    private Ngo ngo;
    @ManyToOne
    private Donor donor;
    private Date date;
    private Boolean eligible;
    private Long amount;

    public Donation(Ngo ngo, Donor donor, Date date, Boolean eligible, Long amount) {
        this.ngo = ngo;
        this.donor = donor;
        this.date = date;
        this.eligible = eligible;
        this.amount = amount;
    }

    public Donation() {

    }

    public Long getD_id() {
        return d_id;
    }

    public void setD_id(Long d_id) {
        this.d_id = d_id;
    }

    public Ngo getNgo() {
        return ngo;
    }

    public void setNgo(Ngo ngo) {
        this.ngo = ngo;
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

    public Boolean getEligible() {
        return eligible;
    }

    public void setEligible(Boolean eligible) {
        this.eligible = eligible;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }
}
