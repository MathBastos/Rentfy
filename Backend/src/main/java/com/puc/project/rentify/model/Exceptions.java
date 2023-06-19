package com.puc.project.rentify.model;

public class Exceptions {
    public static class IdNotFound extends Exception {
        public IdNotFound() {
            super("Id informado não existe.");
        }
    }
    public static class FieldEmpty extends Exception {
        public FieldEmpty(String field) {
            super("Campo obrigatório '" + field + "' não preenchido.");
        }
    }
    public static class IdAlreadyUsed extends Exception {
        public IdAlreadyUsed() {
            super("ID informado já em uso.");
        }
    }
    public static class IdInForeignObject extends Exception {
        public IdInForeignObject() {
            super("ID atual sendo utilizado em um ou mais objeto(s) estrangeiro(s).");
        }
    }
    public static class ForeignIdNotExists extends Exception {
        public ForeignIdNotExists(String field) {
            super("ID informado no campo '" + field + "' não existe.");
        }
    }
    public static class UsernameAlreadyUsed extends Exception {
        public UsernameAlreadyUsed() {
            super("Usuário informado já em uso.");
        }
    }
}
