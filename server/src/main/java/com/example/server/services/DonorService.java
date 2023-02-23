package com.example.server.services;

import com.example.server.models.Donor;

import java.util.List;

public interface DonorService {
    public List<Donor> getUsers();

    public Donor addUser(Donor user);
    public Donor getUser(Long id);
}
