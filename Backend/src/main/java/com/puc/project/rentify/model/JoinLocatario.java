package com.puc.project.rentify.model;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Date;

@Data
public class JoinLocatario {
    @Hidden
    private String id;
    @NotBlank
    private String cpf;
    @NotBlank
    private String celular;
    @NotBlank
    private Date data_nascimento;
    @NotBlank
    private Usuario usuario;
    @NotBlank
    private JoinEndereco endereco;

    public JoinLocatario(Locatario obj, Usuario subObj1, JoinEndereco subObj2) {
        setId(obj.getId());
        setCpf(obj.getCpf());
        setCelular(obj.getCelular());
        setData_nascimento(obj.getData_nascimento());
        setUsuario(subObj1);
        setEndereco(subObj2);
    }
}
