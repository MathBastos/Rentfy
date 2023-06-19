package com.puc.project.rentify.repository;

import com.google.cloud.firestore.*;
import com.puc.project.rentify.model.Endereco;
import com.puc.project.rentify.model.JoinEndereco;
import com.puc.project.rentify.model.Exceptions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class EnderecoRepository extends BasicRepository{
    @Autowired
    private CidadeRepository cidadeRepository;
    private String collection = "enderecos";
    private String subCollection1 = "cidades";
    private String parentCollection1 = "imoveis";
    private String parentCollection2 = "locatarios";
    private String parentCollection3 = "locadoras";
    private String parentCollectionKey = "id_endereco";


    public EnderecoRepository() throws IOException {
        createFirestoreDb();
    }

    public JoinEndereco BuildJoinObj(Endereco obj) throws IdNotFound, ExecutionException, InterruptedException {
        return new JoinEndereco(obj, cidadeRepository.listar(obj.getId_cidade()));
    }

    public boolean validateSubCollection1(Endereco obj) throws ExecutionException, InterruptedException {
        return db.collection(subCollection1).document(obj.getId_cidade()).get().get().exists();
    }

    public boolean validateParentCollections(String id) throws ExecutionException, InterruptedException {
        return db.collection(parentCollection1).whereEqualTo(parentCollectionKey, id).get().get().isEmpty()
            && db.collection(parentCollection2).whereEqualTo(parentCollectionKey, id).get().get().isEmpty()
            && db.collection(parentCollection3).whereEqualTo(parentCollectionKey, id).get().get().isEmpty();
    }

    public Endereco listar(String id) throws IdNotFound, ExecutionException, InterruptedException {
        DocumentSnapshot document = db.collection(collection).document(id).get().get();
        if (document.exists()) {
            return document.toObject(Endereco.class);
        } else {
            throw new IdNotFound();
        }
    }

    public JoinEndereco listar_join(String id) throws IdNotFound, ExecutionException, InterruptedException {
        DocumentSnapshot document = db.collection(collection).document(id).get().get();
        if (document.exists()) {
            return BuildJoinObj(document.toObject(Endereco.class));
        } else {
            throw new IdNotFound();
        }
    }

    public List<Endereco> listar() throws ExecutionException, InterruptedException {
        List<QueryDocumentSnapshot> documents = db.collection(collection).get().get().getDocuments();
        List<Endereco> array = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            if (document.exists()) {
                array.add(document.toObject(Endereco.class));
            }
        }
        return array;
    }

    public List<JoinEndereco> listar_join() throws IdNotFound, ExecutionException, InterruptedException {
        List<QueryDocumentSnapshot> documents = db.collection(collection).get().get().getDocuments();
        List<JoinEndereco> array = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            if (document.exists()) {
                array.add(BuildJoinObj(document.toObject(Endereco.class)));
            }
        }
        return array;
    }

    public String adicionar(Endereco obj) throws IdAlreadyUsed, ForeignIdNotExists, ExecutionException, InterruptedException {
        DocumentReference document = db.collection(collection).document(obj.getId());
        if (document.get().get().exists()) {
            throw new IdAlreadyUsed();
        } else {
            if (!validateSubCollection1(obj)) {
                throw new ForeignIdNotExists("id_cidade");
            } else {
                return document.set(obj).get().getUpdateTime().toString();
            }
        }
    }
    public String alterar(Endereco obj) throws IdNotFound, ForeignIdNotExists, ExecutionException, InterruptedException {
        DocumentReference document = db.collection(collection).document(obj.getId());
        if (document.get().get().exists()) {
            if (!validateSubCollection1(obj)) {
                throw new ForeignIdNotExists("id_cidade");
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
