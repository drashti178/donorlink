package com.example.server.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "activities")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long a_id;

    private String activityname;
    private String description;

    private Long participation;

    private String activityImgName;


    @ManyToOne
    @JoinColumn(name = "ngo_id")
    private Ngo ngo;

    public Ngo getNgo() {
        return ngo;
    }

    public void setNgo(Ngo ngo) {
        this.ngo = ngo;
    }

    public Activity(String activityname, String description) {
        this.activityname = activityname;
        this.description = description;

    }

    public Activity() {
    }

    public Long getA_id() {
        return a_id;
    }

    public void setA_id(Long a_id) {
        this.a_id = a_id;
    }

    public String getActivityname() {
        return activityname;
    }

    public void setActivityname(String activityname) {
        this.activityname = activityname;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getActivityImgName() {
        return activityImgName;
    }

    public void setActivityImgName(String activityImgName) {
        this.activityImgName = activityImgName;
    }

    public Long getParticipation() {
        return participation;
    }

    public void setParticipation(Long participation) {
        this.participation = participation;
    }
}