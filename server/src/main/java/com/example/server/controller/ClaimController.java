package com.example.server.controller;

import com.example.server.dao.ClaimDao;
import com.example.server.dao.DonationDao;
import com.example.server.models.Claims;
import com.example.server.models.Donation;
import com.example.server.models.Donor;
import com.example.server.services.ClaimService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/claim")
public class ClaimController {

    private String taxdedcertipath = "static/pdfs/taxdedcertificates";

    @Autowired
    private DonationDao donationDao;

    @Autowired
    private ClaimDao claimDao;

    @Autowired
    private ClaimService claimService;

    @PostMapping("/add/{donationId}")
    public ResponseEntity<String> addClaim(@PathVariable Long donationId){
        Donation donation = donationDao.findById(donationId).get();
        Claims claim = new Claims(donation);
        Claims claim1 = claimService.findByDonation(donation);
        if(claim1 != null){
            return new ResponseEntity<>("Already Claimed",HttpStatus.OK);
        }
        claimDao.save(claim);
        return new ResponseEntity<>("Claimed Successfully",HttpStatus.OK);
    }

    @PutMapping("/update/{claimId}")
    public ResponseEntity<String> updateClaim(@RequestParam("certificate") MultipartFile file1,@PathVariable Long claimId) throws IOException {

        Claims claim = claimDao.findById(claimId).get();

        if(claim == null){
            return new ResponseEntity<>("InValid ClaimID", HttpStatus.BAD_REQUEST);
        }
        if(file1.isEmpty())
        {
            return new ResponseEntity<>("Provide Certificate", HttpStatus.BAD_REQUEST);
        }

        String filename = this.claimService.uploadImage(taxdedcertipath, file1);
        System.out.println("123\n");
        System.out.println(filename);
        claim.setTaxDedCertiName(filename);
        System.out.println("Certificate uploaded");
        claimDao.save(claim);
        return new ResponseEntity<>("Updated Successfully", HttpStatus.BAD_REQUEST);

    }

    @GetMapping("/approvalStatus/{donationId}")
    public ResponseEntity<String> getApproval(@PathVariable Long donationId) {
        Donation donation = donationDao.getById(donationId);
        Claims claim = claimService.findByDonation(donation);

        if(claim == null){
            return new ResponseEntity<>("notPresent", HttpStatus.OK);
        }
        return new ResponseEntity<>((claim.isApproved())?"yes":"no", HttpStatus.OK);
    }
}