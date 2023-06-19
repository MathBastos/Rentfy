package com.puc.project.rentify.repository;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.puc.project.rentify.model.*;
import com.puc.project.rentify.model.Exceptions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class ImovelRepository extends BasicRepository{
    @Autowired
    private LocadoraRepository locadoraRepository;
    @Autowired
    private EspecificacaoRepository especificacaoRepository;
    @Autowired
    private EnderecoRepository enderecoRepository;
    private String collection = "imoveis";
    private String subCollection1 = "locadoras";
    private String subCollection2 = "especificacoes";
    private String subCollection3 = "enderecos";
    private String parentCollection1 = "reservas";
    private String parentCollectionKey = "id_imovel";

    public ImovelRepository() throws IOException {
        createFirestoreDb();
    }

    public JoinImovel BuildJoinObj(Imovel obj) throws IdNotFound, ExecutionException, InterruptedException {
       return new JoinImovel(obj, locadoraRepository.listar_join(obj.getId_locadora()), especificacaoRepository.listar(obj.getId_especificacao()), enderecoRepository.listar_join(obj.getId_endereco()));
    }

    public boolean validateSubCollection1(Imovel obj) throws ExecutionException, InterruptedException {
        return db.collection(subCollection1).document(obj.getId_locadora()).get().get().exists();
    }

    public boolean validateSubCollection2(Imovel obj) throws ExecutionException, InterruptedException {
        return db.collection(subCollection2).document(obj.getId_especificacao()).get().get().exists();
    }

    public boolean validateSubCollection3(Imovel obj) throws ExecutionException, InterruptedException {
        return db.collection(subCollection3).document(obj.getId_endereco()).get().get().exists();
    }

    public boolean validateParentCollections(String id) throws ExecutionException, InterruptedException {
        return db.collection(parentCollection1).whereEqualTo(parentCollectionKey, id).get().get().isEmpty();
    }

    public Imovel listar(String id) throws IdNotFound, ExecutionException, InterruptedException {
        DocumentSnapshot document = db.collection(collection).document(id).get().get();
        if (document.exists()) {
            return document.toObject(Imovel.class);
        } else {
            throw new IdNotFound();
        }
    }

    public JoinImovel listar_join(String id) throws IdNotFound, ExecutionException, InterruptedException {
        DocumentSnapshot document = db.collection(collection).document(id).get().get();
        if (document.exists()) {
            return BuildJoinObj(document.toObject(Imovel.class));
        } else {
            throw new IdNotFound();
        }
    }

    public List<Imovel> listar() throws ExecutionException, InterruptedException {
        List<QueryDocumentSnapshot> documents = db.collection(collection).get().get().getDocuments();
        List<Imovel> array = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            if (document.exists()) {
                array.add(document.toObject(Imovel.class));
            }
        }
        return array;
    }

    public List<JoinImovel> listar_join() throws IdNotFound, ExecutionException, InterruptedException {
        List<QueryDocumentSnapshot> documents = db.collection(collection).get().get().getDocuments();
        List<JoinImovel> array = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            if (document.exists()) {
                array.add(BuildJoinObj(document.toObject(Imovel.class)));
            }
        }
        return array;
    }

    public String adicionar(Imovel obj) throws IdAlreadyUsed, ForeignIdNotExists, ExecutionException, InterruptedException {
        DocumentReference document = db.collection(collection).document(obj.getId());
        if (document.get().get().exists()) {
            throw new IdAlreadyUsed();
        } else {
            if (!validateSubCollection1(obj)) {
                throw new ForeignIdNotExists("id_locadora");
            } else if (!validateSubCollection2(obj)) {
                throw new ForeignIdNotExists("id_especificao");
            } else if (!validateSubCollection3(obj)) {
                throw new ForeignIdNotExists("id_endereco");
            } else {
                return document.set(obj).get().getUpdateTime().toString();
            }
        }
    }

    public String alterar(Imovel obj) throws IdNotFound, ForeignIdNotExists, ExecutionException, InterruptedException {
        DocumentReference document = db.collection(collection).document(obj.getId());
        if (document.get().get().exists()) {
            if (!validateSubCollection1(obj)) {
                throw new ForeignIdNotExists("id_locadora");
            } else if (!validateSubCollection2(obj)) {
                throw new ForeignIdNotExists("id_especificao");
            } else if (!validateSubCollection3(obj)) {
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
