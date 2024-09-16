package org.sid.ebankingbackend.security;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;


    private String emaail;
    private String password;
}
