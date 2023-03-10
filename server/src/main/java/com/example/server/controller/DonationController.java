package com.example.server.controller;

import com.example.server.dao.DonationDao;
import com.example.server.dao.DonorDao;
import com.example.server.models.Donation;
import com.example.server.models.Donor;
import com.example.server.models.Ngo;
import com.example.server.services.DonationService;
import com.example.server.services.NgoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/donation")
public class DonationController {

    @Autowired
    private DonorDao donorDao;

    @Autowired
    private DonationDao donationDao;

    @Autowired
    private NgoService ngoService;

    @Autowired
    private DonationService donationService;

    @PostMapping("/update/{ngo_id}/{amount}")
    public ResponseEntity<String> updateDonation(@PathVariable Long ngo_id, @PathVariable Long amount) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Donor donor = donorDao.findByusername(username);
        Ngo ngo = ngoService.getNgo(ngo_id);

        Date date = new Date();
        ngo.setTotaldonation(amount);
        donor.setTotaldonation(donor.getTotaldonation() + amount);
        Donation donation = new Donation(ngo, donor, date, ((amount > 2000) && ngo.isHas80G()) ? true : false, amount);
        donationDao.save(donation);
        return new ResponseEntity<>("Donation updated successfully", HttpStatus.OK);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Donation>> getDonation() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Donor donor = donorDao.findByusername(username);

        List<Donation> dlist = donationService.getDonationByUser(donor);
        if(dlist.isEmpty()){
            return new ResponseEntity<>(null,HttpStatus.OK);
        }
        return new ResponseEntity<>(dlist,HttpStatus.OK);
    }
}
