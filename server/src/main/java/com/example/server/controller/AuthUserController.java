package com.example.server.controller;

import com.example.server.dao.UserDao;
import com.example.server.models.User;
//import com.example.server.security.TokenGenerator;
import com.example.server.services.UserService;
import dto.UserLoginDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.password.PasswordEncoder;
import dto.AuthResponseDto;
import org.springframework.http.HttpStatus;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/authUser")
public class AuthUserController {

    @Autowired
    private UserDao userDao;
//    private AuthenticationManager authenticationManager;
//    private PasswordEncoder passwordEncoder;
//    private TokenGenerator tokenGenerator;

//    @Autowired
//    public AuthUserController(AuthenticationManager authenticationManager,
//                             PasswordEncoder passwordEncoder, TokenGenerator tokenGenerator) {
//
////        this.authenticationManager = authenticationManager;
//        this.passwordEncoder = passwordEncoder;
////        this.tokenGenerator = tokenGenerator;
//    }

    @Autowired
    private UserService userService;

    @GetMapping("home")
    public String home() {
        return "Welcome to Donorlinker";
    }

    @PostMapping("/user/signup")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        if (userDao.existsByUsername(user.getUsername())) {
            return new ResponseEntity<>("Username exist ", HttpStatus.BAD_REQUEST);
        }
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDao.save(user);
        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }

    @PostMapping("/user/login")
    public User userLogin(@RequestBody UserLoginDto logindto){
        User user = new User();
        if (userDao.existsByEmail(logindto.getEmail())) {
            user = userDao.findByUsername(logindto.getUsername());
            return user;
//            logindto.setUsername(userDao.findByEmail(logindto.getEmail()).getUsername());
        }
//        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(logindto.getUsername(), logindto.getPassword()));
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        String token = tokenGenerator.generateToken(authentication);
        ;
        return null;
    }
}
