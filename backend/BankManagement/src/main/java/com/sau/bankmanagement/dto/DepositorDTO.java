package com.sau.bankmanagement.dto;

public class DepositorDTO {

    private int customerId;
    private int accountId;

    private String creationDate;

    public DepositorDTO() {
    }

    public DepositorDTO(int customerId, int accountId, String creationDate) {
        this.customerId = customerId;
        this.accountId = accountId;
        this.creationDate = creationDate;
    }

    // --- Getter ve Setter Metotları ---

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public int getAccountId() {
        return accountId;
    }

    public void setAccountId(int accountId) {
        this.accountId = accountId;
    }

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }
}