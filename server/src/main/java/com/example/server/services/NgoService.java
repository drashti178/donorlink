package com.example.server.services;

import com.example.server.models.Ngo;

import java.util.List;

public interface NgoService {
    public List<Ngo> getNgos();

    public Ngo addNgo(Ngo ngo);
    public Ngo getNgo(Long id);
}