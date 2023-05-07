package rentify.usuario.service;

import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.annotation.security.RolesAllowed;
import lombok.AllArgsConstructor;
import rentify.locatario.entity.Locatario;
import rentify.locatario.repository.LocatarioRepository;
import rentify.security.JWT;
import rentify.usuario.entity.Usuario;
import rentify.usuario.repository.UsuarioRepository;
import rentify.usuario.requests.LocatarioRequest;
import rentify.usuario.requests.LoginRequest;
import rentify.usuario.responses.LoginResponse;

@Service
@AllArgsConstructor
public class UsuarioService {
    private UsuarioRepository usuarioRepository;
    private LocatarioRepository locatarioRepository;
    private JWT jwt;

    public LoginResponse login(LoginRequest credenciais) {
        var usuario = usuarioRepository.findByLogin(credenciais.getLogin());
        if (usuario == null) return null;
        if (!usuario.getSenha().equals(credenciais.getSenha())) return null;

        var token = jwt.createToken(usuario);
        return new LoginResponse(token, usuario);
    }

    public Usuario salvar(LocatarioRequest request) {
        var usuario = new Usuario();
        usuario.setLogin(request.getLogin());
        usuario.setSenha(request.getSenha());
        usuario.setNome(request.getNome());
        usuario.setEmail(request.getEmail());
        //usuario.getRoles().add("LOCATARIO");
        
        usuario = usuarioRepository.save(usuario);
        
        var locatario = new Locatario();
        locatario.setCpf(request.getCpf());
        locatario.setCelular(request.getCelular());
        locatario.setDataNascimento(request.getDataNascimento());
        locatario.setUsuario(usuario);
        
        locatarioRepository.save(locatario);
        
//        return usuarioRepository.save(usuario);
        return usuario;
    }

    @RolesAllowed("USUARIO")
    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }
}
