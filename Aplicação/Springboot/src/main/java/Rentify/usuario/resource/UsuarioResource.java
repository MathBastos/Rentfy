package rentify.usuario.resource;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.security.RolesAllowed;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import rentify.usuario.entity.Usuario;
import rentify.usuario.requests.LocatarioRequest;
import rentify.usuario.requests.LoginRequest;
import rentify.usuario.responses.LoginResponse;
import rentify.usuario.service.UsuarioService;

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
    public ResponseEntity<Usuario> salvar(@Valid @RequestBody LocatarioRequest locatario) {
        var dto = usuarioService.salvar(locatario);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @GetMapping
    @RolesAllowed("USUARIO")
    public List<Usuario> listar() {
        return usuarioService.listar();
    }

}
