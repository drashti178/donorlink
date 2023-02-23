package dto;

public class UserLoginDto {
    String username;
    String password;
    String email;

    public String getUsername()
    {
        return username;
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

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
