package com.sau.bankmanagement.dto;

public class DepositorDTO {

    private int customerId;
    private int accountId;

    public DepositorDTO() {
    }

    public DepositorDTO(int customerId, int accountId) {
        this.customerId = customerId;
        this.accountId = accountId;
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
}