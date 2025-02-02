package org.sid.ebankingbackend.web;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
public class Authentification {
    private AuthenticationManager authenticationManager;
    private JwtEncoder jwtEncoder;
    @GetMapping("/profile")

    public Authentication authentication(Authentication authentication){
        return authentication;
    }
    @PostMapping("/login")

    public Map<String,String> login(String username, String password){
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );
        Instant instant=Instant.now();
        String autorities = authenticate.getAuthorities().stream().map(ls -> ls.getAuthority()).collect(Collectors.joining(" "));
        JwtClaimsSet jwtClaimsSet= JwtClaimsSet.builder()
                .issuedAt(instant)
                .expiresAt(instant.plus(1, ChronoUnit.HOURS))
                .subject(username)
                .claim("scope",autorities)
                .build();
        JwtEncoderParameters jwtEncoderParameters=JwtEncoderParameters.from(
                JwsHeader.with(MacAlgorithm.HS256).build(),
                jwtClaimsSet
        );
        String jwt=jwtEncoder.encode(jwtEncoderParameters).getTokenValue();
        return Map.of("token",jwt);
    }
}
