package com.sau.bankmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "depositor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Depositor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // Bir müşterinin (Customer) birden fazla Depositor kaydı olabilir
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    // Bir hesabın (Account) birden fazla Depositor kaydı olabilir
    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    private String creationDate;
}