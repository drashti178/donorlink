package com.example.server.dao;

import com.example.server.models.Ngo;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "fundraisers")
public class Fundraiser {
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
