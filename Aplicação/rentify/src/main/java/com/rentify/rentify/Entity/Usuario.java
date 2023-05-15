package com.rentify.rentify.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id_usuario")
    private Integer id;

    @NotNull
    @Column(unique = true, nullable = false)
    private String login;

    @NotNull
    @Column(unique = true, nullable = false)
    private String email;

    @JsonIgnore
    @NotNull
    @Column(nullable = false)
    private String senha;
}
