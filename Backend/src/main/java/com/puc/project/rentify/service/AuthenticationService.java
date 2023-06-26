package com.puc.project.rentify.service;

import com.puc.project.rentify.model.AuthRequest;
import com.puc.project.rentify.model.AuthResponse;
import com.puc.project.rentify.model.UsuarioRegistro;
import com.puc.project.rentify.model.Usuario;
import com.puc.project.rentify.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(UsuarioRegistro request) {
        if (request.getRole().hasThisName()) {
            Usuario usuario = new Usuario();
            usuario.setUsuario(request.getUsuario());
            usuario.setEmail(request.getEmail());
            usuario.setSenha(passwordEncoder.encode(request.getSenha()));
            usuario.setRole(request.getRole());
            repository.save(usuario);
            var jwtToken = jwtService.generateToken(usuario);
            return AuthResponse.builder().token(jwtToken).role(usuario.getRole().toString()).build();
        } else {
            return AuthResponse.builder().token(null).role(null).build();
        }
    }
    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsuario(), request.getSenha()));
        var usuario = repository.findByUsuario(request.getUsuario());
        var jwtToken = jwtService.generateToken(usuario);
        return AuthResponse.builder().token(jwtToken).role(usuario.getRole().toString()).build();
    }

}
