package br.pucpr.exemplo.usuario.resource;

import br.pucpr.exemplo.usuario.entity.Usuario;
import br.pucpr.exemplo.usuario.requests.LoginRequest;
import br.pucpr.exemplo.usuario.requests.UsuarioRequest;
import br.pucpr.exemplo.usuario.responses.LoginResponse;
import br.pucpr.exemplo.usuario.service.UsuarioService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
@AllArgsConstructor
public class UsuarioResource {
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest credenciais) {
        var login = usuarioService.login(credenciais);
        return login == null ?
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).build() :
                ResponseEntity.ok(login);
    }

    @PostMapping
    public ResponseEntity<Usuario> salvar(@Valid @RequestBody UsuarioRequest usuario) {
        var dto = usuarioService.salvar(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @GetMapping
    @RolesAllowed("USUARIO")
    public List<Usuario> listar() {
        return usuarioService.listar();
    }

}
