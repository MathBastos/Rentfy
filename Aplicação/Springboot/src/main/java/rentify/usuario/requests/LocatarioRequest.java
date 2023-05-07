package rentify.usuario.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LocatarioRequest {
    @NotBlank
    private String usuario;
    @Size(min = 8, max = 30, message = "Senha precisa ter de {min} a {max} caracteres!")
    private String senha;
    @NotBlank
    private String nome;
    @NotBlank
    private String cpf;
    @NotBlank
    private String celular;
    @NotBlank
    private String dataNascimento;
    @NotBlank
    private String email;
}