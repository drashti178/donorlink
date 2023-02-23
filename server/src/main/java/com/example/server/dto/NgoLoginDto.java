package com.example.server.dto;

public class NgoLoginDto {
    String ngoname;
    String password;

    public String getNgoname()
    {
        return ngoname;
    }
    public String getPassword(){
        return password;
    }

    public void setNgoname(String ngoname) {
        this.ngoname = ngoname;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
