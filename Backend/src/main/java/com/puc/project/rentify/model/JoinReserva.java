package com.puc.project.rentify.model;

import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Date;

@Data
public class JoinReserva {
    @Hidden
    private String id;
    @NotBlank
    private Date data_inicio;
    @NotBlank
    private Date data_final;
    @NotBlank
    private double valor_reserva;
    @NotBlank
    private JoinImovel imovel;
    @NotBlank
    private JoinLocatario locatario;

    public JoinReserva(Reserva obj, JoinImovel subObj1, JoinLocatario subObj2) {
        setId(obj.getId());
        setData_inicio(obj.getData_inicio());
        setData_final(obj.getData_final());
        setValor_reserva(obj.getValor_reserva());
        setImovel(subObj1);
        setLocatario(subObj2);
    }
}
