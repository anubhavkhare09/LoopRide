package com.app.jwt_utils;

import java.security.Key;
import java.util.Date;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtUtils {

    @Value("${SECRET_KEY}")
    private String jwtSecret;

    @Value("${EXP_TIMEOUT}")
    private int jwtExpirationMs;

    private Key key;

    @PostConstruct
    public void init() {
        key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    
    public String generateJwtToken(Authentication authentication) {
        log.info("Generating JWT token for authentication: {}", authentication);

        
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();

      
        String role = authentication.getAuthorities().stream()
                                    .findFirst()
                                    .map(authority -> authority.getAuthority())
                                    .orElse("UNKNOWN");

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername()) 
                .claim("role", role) 
                .setIssuedAt(new Date()) 
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs)) 
                .signWith(key, SignatureAlgorithm.HS512) 
                .compact();
    }

    
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

   
    public String getRoleFromJwtToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }

    
    public boolean validateJwtToken(String jwtToken) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jwtToken); 
            return true;
        } catch (Exception e) {
            log.error("Invalid JWT token: {}", e.getMessage());
        }
        return false;
    }
}
