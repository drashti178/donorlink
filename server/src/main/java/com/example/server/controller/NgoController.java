package com.example.server.controller;

import com.example.server.dao.ActivityDao;
import com.example.server.dao.NgoDao;
import com.example.server.models.Activity;
import com.example.server.models.Donor;
import com.example.server.models.Ngo;
import com.example.server.services.ActivityService;
import com.example.server.services.NgoService;
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
import java.util.List;
import java.util.Optional;

@Secured("ngo")
@CrossOrigin("*")
@RestController
@RequestMapping("/ngo")
public class NgoController {

    @Autowired
    private NgoDao ngoDao;
    @Autowired
    private NgoService ngoService;
    @Autowired
    private ActivityDao activityDao;

    @Autowired
    private ActivityService activityService;

    private String activitypath = "static/images/activity";

    @GetMapping("/")
    public String home()
    {
        return "ngo page";

    }

    @PostMapping("/addActivity")
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
        this.activityService.addActivity(activity);
        return new ResponseEntity<>("Activity added successfully", HttpStatus.OK);
    }

    @GetMapping("activities")
    public List<Activity> getActivities()
    {
        String  ngoname = SecurityContextHolder.getContext().getAuthentication().getName();
        Ngo ngo = ngoDao.findByNgoname(ngoname);


        return this.activityService.getActivities(ngo);
    }
    @GetMapping("activity/{act_id}")
    public Optional<Activity> getActivity(@PathVariable Long act_id)
    {
        return this.activityService.getActivity(act_id);
    }


    @PutMapping("updateActivity/{act_id}")
    public Activity updateActivity(@RequestBody Activity activity, @PathVariable Long act_id)
    {
        Activity activity1 = activityDao.findById(act_id).get();
        if(activity.getActivityname()!=null)
        {
            activity1.setActivityname(activity.getActivityname());
        }
        if(activity.getDescription()!=null){
            activity1.setDescription(activity.getDescription());
        }


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

    @GetMapping("/profile")
    public ResponseEntity<Ngo> getUser(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Ngo ngo = ngoDao.findByNgoname(username);
        if(ngo == null){
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(ngo,HttpStatus.OK);
    }

}
