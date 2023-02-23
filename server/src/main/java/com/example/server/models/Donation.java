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


}
