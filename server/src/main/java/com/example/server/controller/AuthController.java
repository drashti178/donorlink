package com.example.server.controller;
import com.example.server.dao.DonationDao;
import com.example.server.dao.FundraiserDao;
import com.example.server.dao.NgoDao;
import com.example.server.dao.DonorDao;
import com.example.server.models.*;
import com.example.server.security.TokenGenerator;
import com.example.server.services.EmailService;
import com.example.server.services.FundraiserService;
import com.example.server.services.NgoService;
import com.example.server.dto.AuthResponseDto;
import com.example.server.dto.NgoLoginDto;
import com.example.server.services.DonorService;
import com.example.server.dto.DonorLoginDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.Random;


@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class AuthController {
    private AuthenticationManager authenticationManager;

    private TokenGenerator tokenGenerator;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, TokenGenerator tokenGenerator) {

        this.authenticationManager = authenticationManager;

        this.tokenGenerator = tokenGenerator;
    }
    @Autowired
    private NgoDao ngoDao;
    @Autowired
    private DonorDao donorDao;
    @Autowired
    private DonationDao donationDao;
    @Autowired
    private NgoService ngoService;
    @Autowired
    private DonorService donorService;
    @Autowired
    private FundraiserService fundraiserService;

    @Autowired
    private EmailService emailService;

    private String userprofilepath = "C:/Users/Tilak/Documents/GitHub/donorlink/client/public/images/userprofileImgs";

    private String ngoprofilepath = "C:/Users/Tilak/Documents/GitHub/donorlink/client/public/images/ngoprofileImgs";
    private String certipath = "C:/Users/Tilak/Documents/GitHub/donorlink/client/public/images/certiImgs";



    @PostMapping("ngo/signup")
    public ResponseEntity<String> addNgo(@RequestParam("data") String ngoBody, @RequestParam("profile") MultipartFile file1, @RequestParam("certificate") MultipartFile file2) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Ngo ngo= objectMapper.readValue(ngoBody,Ngo.class);
        if(ngoDao.existsByNgoname(ngo.getNgoname()))
        {
            return new ResponseEntity<>("Ngoname already exist ", HttpStatus.BAD_REQUEST);
        }
        if(ngoDao.existsByEmail(ngo.getEmail()))
        {
            return new ResponseEntity<>("Email already exist", HttpStatus.BAD_REQUEST);
        }
        if(file1.isEmpty())
        {
            return new ResponseEntity<>("Provide profile Image", HttpStatus.BAD_REQUEST);

        }
        else{
            String filename = this.ngoService.uploadImage(ngoprofilepath,file1);
            System.out.println(filename);
            ngo.setProfileImgName(filename);
        }
        if(ngo.isHas80G() && file2.isEmpty())
        {
            return new ResponseEntity<>("Provide certificate Image", HttpStatus.BAD_REQUEST);

        }
        else if(ngo.isHas80G()){
            String filename = this.ngoService.uploadImage(certipath,file2);
            System.out.println(filename);
            ngo.setCertiImgName(filename);
        }


        ngoService.addNgo(ngo);
        return new ResponseEntity<>("Ngo registered successfully", HttpStatus.OK);
    }
    @PostMapping("/ngo/login")
    public ResponseEntity<AuthResponseDto> ngoLogin(@RequestBody NgoLoginDto logindto)
    {
        if(ngoDao.existsByEmail(logindto.getNgoname()))
        {
            logindto.setNgoname(ngoDao.findByEmail(logindto.getNgoname()).getNgoname());
        }
        Ngo ngo = ngoDao.findByNgoname(logindto.getNgoname());
        if(ngo!= null){
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(logindto.getNgoname(),logindto.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = tokenGenerator.generateToken(authentication);

            return new ResponseEntity<>(new AuthResponseDto(token),HttpStatus.OK);
        }
       return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }

    @PostMapping("/user/signup")
    public ResponseEntity<String> addUser(@RequestParam("donorBody") String donorBody, @RequestParam("profile") MultipartFile file1) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Donor donor= objectMapper.readValue(donorBody, Donor.class);

        if(donorDao.existsByusername(donor.getUsername()))
        {
            return new ResponseEntity<>("Donorname already exist", HttpStatus.BAD_REQUEST);
        }
        if(donorDao.existsByEmail(donor.getEmail()))
        {
            return new ResponseEntity<>("Email already exist", HttpStatus.BAD_REQUEST);
        }
        if(file1.isEmpty())
        {
            return new ResponseEntity<>("Provide profile Image", HttpStatus.BAD_REQUEST);

        }
        else{
            String filename = this.ngoService.uploadImage(userprofilepath,file1);
            System.out.println(filename);
            donor.setProfileImgName(filename);

        }
        donorService.addDonor(donor);
        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }

    @PostMapping("/user/login")
    public ResponseEntity<AuthResponseDto> userLogin(@RequestBody DonorLoginDto logindto)
    {
        if(donorDao.existsByEmail(logindto.getUsername()))
        {
            logindto.setUsername(donorDao.findByEmail(logindto.getUsername()).getUsername());
        }
        Donor donor = donorDao.findByusername(logindto.getUsername());
        if(donor!= null) {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(logindto.getUsername(), logindto.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = tokenGenerator.generateToken(authentication);

            return new ResponseEntity<>(new AuthResponseDto(token), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }


    @PostMapping("/donation/update/{ngo_id}/{amount}")
    public ResponseEntity<String> updateDonation(@PathVariable Long ngo_id, @PathVariable Long amount) {
        Ngo ngo = ngoService.getNgo(ngo_id);

        Date date = new Date();
        ngo.setTotaldonation(amount);

        Donation donation = new Donation(ngo, null, date, (amount > 2000) ? true : false, amount);
        donationDao.save(donation);
        return new ResponseEntity<>("Donation updated successfully", HttpStatus.OK);
    }
    @PostMapping("/fdonation/update/{fr_id}/{amount}")
    public ResponseEntity<String> updateFDonation(@PathVariable Long fr_id, @PathVariable Long amount) {
        Fundraiser fr=fundraiserService.getFundraiser(fr_id);

        Date date = new Date();
        Long current=fr.getAmount();
        current = current+amount;
        fr.setAmount(current);

        FundraiserDonation donation=new FundraiserDonation(fr,null,date, amount);
        fundraiserService.addDonation(donation);

        return new ResponseEntity<>("Donation updated successfully", HttpStatus.OK);
    }

    @GetMapping("/user/ifExists/{email}/{username}")
    public ResponseEntity<String> findByDonorEmail(@PathVariable String email,@PathVariable String username){
        Donor donor = donorDao.findByEmail(email);
        if(donor == null)
            return new ResponseEntity<>("User doesn't exist!!",HttpStatus.BAD_REQUEST);
        if(!donor.getUsername().equals(username))
            return new ResponseEntity<>("Email and username doesn't matched!!",HttpStatus.BAD_REQUEST);

        Random rnd = new Random();
        int number = rnd.nextInt(999999);
        String securityKey =  String.format("%06d", number);
        emailService.sendMail(email,"\tHello, " + donor.getUsername() + "\nWe have provided security Key to you for password resetting. You can use this key only one time.\nSecurity Key:- " + securityKey + "\nRegards, donorlinker.");
        return new ResponseEntity<>(securityKey,HttpStatus.OK);
    }

    @GetMapping("/ngo/ifExists/{email}/{username}")
    public ResponseEntity<String> findByNgoEmail(@PathVariable String email,@PathVariable String username){
        Ngo ngo = ngoDao.findByEmail(email);
        if(ngo == null)
            return new ResponseEntity<>("Ngo doesn't exist!!",HttpStatus.BAD_REQUEST);
        if(!ngo.getNgoname().equals(username))
            return new ResponseEntity<>("Email and ngoname doesn't matched!!",HttpStatus.BAD_REQUEST);
        Random rnd = new Random();
        int number = rnd.nextInt(999999);
        String securityKey =  String.format("%06d", number);
        emailService.sendMail(email,"\tHello, " + ngo.getNgoname() + "\nWe have provided security Key to you for password resetting. You can use this key only one time.\nSecurity Key:- " + securityKey + "\nRegards, donorlinker.");
        return new ResponseEntity<>(securityKey,HttpStatus.OK);
    }

    @PutMapping("/user/passwordChange")
    public ResponseEntity<String> changeUserPassword(@RequestBody DonorLoginDto logindto){
        Donor donor = donorDao.findByEmail(logindto.getEmail());
        if(donor == null)
            return new ResponseEntity<>("User doesn't exist!!",HttpStatus.BAD_REQUEST);
        donor.setPassword(logindto.getPassword());
        donorService.addDonor(donor);
        return new ResponseEntity<>("Password updated successfully!!",HttpStatus.OK);
    }

    @PutMapping("/ngo/passwordChange")
    public ResponseEntity<String> changeNgoPassword(@RequestBody NgoLoginDto logindto){
        Ngo ngo = ngoDao.findByEmail(logindto.getEmail());
        if(ngo == null)
            return new ResponseEntity<>("Ngo doesn't exist!!",HttpStatus.BAD_REQUEST);
        ngo.setPassword(logindto.getPassword());
        ngoService.addNgo(ngo);
        return new ResponseEntity<>("Password updated successfully!!",HttpStatus.OK);
    }
}
