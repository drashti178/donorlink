package dto;

public class NgoLoginDto {
    String ngoname;
    String password;
    String email;

    public String getNgoname()
    {
        return ngoname;
    }
    public String getPassword(){
        return password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setNgoname(String ngoname) {
        this.ngoname = ngoname;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
