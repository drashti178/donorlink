package com.example.server.models;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer r_id;
    private String name;

    public Role() {
    }

    public Role(Integer r_id) {
        this.r_id = r_id;
    }

    public Role(String name) {
        this.name = name;
    }

    public Role(Integer r_id, String name) {
        this.r_id = r_id;
        this.name = name;
    }

    public Integer getR_id() {
        return r_id;
    }

    public void setR_id(Integer r_id) {
        this.r_id = r_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
