package com.example.server.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Ngo {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    private String ngoname;
    private String password;
    private String email;
    private String tagline;
    private String founder;
    private String areaofwork;
    private String address;
    private String country;
    private String pincode;
    private String mobile;
    private String weblink;
    private long totaldonation;
    private String role = "ngo";

    public Ngo(long id, String ngoname, String password, String email, String tagline, String founder, String areaofwork, String address, String country, String pincode, String mobile, String weblink) {
        this.id = id;
        this.ngoname = ngoname;
        this.password = password;
        this.email = email;
        this.tagline = tagline;
        this.founder = founder;
        this.areaofwork = areaofwork;
        this.address = address;
        this.country = country;
        this.pincode = pincode;
        this.mobile = mobile;
        this.weblink = weblink;
        this.totaldonation = 0;
        this.role = "ngo";
    }

    public Ngo() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNgoname() {
        return ngoname;
    }

    public void setNgoname(String ngoname) {
        this.ngoname = ngoname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTagline() {
        return tagline;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public String getFounder() {
        return founder;
    }

    public void setFounder(String founder) {
        this.founder = founder;
    }

    public String getAreaofwork() {
        return areaofwork;
    }

    public void setAreaofwork(String areaofwork) {
        this.areaofwork = areaofwork;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getWeblink() {
        return weblink;
    }

    public void setWeblink(String weblink) {
        this.weblink = weblink;
    }

    public long getTotaldonation() {
        return totaldonation;
    }

    public void setTotaldonation(long totaldonation) {
        this.totaldonation = totaldonation;
    }
}
