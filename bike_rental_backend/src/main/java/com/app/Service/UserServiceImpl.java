package com.app.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Entity.*;
import com.app.Exception.ResourceNotFoundException;
import com.app.Repository.UserRepository;
@Service
public class UserServiceImpl implements UserService {

	
		@Autowired
		 private  UserRepository userRepository;

		   

		   
		    public User registerUser(User user) {
    			    	user.setRole(Role.ROLE_CUSTOMER);
		        return userRepository.save(user);
		    }

		   
		    public User updateUser(Long id, User userDetails) {
		        User user = userRepository.findById(id)
		                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
		        
		        user.setId(id);
		        user.setPassword(userDetails.getPassword());
		        user.setRole(Role.ROLE_CUSTOMER);
		        user.setUserName(userDetails.getUserName());
		        user.setEmail(userDetails.getEmail());
		        user.setContact(userDetails.getContact());
		        user.setPincode(userDetails.getPincode());
		        user.setAddress(userDetails.getAddress());
		        return userRepository.save(user);
		    }

		   
		    public List<User> getAllUsers() {
		        return userRepository.findAll();
		    }

		   
		    public User getUserById(Long id) {
		        return userRepository.findById(id)
		                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
		    }
		    
		    @Override
		    public boolean existsByEmail(String email) {
		        return userRepository.findByEmail(email).isPresent();
		    }

		    @Override
		    public boolean updatePassword(String email, String newPassword) {
		        Optional<User> optionalUser = userRepository.findByEmail(email);
		        if (optionalUser.isPresent()) {
		            User user = optionalUser.get();
		            user.setPassword(newPassword); 
		            userRepository.save(user);
		            return true;
		        }
		        return false;
		    }
	}


