package com.example.server.services;

import com.example.server.models.Donor;
import com.example.server.models.Events;
import com.example.server.models.Ngo;

import java.util.List;

public interface EventsService {
    public Events addEvent(Events event);

    public List<Events> findAllByNgo(Ngo ngo);

    public List<Events> findAll();

    public Events addVolunteer(Events event,Donor donor);
}
