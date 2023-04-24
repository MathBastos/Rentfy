package br.pucpr.exemplo.usuario.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "USUARIO")
@Data
@NoArgsConstructor
public class Usuario {

    @Id
    @Column(name = "CPF")
    private String cpf;

    @NotNull
    @Column(unique = true, nullable = false)
    private String login;

    @NotNull
    @Column(unique = true, nullable = false)
    private String email;

    @JsonIgnore
    @NotNull
    private String senha;

    @Column(name = "NOME")
    private String nome;

    @Column(name = "TELEFONE")
    private String telefone;

    @Column(name = "IDADE")
    @Min(18)
    @Max(99)
    private Integer idade = 0;

    @NotNull
    @ElementCollection
    @CollectionTable(name = "ROLES", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "ROLE")
    @ToString.Exclude
    private Set<String> roles = new HashSet<>();
}
