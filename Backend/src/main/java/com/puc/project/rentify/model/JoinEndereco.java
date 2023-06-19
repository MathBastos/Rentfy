package com.puc.project.rentify.model;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class JoinEndereco {
    @Hidden
    private String id;
    @NotBlank
    private String bairro;
    @NotBlank
    private String cep;
    @NotBlank
    private String rua;
    @NotBlank
    private String numero;
    private String complemento;
    @NotBlank
    private Cidade cidade;

    public JoinEndereco(Endereco obj, Cidade subObj1) {
        setId(obj.getId());
        setBairro(obj.getBairro());
        setCep(obj.getCep());
        setRua(obj.getRua());
        setNumero(obj.getNumero());
        setComplemento(obj.getComplemento());
        setCidade(subObj1);
    }
}
