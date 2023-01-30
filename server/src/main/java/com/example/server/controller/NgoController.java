package com.example.server.controller;

import com.example.server.dao.NgoDao;
import com.example.server.models.Ngo;
import com.example.server.security.TokenGenerator;
import com.example.server.services.NgoService;
import dto.AuthResponseDto;
import dto.NgoLoginDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
public class NgoController {

    @Autowired
    private NgoDao ngoDao;
     private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;

    private TokenGenerator tokenGenerator;

    @Autowired
    public NgoController(AuthenticationManager authenticationManager,
                          PasswordEncoder passwordEncoder, TokenGenerator tokenGenerator) {

        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.tokenGenerator = tokenGenerator;
    }

    @Autowired
    private NgoService ngoService;
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
        return new ResponseEntity<>("User regested successfully", HttpStatus.OK);
    }
    @PostMapping("/ngo/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody NgoLoginDto logindto)
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

}
