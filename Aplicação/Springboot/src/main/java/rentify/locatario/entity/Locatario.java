package rentify.locatario.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import rentify.usuario.entity.Usuario;

@Entity
@Table(name = "locatario")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Locatario {

    @Id
    @Column(name = "id_locatario")
    private Integer id;

    @NotNull
    @Column(unique = true, nullable = false)
    private String cpf;

    @NotNull
    @Column(unique = true, nullable = false)
    private String celular;

    @NotNull
    @Column(name = "data_nascimento", nullable = false)
    private Date dataNascimento;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario")
    private Usuario idUsuario;
}
