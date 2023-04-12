package com.example.server.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Ngo {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name="ngo_id")
    private long NgoId;

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
    private boolean has80G;
    private String ProfileImgName;
    private String CertiImgName;
    private String role="ngo";

    @OneToMany
    @JoinColumn(name = "col_req")
    private List<Ngo> requests;

    public Ngo( String ngoname, String password, String email, String tagline, String founder, String areaofwork, String address, String country, String pincode, String mobile, String weblink,Boolean has80G) {

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
        this.has80G=has80G;
    }
    public Ngo() {

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

    public long getNgoId() {
        return NgoId;
    }

    public void setNgoId(long ngoId) {
        NgoId = ngoId;
    }

    public boolean isHas80G() {
        return has80G;
    }

    public void setHas80G(boolean has80G) {
        this.has80G = has80G;
    }

    public String getProfileImgName() {
        return ProfileImgName;
    }

    public void setProfileImgName(String profileImgName) {
        ProfileImgName = profileImgName;
    }

    public String getCertiImgName() {
        return CertiImgName;
    }

    public void setCertiImgName(String certiImgName) {
        CertiImgName = certiImgName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
