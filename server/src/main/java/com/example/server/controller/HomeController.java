package com.example.server.controller;
import com.example.server.models.Activity;
import com.example.server.models.Donor;
import com.example.server.models.Fundraiser;
import com.example.server.models.Ngo;
import com.example.server.services.ActivityService;
import com.example.server.services.DonorService;
import com.example.server.services.FundraiserService;
import com.example.server.services.NgoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/home")
public class HomeController {
    @Autowired
    private NgoService ngoService;
    @Autowired
    private ActivityService activityService;
    @Autowired
    private FundraiserService fundraiserService;

    @Autowired
    private DonorService donorService;

    @GetMapping("ngos")
    public List<Ngo> getNgos()
    {
        return ngoService.getNgos();
    }

    @GetMapping("getngoByCat/{cat}")
    public List<Ngo> getNgoByCategory(@PathVariable String cat)
    {

        System.out.println("inside");
        return ngoService.getNgosbywork(cat);
    }
    @GetMapping("getngoById/{id}")
    public Ngo getNgoByCategory(@PathVariable long id)
    {
        System.out.println(id);
        System.out.println("inside");
        return ngoService.getNgo(id);
    }
    @GetMapping("activities/{id}")
    public List<Activity> getActivities(@PathVariable long id)
    {
        Ngo ngo = ngoService.getNgo(id);
        return this.activityService.getActivities(ngo);
    }
    @GetMapping("fundrisers/{id}")
    public List<Fundraiser> getFundraisers(@PathVariable long id)
    {
        Ngo ngo = ngoService.getNgo(id);
        return this.fundraiserService.getFundraisers(ngo);
    }
    @GetMapping("activefundraisers")
    public List<Fundraiser> getActiveFundraisers()
    {
        return this.fundraiserService.getFundraisersByStatus("active");
    }


    @GetMapping("getAllSortedByDonation")
    public ResponseEntity<List<Donor>> getDonationSorted() {

        List<Donor> dlist = donorService.findAllOrderByDonation();
        if(dlist.isEmpty()){
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
        return new ResponseEntity<>(dlist,HttpStatus.OK);
    }

}
