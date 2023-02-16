package com.example.server.controller;
import com.example.server.dao.NgoDao;
import com.example.server.dao.UserDao;
import com.example.server.models.Ngo;
import com.example.server.security.TokenGenerator;
import com.example.server.models.User;
import com.example.server.services.NgoService;
import dto.AuthResponseDto;
import dto.NgoLoginDto;
import com.example.server.services.UserService;
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

public class AuthController {
    @Autowired
    private NgoDao ngoDao;
    private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;
    private TokenGenerator tokenGenerator;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager,
                         PasswordEncoder passwordEncoder, TokenGenerator tokenGenerator) {

        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.tokenGenerator = tokenGenerator;
    }

    @Autowired
    private UserDao userDao;
    @Autowired
    private NgoService ngoService;
    @Autowired
    private UserService userService;

    @GetMapping("home")
    public String home(){
        return "Welcome to Donorlinker";
    }

    @PostMapping("/ngo/signup")
    public ResponseEntity<String> addNgo(@RequestBody Ngo ngo){

        if(ngoDao.existsByNgoname(ngo.getNgoname()))
        {
            return new ResponseEntity<>("Ngoname exist ", HttpStatus.BAD_REQUEST);
        }
        ngo.setPassword(passwordEncoder.encode(ngo.getPassword()));
        ngoDao.save(ngo);
        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }
    @PostMapping("/ngo/login")
    public ResponseEntity<AuthResponseDto> ngoLogin(@RequestBody NgoLoginDto logindto)
    {
        if(ngoDao.existsByEmail(logindto.getNgoname()))
        {
            logindto.setNgoname(ngoDao.findByEmail(logindto.getNgoname()).getNgoname());
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(logindto.getNgoname(),logindto.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenGenerator.generateToken(authentication);


        return new ResponseEntity<>(new AuthResponseDto(token),HttpStatus.OK);

    }

    @PostMapping("/user/signup")
    public ResponseEntity<String> addUser(@RequestBody User user){
        if(userDao.existsByusername(user.getUsername()))
        {
            return new ResponseEntity<>("Username exist ", HttpStatus.BAD_REQUEST);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDao.save(user);


        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);


    }

    @PostMapping("/user/login")
    public ResponseEntity<AuthResponseDto> userLogin(@RequestBody UserLoginDto logindto)
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
