package com.example.server.models;

import jakarta.persistence.ManyToOne;

public class FDMapping {
    private Long fd_id;

    @ManyToOne
    private Fundraiser fr;
    @ManyToOne
    private Donor donor;



}
