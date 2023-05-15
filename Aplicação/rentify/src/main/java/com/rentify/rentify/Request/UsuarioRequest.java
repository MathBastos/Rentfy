package com.rentify.rentify.Request;

import lombok.Data;

@Data
public class UsuarioRequest {
    private String login;
    private String senha;
    private String email;
}
