package com.example.server.models;

import jakarta.persistence.*;

@Entity
public class Claims {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long claimId;

    @OneToOne
    private Donation donation;
    private boolean isApproved = false;
    private String TaxDedCertiName;

    public Claims(Donation donation) {
        this.donation = donation;
    }

    public Claims() { }

    public long getClaimId() {
        return claimId;
    }

    public void setClaimId(long claimId) {
        this.claimId = claimId;
    }

    public Donation getDonation() {
        return donation;
    }

    public void setDonation(Donation donation) {
        this.donation = donation;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }

    public String getTaxDedCertiName() {
        return TaxDedCertiName;
    }

    public void setTaxDedCertiName(String taxDedCertiName) {
        TaxDedCertiName = taxDedCertiName;
    }
}
