package com.puc.project.rentify.repository;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.puc.project.rentify.model.JoinLocatario;
import com.puc.project.rentify.model.Locatario;
import com.puc.project.rentify.model.Exceptions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class LocatarioRepository extends BasicRepository{
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private EnderecoRepository enderecoRepository;
    private String collection = "locatarios";
    private String subCollection1 = "usuarios";
    private String subCollection2 = "enderecos";
    private String parentCollection1 = "reservas";
    private String parentCollectionKey = "id_locatario";

    public LocatarioRepository() throws IOException {
        createFirestoreDb();
    }

    public JoinLocatario BuildJoinObj(Locatario obj) throws IdNotFound, ExecutionException, InterruptedException {
        return new JoinLocatario(obj, usuarioRepository.listar(obj.getId_usuario()), enderecoRepository.listar_join(obj.getId_endereco()));
    }

    public boolean validateSubCollection1(Locatario obj) throws ExecutionException, InterruptedException {
        return db.collection(subCollection1).document(obj.getId_usuario()).get().get().exists();
    }

    public boolean validateSubCollection2(Locatario obj) throws ExecutionException, InterruptedException {
        return db.collection(subCollection2).document(obj.getId_endereco()).get().get().exists();
    }

    public boolean validateParentCollections(String id) throws ExecutionException, InterruptedException {
        return db.collection(parentCollection1).whereEqualTo(parentCollectionKey, id).get().get().isEmpty();
    }

    public Locatario listar(String id) throws IdNotFound, ExecutionException, InterruptedException {
        DocumentSnapshot document = db.collection(collection).document(id).get().get();
        if (document.exists()) {
            return document.toObject(Locatario.class);
        } else {
            throw new IdNotFound();
        }
    }

    public JoinLocatario listar_join(String id) throws IdNotFound, ExecutionException, InterruptedException {
        DocumentSnapshot document = db.collection(collection).document(id).get().get();
        if (document.exists()) {
            return BuildJoinObj(document.toObject(Locatario.class));
        } else {
            throw new IdNotFound();
        }
    }

    public List<Locatario> listar() throws ExecutionException, InterruptedException {
        List<QueryDocumentSnapshot> documents = db.collection(collection).get().get().getDocuments();
        List<Locatario> array = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            if (document.exists()) {
                array.add(document.toObject(Locatario.class));
            }
        }
        return array;
    }

    public List<JoinLocatario> listar_join() throws IdNotFound, ExecutionException, InterruptedException {
        List<QueryDocumentSnapshot> documents = db.collection(collection).get().get().getDocuments();
        List<JoinLocatario> array = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            if (document.exists()) {
                array.add(BuildJoinObj(document.toObject(Locatario.class)));
            }
        }
        return array;
    }

    public String adicionar(Locatario obj) throws IdAlreadyUsed, ForeignIdNotExists, ExecutionException, InterruptedException {
        DocumentReference document = db.collection(collection).document(obj.getId());
        if (document.get().get().exists()) {
            throw new IdAlreadyUsed();
        } else {
            if (!validateSubCollection1(obj)) {
                throw new ForeignIdNotExists("id_usuario");
            } else if (!validateSubCollection2(obj)) {
                throw new ForeignIdNotExists("id_endereco");
            } else {
                return document.set(obj).get().getUpdateTime().toString();
            }
        }
    }
    public String alterar(Locatario obj) throws IdNotFound, ForeignIdNotExists, ExecutionException, InterruptedException {
        DocumentReference document = db.collection(collection).document(obj.getId());
        if (document.get().get().exists()) {
            if (!validateSubCollection1(obj)) {
                throw new ForeignIdNotExists("id_usuario");
            } else if (!validateSubCollection2(obj)) {
                throw new ForeignIdNotExists("id_endereco");
            } else {
                return document.set(obj).get().getUpdateTime().toString();
            }
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
