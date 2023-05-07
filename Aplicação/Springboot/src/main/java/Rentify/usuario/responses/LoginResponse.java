package rentify.usuario.responses;

import rentify.usuario.entity.Usuario;
import lombok.Data;
import lombok.NonNull;

@Data
public class LoginResponse {
    @NonNull
    private String token;
    @NonNull
    private Usuario usuario;
}
