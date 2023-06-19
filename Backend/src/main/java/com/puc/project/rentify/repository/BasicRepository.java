package com.puc.project.rentify.repository;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.FirestoreOptions;
import com.puc.project.rentify.RentifyApplication;
import org.springframework.stereotype.Repository;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Objects;

@Repository
public class BasicRepository {
    Firestore db;

    public void createFirestoreDb() throws IOException {
        File file = new File(Objects.requireNonNull(RentifyApplication.class.getClassLoader().getResource("serviceAccountKey.json")).getFile());
        FileInputStream serviceAccount = new FileInputStream(file.getAbsolutePath());

        db = FirestoreOptions.getDefaultInstance().toBuilder()
                .setProjectId("puc-project-rentify")
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build().getService();
    }
}
