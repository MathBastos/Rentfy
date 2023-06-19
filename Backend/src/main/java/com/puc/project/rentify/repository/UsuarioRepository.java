package com.puc.project.rentify.repository;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.puc.project.rentify.model.Especificacao;
import com.puc.project.rentify.model.Usuario;
import com.puc.project.rentify.model.Exceptions.*;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class UsuarioRepository extends BasicRepository{
    private String collection = "usuarios";
    private String parentCollection1 = "locatarios";
    private String parentCollection2 = "locadoras";
    private String parentCollectionKey = "id_usuario";

    public UsuarioRepository() throws IOException {
        createFirestoreDb();
    }

    public boolean validateParentCollections(String id) throws ExecutionException, InterruptedException {
        return db.collection(parentCollection1).whereEqualTo(parentCollectionKey, id).get().get().isEmpty()
                && db.collection(parentCollection2).whereEqualTo(parentCollectionKey, id).get().get().isEmpty();
    }

    public Usuario listar(String id) throws IdNotFound, ExecutionException, InterruptedException {
        DocumentSnapshot document = db.collection(collection).document(id).get().get();
        if (document.exists()) {
            return document.toObject(Usuario.class);
        } else {
            throw new IdNotFound();
        }
    }

    public Usuario listar_usuario(String usuario) throws ExecutionException, InterruptedException, IdNotFound {
        List<QueryDocumentSnapshot> documents = db.collection(collection).whereEqualTo("usuario", usuario).get().get().getDocuments();
        for (DocumentSnapshot document : documents) {
            if (document.exists()) {
                return document.toObject(Usuario.class);
            }
        }
        throw new IdNotFound();
    }

    public boolean existe_usuario(String usuario) throws ExecutionException, InterruptedException, IdNotFound {
        List<QueryDocumentSnapshot> documents = db.collection(collection).whereEqualTo("usuario", usuario).get().get().getDocuments();
        for (DocumentSnapshot document : documents) {
            if (document.exists()) {
                return true;
            }
        }
        return false;
    }

    public List<Usuario> listar() throws ExecutionException, InterruptedException {
        List<QueryDocumentSnapshot> documents = db.collection(collection).get().get().getDocuments();
        List<Usuario> array = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            if (document.exists()) {
                array.add(document.toObject(Usuario.class));
            }
        }
        return array;
    }

    public String adicionar(Usuario obj) throws UsernameAlreadyUsed, IdAlreadyUsed, ExecutionException, InterruptedException, IdNotFound {
        if (!existe_usuario(obj.getUsuario())) {
            DocumentReference document = db.collection(collection).document(obj.getId());
            if (document.get().get().exists()) {
                throw new IdAlreadyUsed();
            } else {
                return document.set(obj).get().getUpdateTime().toString();
            }
        } else {
            throw new UsernameAlreadyUsed();
        }
    }

    public String alterar(Usuario obj) throws IdNotFound, ExecutionException, InterruptedException {
        DocumentReference document = db.collection(collection).document(obj.getId());
        if (document.get().get().exists()) {
            return document.set(obj).get().getUpdateTime().toString();
        } else {
            throw new IdNotFound();
        }
    }

    public String deletar(String id) throws IdNotFound, IdInForeignObject, ExecutionException, InterruptedException {
        DocumentReference document = db.collection(collection).document(id);
        if (document.get().get().exists()) {
            if (validateParentCollections(id)) {
                return document.delete().get().getUpdateTime().toString();
            } else {
                throw new IdInForeignObject();
            }
        } else {
            throw new IdNotFound();
        }
    }
}
