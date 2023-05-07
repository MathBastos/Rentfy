package rentify.usuario.entity;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @Column(name = "id_usuario")
    private Integer id;

    @NotNull
    @Column(unique = true, nullable = false)
    private String usuario;

    @NotNull
    @Column(unique = true, nullable = false)
    private String email;

    @JsonIgnore
    @NotNull
    @Column(nullable = false)
    private String senha;

    @NotNull
    @Column
    private String nome;


//    @NotNull
//    @ElementCollection
//    @CollectionTable(name = "ROLES", joinColumns = @JoinColumn(name = "id"))
//    @Column(name = "ROLE")
//    @ToString.Exclude
//    private Set<String> roles = new HashSet<>();
}
