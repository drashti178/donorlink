package com.example.server.controller;

import com.example.server.dao.UserDao;
import com.example.server.models.User;
//import com.example.server.security.TokenGenerator;
import com.example.server.services.UserService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import dto.AuthResponseDto;
import dto.UserLoginDto;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Optional;

@CrossOrigin("*")
@RestController
public class UserController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private UserService userService;

    @Autowired
    public Environment env;

    @GetMapping("/user/profile/{id}")
    public Optional<User> getUser(@PathVariable String id){
        return this.userService.getUser(Long.parseLong(id));
    }


    @PutMapping("/user/edit")
    public User updateUser(@RequestBody User user){
        User user1 = this.userService.addUser(user);
        return user1;
    }

    @PostMapping("/user/updateDonation/{id}/{amount}")
    public String verifyPayment(@PathVariable long id,@PathVariable long amount){

        return "orderId";
    }

}
