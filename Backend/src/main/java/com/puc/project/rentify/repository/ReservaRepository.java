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
public class ReservaRepository extends BasicRepository{
    @Autowired
    private ImovelRepository imovelRepository;
    @Autowired
    private LocatarioRepository locatarioRepository;
    private String collection = "reservas";
    private String subCollection1 = "imoveis";
    private String subCollection2 = "locatarios";

    public ReservaRepository() throws IOException {
        createFirestoreDb();
    }

    public JoinReserva BuildJoinObj(Reserva obj) throws IdNotFound, ExecutionException, InterruptedException {
        return new JoinReserva(obj, imovelRepository.listar_join(obj.getId_imovel()), locatarioRepository.listar_join(obj.getId_locatario()));
    }

    public boolean validateSubCollection1(Reserva obj) throws ExecutionException, InterruptedException {
        return db.collection(subCollection1).document(obj.getId_imovel()).get().get().exists();
    }

    public boolean validateSubCollection2(Reserva obj) throws ExecutionException, InterruptedException {
        return db.collection(subCollection2).document(obj.getId_locatario()).get().get().exists();
    }

    public Reserva listar(String id) throws IdNotFound, ExecutionException, InterruptedException {
        DocumentSnapshot document = db.collection(collection).document(id).get().get();
        if (document.exists()) {
            return document.toObject(Reserva.class);
        } else {
            throw new IdNotFound();
        }
    }

    public JoinReserva listar_join(String id) throws IdNotFound, ExecutionException, InterruptedException {
        DocumentSnapshot document = db.collection(collection).document(id).get().get();
        if (document.exists()) {
            return BuildJoinObj(document.toObject(Reserva.class));
        } else {
            throw new IdNotFound();
        }
    }

    public List<Reserva> listar() throws ExecutionException, InterruptedException {
        List<QueryDocumentSnapshot> documents = db.collection(collection).get().get().getDocuments();
        List<Reserva> array = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            if (document.exists()) {
                array.add(document.toObject(Reserva.class));
            }
        }
        return array;
    }

    public List<JoinReserva> listar_join() throws IdNotFound, ExecutionException, InterruptedException {
        List<QueryDocumentSnapshot> documents = db.collection(collection).get().get().getDocuments();
        List<JoinReserva> array = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            if (document.exists()) {
                array.add(BuildJoinObj(document.toObject(Reserva.class)));
            }
        }
        return array;
    }

    public String adicionar(Reserva obj) throws IdAlreadyUsed, ForeignIdNotExists, ExecutionException, InterruptedException {
        DocumentReference document = db.collection(collection).document(obj.getId());
        if (document.get().get().exists()) {
            throw new IdAlreadyUsed();
        } else {
            if (!validateSubCollection1(obj)) {
                throw new ForeignIdNotExists("id_imovel");
            } else if (!validateSubCollection2(obj)) {
                throw new ForeignIdNotExists("id_locatario");
            } else {
                return document.set(obj).get().getUpdateTime().toString();
            }
        }
    }
    public String alterar(Reserva obj) throws IdNotFound, ForeignIdNotExists, ExecutionException, InterruptedException {
        DocumentReference document = db.collection(collection).document(obj.getId());
        if (document.get().get().exists()) {
            if (!validateSubCollection1(obj)) {
                throw new ForeignIdNotExists("id_imovel");
            } else if (!validateSubCollection2(obj)) {
                throw new ForeignIdNotExists("id_locatario");
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
            return document.delete().get().getUpdateTime().toString();
        } else {
            throw new IdNotFound();
        }
    }
}
