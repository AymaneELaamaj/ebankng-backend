package org.sid.ebankingbackend.security;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.crypto.spec.SecretKeySpec;
import java.net.http.HttpClient;

import static org.hibernate.boot.model.process.spi.MetadataBuildingProcess.build;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    @Bean
    public InMemoryUserDetailsManager inMemoryUserDetailsManager() {
        PasswordEncoder passwordEncoder = passwordEncoder();
        return new InMemoryUserDetailsManager(
                User.withUsername("Nissrine").password(passwordEncoder.encode("1234")).authorities("USER").build(),
                User.withUsername("aymane").password(passwordEncoder.encode("1234")).authorities("USER", "ADMIN").build()
        );
    }
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(c -> c.disable())
                .cors(Customizer.withDefaults())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(ar -> ar
                        .requestMatchers("/login/**").permitAll()
                        .anyRequest().authenticated()
                )
                //.httpBasic(Customizer.withDefaults())
                .oauth2ResourceServer(oa -> oa.jwt(Customizer.withDefaults()))

                .build();
    }
    @Bean
    public JwtEncoder jwtEncoder() {
        String secretKey = "azertyuiop912AYEOGXY54ALSAzertyuiopsdfghjklockzjncvunzocofoc";
        return new NimbusJwtEncoder(new ImmutableSecret<>(secretKey.getBytes()));
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        String secretKey = "azertyuiop912AYEOGXY54ALSAzertyuiopsdfghjklockzjncvunzocofoc";
        SecretKeySpec secretKeySpec = new SecretKeySpec(secretKey.getBytes(), "RSA");
        return NimbusJwtDecoder.withSecretKey(secretKeySpec).macAlgorithm(MacAlgorithm.HS256).build();
    }
    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService userDetailsService) {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        return new ProviderManager(daoAuthenticationProvider);
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource ( ) {
        CorsConfiguration corsConfiguration=new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*");// Changez cela selon l'origine de votre client
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.addAllowedHeader("*");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",corsConfiguration);// pour etablir a tout les autre requete les meme chose
        return source;
    }
}
