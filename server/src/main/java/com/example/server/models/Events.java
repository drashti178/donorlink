package com.example.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Events {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long event_id;

    @ManyToOne
    @JoinColumn(name = "ngo_id")
    private Ngo ngo;

    @ManyToMany(mappedBy = "joinedEvents")
    List<Donor> donors;

    private String eventname;
    private Date date;
    private String venue;
    private String cause;
    private String purpose;
    private String requirement;

    public Events() {
    }

    public Events(Ngo ngo, List<Donor> donors, String eventname, Date date, String venue, String cause, String purpose, String requirement) {
        this.ngo = ngo;
        this.donors = donors;
        this.eventname = eventname;
        this.date = date;
        this.venue = venue;
        this.cause = cause;
        this.purpose = purpose;
        this.requirement = requirement;
    }

    public long getEvent_id() {
        return event_id;
    }

    public void setEvent_id(long event_id) {
        this.event_id = event_id;
    }

    public Ngo getNgo() {
        return ngo;
    }

    public void setNgo(Ngo ngo) {
        this.ngo = ngo;
    }


    public List<Donor> getDonors() {
        return donors;
    }


    public void setDonors(List<Donor> donors) {
        this.donors = donors;
    }

    public String getEventname() {
        return eventname;
    }

    public void setEventname(String eventname) {
        this.eventname = eventname;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public String getCause() {
        return cause;
    }

    public void setCause(String cause) {
        this.cause = cause;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getRequirement() {
        return requirement;
    }

    public void setRequirement(String requirement) {
        this.requirement = requirement;
    }

//    @Override
//    public String toString() {
//        return "Events{" +
//                "event_id=" + event_id +
//                ", ngo=" + ngo +
//                ", donors=" + donors +
//                ", eventname='" + eventname + '\'' +
//                ", date=" + date +
//                ", venue='" + venue + '\'' +
//                ", cause='" + cause + '\'' +
//                ", purpose='" + purpose + '\'' +
//                ", requirement='" + requirement + '\'' +
//                '}';
//    }
}
