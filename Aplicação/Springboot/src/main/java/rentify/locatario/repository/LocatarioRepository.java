package rentify.locatario.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import rentify.locatario.entity.Locatario;

@Repository
public interface LocatarioRepository extends JpaRepository<Locatario, UUID> {
}
