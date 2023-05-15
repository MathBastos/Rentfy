package com.rentify.rentify.Response;

import com.rentify.rentify.Entity.Usuario;
import lombok.Data;
import lombok.NonNull;

@Data
public class LoginResponse {

    @NonNull
    private Usuario usuario;

}
