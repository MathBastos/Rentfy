package com.rentify.rentify.Service;

import com.rentify.rentify.Entity.Usuario;
import com.rentify.rentify.Repository.UsuarioRepository;
import com.rentify.rentify.Request.LoginRequest;
import com.rentify.rentify.Request.UsuarioRequest;
import com.rentify.rentify.Response.LoginResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UsuarioService {

    private UsuarioRepository usuarioRepository;

    public LoginResponse login(LoginRequest credenciais) {
//        var usuario = usuarioRepository.findByLogin(credenciais.getLogin());
//        if (usuario == null) return null;
//        if (!usuario.getSenha().equals(credenciais.getSenha())) return null;
//
//        return new LoginResponse(usuario);
        return null;
    }

    public Usuario salvar(UsuarioRequest request) {
        var usuario = new Usuario();
        usuario.setUsuario(request.getLogin());
        usuario.setSenha(request.getSenha());
        usuario.setEmail(request.getEmail());

        usuario = usuarioRepository.save(usuario);

        return usuario;
    }
    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

}
