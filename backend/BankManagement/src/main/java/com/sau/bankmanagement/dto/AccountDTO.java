package com.sau.bankmanagement.dto;

public class AccountDTO {

    private int id;
    private String accountNumber;
    private double balance; // Bakiye
    private String branchName; // Şube Adı

    public AccountDTO() {
    }

    public AccountDTO(int id, String accountNumber, double balance, String branchName) {
        this.id = id;
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.branchName = branchName;
    }

    // --- Getter ve Setter Metotları ---

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }
}