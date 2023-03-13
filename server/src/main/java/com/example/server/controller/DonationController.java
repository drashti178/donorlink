package com.example.server.controller;

import com.example.server.dao.DonationDao;
import com.example.server.dao.DonorDao;
import com.example.server.dao.FundraiserDao;
import com.example.server.dao.NgoDao;
import com.example.server.models.*;
import com.example.server.services.DonationService;
import com.example.server.services.FundraiserService;
import com.example.server.services.NgoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@CrossOrigin("*")
@RestController
@RequestMapping("/donation")
public class DonationController {

    @Autowired
    private DonorDao donorDao;
    @Autowired
    private FundraiserDao fundraiserDao;

    @Autowired
    private DonationDao donationDao;
    @Autowired
    private NgoDao ngoDao;

    @Autowired
    private NgoService ngoService;

    @Autowired
    private DonationService donationService;
    @Autowired
    private FundraiserService fundraiserService;

    @PostMapping("/update/{ngo_id}/{amount}")
    public ResponseEntity<String> updateDonation(@PathVariable Long ngo_id, @PathVariable Long amount) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Donor donor = donorDao.findByusername(username);
        Ngo ngo = ngoService.getNgo(ngo_id);

        Date date = new Date();
        ngo.setTotaldonation(ngo.getTotaldonation() + amount);
        ngoDao.save(ngo);
        donor.setTotaldonation(donor.getTotaldonation() + amount);
        donorDao.save(donor);
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

    @PostMapping("/fundraiser/{fr_id}/{amount}")
    public ResponseEntity<String> updateFDonation(@PathVariable Long fr_id, @PathVariable Long amount) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Donor donor = donorDao.findByusername(username);
        Fundraiser fundraiser=fundraiserService.getFundraiser(fr_id);

        Date date = new Date();
        Long current=fundraiser.getAmount();
        current = current+amount;
        fundraiser.setAmount(current);
        if(current>fundraiser.getTarget())
        {
            fundraiser.setEnddate(date);
            Date d2=fundraiser.getStartdate();
            long duration = d2.getTime() - date.getTime();
            long days = TimeUnit.MILLISECONDS.toDays(duration)%365;
            fundraiser.setDuration(days);
        }
        fundraiserDao.save(fundraiser);
        donor.setTotaldonation(donor.getTotaldonation() + amount);
        donorDao.save(donor);
        FundraiserDonation donation = new FundraiserDonation(fundraiser, donor, date, amount);
        fundraiserService.addDonation(donation);
        return new ResponseEntity<>("Donation updated successfully", HttpStatus.OK);
    }

}