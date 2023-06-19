package com.puc.project.rentify.model;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class JoinImovel {
    @Hidden
    private String id;
    @NotBlank
    private double preco_dia;
    @NotBlank
    private String flag_reservado;
    @NotBlank
    private JoinLocadora locadora;
    @NotBlank
    private Especificacao especificacao;
    @NotBlank
    private JoinEndereco endereco;

    public JoinImovel(Imovel obj, JoinLocadora subObj1, Especificacao subObj2, JoinEndereco subObj3) {
        setId(obj.getId());
        setPreco_dia(obj.getPreco_dia());
        setFlag_reservado(obj.getFlag_reservado());
        setLocadora(subObj1);
        setEspecificacao(subObj2);
        setEndereco(subObj3);
    }
}
