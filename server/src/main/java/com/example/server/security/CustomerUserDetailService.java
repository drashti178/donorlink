package com.example.server.security;

import com.example.server.dao.NgoDao;
import com.example.server.dao.DonorDao;
import com.example.server.models.Donor;
import com.example.server.models.Ngo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerUserDetailService implements UserDetailsService
{
    @Autowired
    private NgoDao ngoDao;
    @Autowired
    private DonorDao donorDao;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException
    {
        Ngo ngo = ngoDao.findByNgoname(name);
        if(ngo==null)
        {
            Donor donor = donorDao.findByusername(name);
            return new User(donor.getUsername(), donor.getPassword(), mapRolesToAuthority("user"));
        }
        return new User(ngo.getNgoname(),ngo.getPassword(), mapRolesToAuthority("ngo"));
    }
    private Collection<GrantedAuthority> mapRolesToAuthority(String userRole)
    {
        List<String> roles = new ArrayList<String>();
        roles.add(userRole);

        return roles.stream().map(role -> new SimpleGrantedAuthority(role)).collect(Collectors.toList());
    }


}
