package com.puc.project.rentify.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Builder
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Usuario implements UserDetails {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Hidden
        private long id;

        @Column(unique=true, nullable = false)
        private String usuario;
        @Column(unique=true, nullable = false)
        private String email;
        @JsonIgnore
        @Column(unique=true, nullable = false)
        private String senha;
        @JsonIgnore
        @Enumerated(EnumType.STRING)
        private Role role;
        @JsonIgnore
        private Boolean enabled;
        @JsonIgnore
        private String password;
        @JsonIgnore
        @ElementCollection(targetClass=SimpleGrantedAuthority.class)
        private List<SimpleGrantedAuthority> authorities;
        @JsonIgnore
        private String username;
        @JsonIgnore
        private Boolean accountNonExpired;
        @JsonIgnore
        private Boolean credentialsNonExpired;
        @JsonIgnore
        private Boolean accountNonLocked;


        public static String encodeSenha(String senha) {
                PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                return passwordEncoder.encode(senha);
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
//                return List.of(new SimpleGrantedAuthority(role.name()));

                List<GrantedAuthority> grantedAuthorities = null;
                if (role.name().equals("USER")) {
                        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority("ROLE_USER");
                        grantedAuthorities = Arrays.asList(grantedAuthority);
                }

                if (role.name().equals("ADMIN")) {
                        GrantedAuthority grantedAuthorityUser = new SimpleGrantedAuthority("ROLE_USER");
                        GrantedAuthority grantedAuthorityAdmin = new SimpleGrantedAuthority("ROLE_ADMIN");
                        grantedAuthorities = Arrays.asList(grantedAuthorityUser, grantedAuthorityAdmin);
                }

                return grantedAuthorities;
        }

        @Override
        public String getPassword() {
                return senha;
        }

        @Override
        public String getUsername() {
                return usuario;
        }

        @Override
        public boolean isAccountNonExpired() {
                return true;
        }

        @Override
        public boolean isAccountNonLocked() {
                return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
                return true;
        }

        @Override
        public boolean isEnabled() {
                return true;
        }
}

