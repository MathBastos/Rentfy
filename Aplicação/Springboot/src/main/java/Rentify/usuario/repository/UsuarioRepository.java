package rentify.usuario.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import Rentify.usuario.entity.Usuario;

@Repository
public interface UsuarioRepository
        extends JpaRepository<Usuario, UUID> {
    Usuario findByLogin(String login);
}
