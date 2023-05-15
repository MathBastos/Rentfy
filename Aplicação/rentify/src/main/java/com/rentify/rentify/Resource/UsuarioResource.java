package com.rentify.rentify.Resource;

import com.rentify.rentify.Entity.Usuario;
import com.rentify.rentify.Request.LoginRequest;
import com.rentify.rentify.Request.UsuarioRequest;
import com.rentify.rentify.Response.LoginResponse;
import com.rentify.rentify.Service.UsuarioService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/usuario")
//@AllArgsConstructor
@EnableAutoConfiguration
public class UsuarioResource {
    private UsuarioService usuarioService;

    @Autowired
    public UsuarioResource(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest credenciais) {
        var login = usuarioService.login(credenciais);
        return login == null ?
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).build() :
                ResponseEntity.ok(login);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Usuario> salvar(@Valid @RequestBody UsuarioRequest usuario) {
        var dto = usuarioService.salvar(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @GetMapping
    public List<Usuario> listar() {
        return usuarioService.listar();
    }

}


