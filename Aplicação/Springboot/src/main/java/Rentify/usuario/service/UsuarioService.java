package br.pucpr.exemplo.usuario.service;

import br.pucpr.exemplo.security.JWT;
import br.pucpr.exemplo.usuario.entity.Usuario;
import br.pucpr.exemplo.usuario.repository.UsuarioRepository;
import br.pucpr.exemplo.usuario.requests.LoginRequest;
import br.pucpr.exemplo.usuario.requests.UsuarioRequest;
import br.pucpr.exemplo.usuario.responses.LoginResponse;
import jakarta.annotation.security.RolesAllowed;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UsuarioService {
    private UsuarioRepository usuarioRepository;
    private JWT jwt;

    public LoginResponse login(LoginRequest credenciais) {
        var usuario = usuarioRepository.findByLogin(credenciais.getLogin());
        if (usuario == null) return null;
        if (!usuario.getSenha().equals(credenciais.getSenha())) return null;

        var token = jwt.createToken(usuario);
        return new LoginResponse(token, usuario);
    }

    public Usuario salvar(UsuarioRequest request) {
        var usuario = new Usuario();
        usuario.setLogin(request.getLogin());
        usuario.setSenha(request.getSenha());
        usuario.setNome(request.getNome());
        usuario.setIdade(request.getIdade());
        usuario.getRoles().add("LOCATARIO");
        return usuarioRepository.save(usuario);
    }

    @RolesAllowed("USUARIO")
    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }
}
