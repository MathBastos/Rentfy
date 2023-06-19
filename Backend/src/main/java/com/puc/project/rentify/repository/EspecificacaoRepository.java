package com.puc.project.rentify.repository;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.puc.project.rentify.model.Especificacao;
import com.puc.project.rentify.model.Exceptions.*;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class EspecificacaoRepository extends BasicRepository{
    private String collection = "especificacoes";
    private String parentCollection1 = "imoveis";
    private String parentCollectionKey = "id_especificao";


    public EspecificacaoRepository() throws IOException {
        createFirestoreDb();
    }

    public boolean validateParentCollections(String id) throws ExecutionException, InterruptedException {
        return db.collection(parentCollection1).whereEqualTo(parentCollectionKey, id).get().get().isEmpty();
    }

    public Especificacao listar(String id) throws IdNotFound, ExecutionException, InterruptedException {
        DocumentSnapshot document = db.collection(collection).document(id).get().get();
        if (document.exists()) {
            return document.toObject(Especificacao.class);
        } else {
            throw new IdNotFound();
        }
    }

    public List<Especificacao> listar() throws ExecutionException, InterruptedException {
        List<QueryDocumentSnapshot> documents = db.collection(collection).get().get().getDocuments();
        List<Especificacao> array = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            if (document.exists()) {
                array.add(document.toObject(Especificacao.class));
            }
        }
        return array;
    }

    public String adicionar(Especificacao obj) throws IdAlreadyUsed, ExecutionException, InterruptedException {
        DocumentReference document = db.collection(collection).document(obj.getId());
        if (document.get().get().exists()) {
            throw new IdAlreadyUsed();
        } else {
            return document.set(obj).get().getUpdateTime().toString();
        }
    }

    public String alterar(Especificacao obj) throws IdNotFound, ExecutionException, InterruptedException {
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
