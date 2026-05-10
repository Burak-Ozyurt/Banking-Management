package com.sau.bankmanagement.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDate;

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

    // Bir müşterinin birden fazla Depositor kaydı olabilir
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    // Bir hesabın birden fazla Depositor kaydı olabilir
    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    // Veritabanına kayıt eklendiğinde o anki tarihi otomatik alır ve sonrasında güncellenmez
    @CreationTimestamp
    @Column(name = "creation_date", updatable = false)
    private LocalDate creationDate;
}