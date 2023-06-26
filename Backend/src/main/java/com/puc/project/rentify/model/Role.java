package com.puc.project.rentify.model;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

public enum Role {
    USER,
    ADMIN;

    public static Role findByName(String name) {
        if (name == "ADMIN") {
            return Role.ADMIN;
        } else if (name == "USER") {
            return Role.USER;
        } else {
            return null;
        }
    }

    public static Boolean hasThisName(String name){
        if (name == "ADMIN" || name == "USER"){
            return true;
        } else {
            return false;
        }
    }

    public Boolean hasThisName(){
        if (this.name() == "ADMIN" || this.name() == "USER"){
            return true;
        } else {
            return false;
        }
    }

}

//{
//        "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzIiwiaWF0IjoxNjg3NzU1NDE2LCJleHAiOjE2ODc3NTY4NTZ9.xgj1rzPfsgJvozCqBjNJrM2hnNXJVhZG6r6QYbFwFlg",
//        "role": "User"
//        }

//{
//        "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhIiwiaWF0IjoxNjg3NzU1NDQzLCJleHAiOjE2ODc3NTY4ODN9._5GjbaHaxFx8jgcD66DfXEr80ErjOqqbV0tRds-s3Ww",
//        "role": "Admin"
//        }