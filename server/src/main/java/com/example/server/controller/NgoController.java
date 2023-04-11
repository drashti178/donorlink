package com.example.server.controller;

import com.example.server.dao.ActivityDao;
import com.example.server.dao.FundraiserDao;
import com.example.server.dao.NgoDao;
import com.example.server.models.*;
import com.example.server.services.ActivityService;
import com.example.server.services.DonationService;
import com.example.server.services.FundraiserService;
import com.example.server.services.NgoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;


@CrossOrigin("*")
@RestController
@RequestMapping("/ngo")
public class NgoController {

    @Autowired
    private NgoDao ngoDao;
    @Autowired
    private FundraiserDao fundraiserDao;
    @Autowired
    private NgoService ngoService;
    @Autowired
    private FundraiserService fundraiserService;
    @Autowired
    private DonationService donationService;
    @Autowired
    private ActivityDao activityDao;

    @Autowired
    private ActivityService activityService;



    private String activitypath = "C:/Users/Drashti Patel/Documents/GitHub/donorlink/client/public/images/activity";

    private String fundraiserpath = "C:/Users/Drashti Patel/Documents/GitHub/donorlink/client/public/images/fundraiser";

    @GetMapping("/")
    public String home()
    {
        return "ngo page";

    }
    @GetMapping("/profile")
    public ResponseEntity<?> getUser(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Ngo ngo = ngoDao.findByNgoname(username);

        if(ngo == null)
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(ngo,HttpStatus.OK);
    }
    @PostMapping("addActivity")
    public ResponseEntity<String> addActivity(@RequestParam("activityBody") String activityBody, @RequestParam("act_img") MultipartFile file1) throws IOException {
        String  ngoname = SecurityContextHolder.getContext().getAuthentication().getName();
        Ngo ngo = ngoDao.findByNgoname(ngoname);

        ObjectMapper objectMapper = new ObjectMapper();
        Activity activity = objectMapper.readValue(activityBody, Activity.class);

        activity.setNgo(ngo);
        if(file1.isEmpty())
        {
            return new ResponseEntity<>("Provide profile Image", HttpStatus.BAD_REQUEST);

        }
        else{

            String filename = this.ngoService.uploadImage(activitypath,file1);
            System.out.println("123\n");
            System.out.println(filename);
            activity.setActivityImgName(filename);

            System.out.println("Image uploaded");
        }
        activityService.addActivity(activity);
        return new ResponseEntity<>("Activity added successfully", HttpStatus.OK);
    }

    @GetMapping("activities")
    public List<Activity> getActivities()
    {
        String  ngoname = SecurityContextHolder.getContext().getAuthentication().getName();
        Ngo ngo = ngoDao.findByNgoname(ngoname);


        return this.activityService.getActivities(ngo);
    }
    @GetMapping("/activity/{act_id}")
    public Optional<Activity> getActivity(@PathVariable Long act_id)
    {
        System.out.println(act_id);
        return this.activityService.getActivity(act_id);
    }


    @PutMapping("/updateActivity/{act_id}")
        public Activity updateActivity(@RequestParam("activityBody") String activityBody, @RequestParam("act_img") MultipartFile file1, @PathVariable Long act_id) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Activity activity = objectMapper.readValue(activityBody, Activity.class);
        System.out.println("1243\n");
        Activity activity1 = activityDao.findById(act_id).get();
        System.out.println("143\n");
        if(!file1.isEmpty())
        {
            String filename = this.ngoService.uploadImage(activitypath,file1);
            System.out.println(filename);
            activity1.setActivityImgName(filename);

        }
        else{
            activity1.setActivityImgName(activity.getActivityImgName());
        }

        activity1.setActivityname(activity.getActivityname());
        activity1.setDescription(activity.getDescription());
        activity1.setParticipation(activity.getParticipation());
        System.out.println("333\n");


        return this.activityService.updateActivity(activity1);
    }

    @DeleteMapping("deleteActivity/{id}")
    public ResponseEntity<String > deleteActivity(@PathVariable Long id){
        try{
            this.activityService.deleteActivity(id);
            return new ResponseEntity<>("activity deleted successfully",HttpStatus.OK);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>("Error in deleting activity",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("addFundraiser")
    public ResponseEntity<String> addFundraiser(@RequestParam("FrBody") String FR,@RequestParam("fr_img") MultipartFile file1) throws IOException {
        String  ngoname = SecurityContextHolder.getContext().getAuthentication().getName();
        Ngo ngo = ngoDao.findByNgoname(ngoname);

        ObjectMapper objectMapper = new ObjectMapper();
        Fundraiser fundraiser = objectMapper.readValue(FR,Fundraiser.class);
        fundraiser.setNgo(ngo);
        fundraiser.setStatus("active");

        Date date = new Date();
        fundraiser.setStartdate(date);

        if(file1.isEmpty())
        {
            return new ResponseEntity<>("Provide Fundraiser Image", HttpStatus.BAD_REQUEST);
        }
        else{
            String filename = this.ngoService.uploadImage(fundraiserpath,file1);
            System.out.println(filename);
            fundraiser.setFr_img(filename);

        }
        fundraiserService.addFundraiser(fundraiser);
        return new ResponseEntity<>("Fundraiser added successfully", HttpStatus.OK);

    }


    @GetMapping("fundrisers")
    public List<Fundraiser> getFundraisers()
    {
        String  ngoname = SecurityContextHolder.getContext().getAuthentication().getName();
        Ngo ngo = ngoDao.findByNgoname(ngoname);


        return this.fundraiserService.getFundraisers(ngo);
    }
    @GetMapping("/fundraiser/{fr_id}")
    public Fundraiser getFundraiser(@PathVariable long fr_id)
    {
        System.out.println(fr_id);
        return this.fundraiserService.getFundraiser(fr_id);
    }
    @GetMapping ("/stopFundraiser/{id}")
    public ResponseEntity<String > stopFundraiser(@PathVariable long id) {

        try {
            this.fundraiserService.stopFundraiser(id);
            return new ResponseEntity<>("fundraiser stopped successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error in stopping fundraiser", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("fundraiser/donation/{fd_id}")
    public ResponseEntity<List<FundraiserDonation>> getFundDonation(@PathVariable long fd_id) {

        Fundraiser f=fundraiserDao.findById(fd_id).get();
        List<FundraiserDonation> dlist = donationService.getFDonationByfundraiser(f);
        if(dlist.isEmpty()){
            return new ResponseEntity<>(null,HttpStatus.OK);
        }
        return new ResponseEntity<>(dlist,HttpStatus.OK);
    }


}
