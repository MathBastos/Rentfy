package com.puc.project.rentify.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class Reserva {
    @Hidden
    private String id;
    @NotBlank
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date data_inicio;
    @NotBlank
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date data_final;
    @NotBlank
    private double valor_reserva;
    @NotBlank
    private String id_imovel;
    @NotBlank
    private String id_locatario;

    public Reserva(){
        this.id = UUID.randomUUID().toString();
    }
}
