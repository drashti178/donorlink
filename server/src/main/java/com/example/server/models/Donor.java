package com.example.server.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Donor {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    private String name;
    private String username;
    private String password;
    private String email;
    private String country;
    private long contactno;
    private long adharno;
    private String profession;
    private String type;
    private long totaldonation;
    private String ProfileImgName;
    private String role = "user";


    @ManyToMany(cascade = {
            CascadeType.ALL
    })
    @JoinTable(
            name = "events_donors",
            joinColumns = {
                    @JoinColumn(name = "donor_id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "event_id")
            }
    )private List<Events> joinedEvents = new ArrayList<Events>();

    public Donor(String name, String username, String password, String email, String country, long contactno, long adharno, String profession, String type, String profileImgName, List<Events> joinedEvents) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
        this.country = country;
        this.contactno = contactno;
        this.adharno = adharno;
        this.profession = profession;
        this.type = type;
        this.totaldonation = 0;
        this.ProfileImgName = profileImgName;
        this.joinedEvents = joinedEvents;
    }

    public Donor() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public long getContactno() {
        return contactno;
    }

    public void setContactno(long contactno) {
        this.contactno = contactno;
    }

    public long getAdharno() {
        return adharno;
    }

    public void setAdharno(long adharno) {
        this.adharno = adharno;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getTotaldonation() {
        return totaldonation;
    }

    public void setTotaldonation(long totaldonation) {
        this.totaldonation = totaldonation;
    }

    public String getProfileImgName() {
        return ProfileImgName;
    }

    public void setProfileImgName(String profileImgName) {
        ProfileImgName = profileImgName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
