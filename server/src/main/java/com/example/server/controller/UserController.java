package com.example.server.controller;

import com.example.server.dao.UserDao;
import com.example.server.models.User;
import com.example.server.security.TokenGenerator;
import com.example.server.services.UserService;
import dto.AuthResponseDto;
import dto.UserLoginDto;
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

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserDao userDao;
    private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;

    private TokenGenerator tokenGenerator;

    @Autowired
    public UserController(AuthenticationManager authenticationManager,
                         PasswordEncoder passwordEncoder, TokenGenerator tokenGenerator) {

        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.tokenGenerator = tokenGenerator;
    }

    @Autowired
    private UserService userService;

    @PostMapping("/user/signup")
    public ResponseEntity<String> addUser(@RequestBody User user){
        if(userDao.existsByusername(user.getUsername()))
        {
            return new ResponseEntity<>("Ngoname exist ", HttpStatus.BAD_REQUEST);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDao.save(user);
        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }

    @PostMapping("/user/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody UserLoginDto logindto)
    {
        if(userDao.existsByEmail(logindto.getUsername()))
        {
            logindto.setUsername(userDao.findByEmail(logindto.getUsername()).getUsername());
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(logindto.getUsername(),logindto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenGenerator.generateToken(authentication);


        return new ResponseEntity<>(new AuthResponseDto(token),HttpStatus.OK);

    }

}
