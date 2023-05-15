package com.rentify.rentify.Repository;

import com.rentify.rentify.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
        //Usuario findByLogin(String usuario);

}
