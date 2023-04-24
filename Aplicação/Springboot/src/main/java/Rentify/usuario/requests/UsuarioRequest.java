package br.pucpr.exemplo.usuario.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UsuarioRequest {
    @NotBlank
    private String login;
    @Size(min = 8, max = 30, message = "Senha precisa ter de {min} a {max} caracteres!")
    private String senha;
    @NotBlank
    private String nome;
    @NotBlank
    private int idade;
}
