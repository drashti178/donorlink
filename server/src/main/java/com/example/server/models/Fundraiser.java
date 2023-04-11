package com.example.server.models;

import jakarta.persistence.*;

import java.util.Date;
@Entity
@Table(name = "fundraisers")
public class Fundraiser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long fun_id;

    @ManyToOne
    @JoinColumn(name = "ngo_id")
    private Ngo ngo;
    private String fr_name;
    private String Cause;
    private Date startdate;
    private Date enddate;
    private String fr_img;

    private long duration;
    private long amount;
    private long target;
    private String status;

    public long getFun_id() {
        return fun_id;
    }

    public void setFun_id(long fun_id) {
        this.fun_id = fun_id;
    }

    public Ngo getNgo() {
        return ngo;
    }

    public void setNgo(Ngo ngo) {
        this.ngo = ngo;
    }

    public String getFr_name() {
        return fr_name;
    }

    public void setFr_name(String fr_name) {
        this.fr_name = fr_name;
    }

    public String getCause() {
        return Cause;
    }

    public void setCause(String cause) {
        Cause = cause;
    }

    public Date getStartdate() {
        return startdate;
    }

    public void setStartdate(Date startdate) {
        this.startdate = startdate;
    }

    public Date getEnddate() {
        return enddate;
    }

    public void setEnddate(Date enddate) {
        this.enddate = enddate;
    }

    public String getFr_img() {
        return fr_img;
    }

    public void setFr_img(String fr_img) {
        this.fr_img = fr_img;
    }

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public long getTarget() {
        return target;
    }

    public void setTarget(long target) {
        this.target = target;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}