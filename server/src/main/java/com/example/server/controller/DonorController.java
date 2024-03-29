package com.example.server.controller;

import com.example.server.dao.DonationDao;
import com.example.server.dao.DonorDao;
import com.example.server.dao.NgoDao;
import com.example.server.models.Claims;
import com.example.server.models.Donation;
import com.example.server.models.Donor;
import com.example.server.models.Ngo;
import com.example.server.services.ClaimService;
import com.example.server.services.DonationService;
import com.example.server.services.DonorService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class DonorController {

    @Autowired
    private DonorDao donorDao;

    @Autowired
    private NgoDao ngoDao;

    @Autowired
    private DonorService donorService;
    @Autowired
    private DonationDao donationDao;
    @Autowired
    private ClaimService claimService;

    @Autowired
    public Environment env;

    private String taxdedcertipath = "C:/Users/Tilak/Documents/GitHub/donorlink/client/public/pdf/taxdedCertificates";

    private String userprofilepath = "C:/Users/Tilak/Documents/GitHub/donorlink/client/public/images/userprofileImgs";
    private PasswordEncoder passwordEncoder;

//    private DonorService donorService;

    public DonorController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/")
    public String home()
    {
        return "user page";

    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUser(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Donor donor = donorDao.findByusername(username);
        if(donor == null){
            Ngo ngo = ngoDao.findByNgoname(username);
            if(ngo != null)
                return new ResponseEntity<>(ngo,HttpStatus.OK);
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(donor,HttpStatus.OK);
    }

    @PutMapping("/edit")
    public ResponseEntity<String> updateUser(@RequestParam("data") String donorBody, @RequestParam("profile") MultipartFile file1) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Donor donor= objectMapper.readValue(donorBody, Donor.class);

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Donor donor1 = donorDao.findByusername(username);

        if(file1.isEmpty())
        {
            return new ResponseEntity<>("Provide profile Image", HttpStatus.BAD_REQUEST);
        }
        else{
            String filename = this.donorService.uploadImage(userprofilepath,file1);
            System.out.println("123\n");
            System.out.println(filename);
            donor.setProfileImgName(filename);
            System.out.println("Profile uploaded");
        }
        if(!(donor1.getUsername().equals(donor.getUsername()))){
            if(donorDao.existsByusername(donor.getUsername())){
                return new ResponseEntity<>("Username already exist", HttpStatus.BAD_REQUEST);
            }
        }
        this.donorDao.save(donor);
        return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
    }

    @PutMapping("/editInfoOnly")
    public ResponseEntity<String> updateInfo(@RequestBody Donor donor) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Donor donor1 = donorDao.findByusername(username);

        if(!(donor1.getUsername().equals(donor.getUsername()))){
            if(donorDao.existsByusername(donor.getUsername())){
                return new ResponseEntity<>("Username already exist", HttpStatus.BAD_REQUEST);
            }
        }
           this.donorDao.save(donor);
        return new ResponseEntity<>("User updated successfully", HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser() {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Donor donor = donorDao.findByusername(username);
        donorDao.delete(donor);
        return new ResponseEntity<>("User deleted successfully", HttpStatus.OK);
    }
    @GetMapping("/download/{donationId}")
    public ResponseEntity downloadCerti(@PathVariable Long donationId) {
        Donation donation = donationDao.findById(donationId).get();
        Claims claim = claimService.findByDonation(donation);
        String fileName =  claim.getTaxDedCertiName();
        Path path = Paths.get(taxdedcertipath +"/" + fileName);
        UrlResource resource = null;
        try {
            resource = new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        String contentType = null;
        try {
            contentType = Files.probeContentType(Paths.get(fileName));
        } catch (IOException e) {
            // Handle the exception as appropriate for your application
        }
        System.out.println(contentType);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

}
