package com.example.server.services;

import com.example.server.dao.DonorDao;
import com.example.server.dao.EventsDao;
import com.example.server.models.Donor;
import com.example.server.models.Events;
import com.example.server.models.Ngo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImplEventsService implements EventsService {

    @Autowired
    private EventsDao eventsDao;

    @Autowired
    private DonorDao donorDao;

    @Override
    public Events addEvent(Events event) {

        try{
            eventsDao.save(event);
        }
        catch(Exception e){
            throw e;
        }
        return event;
    }

    @Override
    public List<Events> findAllByNgo(Ngo ngo) {
        return eventsDao.findAllByNgo(ngo);
    }

    @Override
    public List<Events> findAll() {
        return eventsDao.findAll();
    }

    @Override
    public Events addVolunteer(Events event,Donor donor) {

        List<Events> events = donor.getJoinedEvents();
        events.add(event);
        donor.setJoinedEvents(events);
        donorDao.save(donor);
        return event;
    }
}
