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


    @Entity
    @Table(name = "fundraisers")
    public static class Fundraiser {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long fun_id;
        @ManyToOne
        private Ngo ngo;
        private String fr_name;
        private String Cause;
        private Date startdate;
        private Date enddate;
        private String fr_img;

        private Long duration;
        private Long amount;
        private Long target;



    }
}
