package com.example.server.models;

import jakarta.persistence.*;

@Entity
public class Collaborations {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long reqId;

    @ManyToOne
    @JoinColumn(name="n1")
    private Ngo ngo1;

    @ManyToOne
    @JoinColumn(name="n2")
    private Ngo ngo2;

    private boolean isApproved;

    public Collaborations(Ngo ngo1, Ngo ngo2, boolean isApproved) {
        this.ngo1 = ngo1;
        this.ngo2 = ngo2;
        this.isApproved = isApproved;
    }

    public Collaborations(){

    }

    public long getReqId() {
        return reqId;
    }

    public void setReqId(long reqId) {
        this.reqId = reqId;
    }

    public Ngo getNgo1() {
        return ngo1;
    }

    public void setNgo1(Ngo ngo1) {
        this.ngo1 = ngo1;
    }

    public Ngo getNgo2() {
        return ngo2;
    }

    public void setNgo2(Ngo ngo2) {
        this.ngo2 = ngo2;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }
}
