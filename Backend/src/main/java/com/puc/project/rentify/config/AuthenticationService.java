package com.puc.project.rentify.config;

import com.puc.project.rentify.model.*;
import com.puc.project.rentify.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) throws Exceptions.IdAlreadyUsed, ExecutionException, InterruptedException, Exceptions.IdNotFound, Exceptions.UsernameAlreadyUsed {
        Usuario usuario = new Usuario();
        usuario.setUsuario(request.getUsuario());
        usuario.setEmail(request.getEmail());
        usuario.setSenha(passwordEncoder.encode(request.getSenha()));
        usuario.setRole(Role.USER);
        repository.adicionar(usuario);
        var jwtToken = jwtService.generateToken(usuario);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) throws Exceptions.IdNotFound, ExecutionException, InterruptedException {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsuario(), request.getSenha()));
        var usuario = repository.listar_usuario(request.getUsuario());
        var jwtToken = jwtService.generateToken(usuario);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

}
