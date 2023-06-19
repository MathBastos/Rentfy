package com.puc.project.rentify.model;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class JoinLocadora {
    @Hidden
    private String id;
    @NotBlank
    private String nome_fantasia;
    @NotBlank
    private String cnpj;
    @NotBlank
    private String telefone;
    @NotBlank
    private Usuario usuario;
    @NotBlank
    private JoinEndereco endereco;

    public JoinLocadora(Locadora obj, Usuario subObj1, JoinEndereco subObj2) {
        setId(obj.getId());
        setNome_fantasia(obj.getNome_fantasia());
        setCnpj(obj.getCnpj());
        setTelefone(obj.getTelefone());
        setUsuario(subObj1);
        setEndereco(subObj2);
    }
}
