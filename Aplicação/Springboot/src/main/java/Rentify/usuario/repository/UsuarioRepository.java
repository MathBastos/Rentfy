package br.pucpr.exemplo.usuario.repository;

import br.pucpr.exemplo.usuario.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UsuarioRepository
        extends JpaRepository<Usuario, UUID> {
    Usuario findByLogin(String login);
}
