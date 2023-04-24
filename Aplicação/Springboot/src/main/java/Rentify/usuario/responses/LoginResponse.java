package br.pucpr.exemplo.usuario.responses;

import br.pucpr.exemplo.usuario.entity.Usuario;
import lombok.Data;
import lombok.NonNull;

@Data
public class LoginResponse {
    @NonNull
    private String token;
    @NonNull
    private Usuario usuario;
}
