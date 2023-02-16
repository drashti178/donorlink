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
    private long aid;
    private String activityname;
    private String description;
    @Column(nullable = true,length = 64)
    private String img;
    public Activity(long aid, String activityname, String description, String img) {
        this.aid = aid;
        this.activityname = activityname;
        this.description = description;
        this.img = img;
    }

    public Activity() {
    }

    public long getAid() {
        return aid;
    }

    public void setAid(long aid) {
        this.aid = aid;
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

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
