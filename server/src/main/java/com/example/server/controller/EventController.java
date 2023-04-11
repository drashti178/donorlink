package com.example.server.controller;

import com.example.server.dao.DonorDao;
import com.example.server.dao.NgoDao;
import com.example.server.models.Donor;
import com.example.server.models.Events;
import com.example.server.models.Ngo;
import com.example.server.services.EventsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/event")
public class EventController {

    @Autowired
    private EventsService eventsService;

    @Autowired
    private NgoDao ngoDao;

    @Autowired
    private DonorDao donorDao;

    @PostMapping("add")
    public ResponseEntity<String> addEvent(@RequestBody Events event){
        String ngoname = SecurityContextHolder.getContext().getAuthentication().getName();
        Ngo ngo = ngoDao.findByNgoname(ngoname);

        event.setNgo(ngo);
        Events event1 = eventsService.addEvent(event);
        if(event1 == null)
            return new ResponseEntity<>("Something went Wrong",HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>("Event added successfully",HttpStatus.OK);
    }

    @GetMapping("getAllByNgo")
    public ResponseEntity<List<Events>> getAllByNgo(){
        String ngoname = SecurityContextHolder.getContext().getAuthentication().getName();
        Ngo ngo = ngoDao.findByNgoname(ngoname);
        if(ngo == null)
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        List<Events>eventsList = eventsService.findAllByNgo(ngo);
        return new ResponseEntity<>(eventsList,HttpStatus.OK);
    }

    @PutMapping("addVolunteer")
    public ResponseEntity<String> addVolunteer(@RequestBody Events event){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Donor donor = donorDao.findByusername(username);

        if(donor == null)
            return new ResponseEntity<>("Something went Wrong",HttpStatus.BAD_REQUEST);
        List<Donor>donors = event.getDonors();
        if(donors.contains(donor))
            return new ResponseEntity<>("Already Exist",HttpStatus.BAD_REQUEST);
        eventsService.addVolunteer(event,donor);
        return new ResponseEntity<>("Volunteer added successfully",HttpStatus.OK);
    }
}
