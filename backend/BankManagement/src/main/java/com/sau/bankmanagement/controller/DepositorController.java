package com.sau.bankmanagement.controller;

import com.sau.bankmanagement.dto.DepositorDTO;
import com.sau.bankmanagement.entity.Account;
import com.sau.bankmanagement.entity.Customer;
import com.sau.bankmanagement.entity.Depositor;
import com.sau.bankmanagement.repository.AccountRepository;
import com.sau.bankmanagement.repository.CustomerRepository;
import com.sau.bankmanagement.repository.DepositorRepository;
import com.sau.bankmanagement.service.ReportService;
import net.sf.jasperreports.engine.JRException;
import org.springframework.web.bind.annotation.*;
import java.io.FileNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/depositor")
@CrossOrigin(origins = "http://localhost:5173")
public class DepositorController {

    private final DepositorRepository depositorRepository;
    private final CustomerRepository customerRepository;
    private final AccountRepository accountRepository;
    private final ReportService reportService;

    public DepositorController(DepositorRepository depositorRepository,
                               CustomerRepository customerRepository,
                               AccountRepository accountRepository,
                               ReportService reportService) {
        this.depositorRepository = depositorRepository;
        this.customerRepository = customerRepository;
        this.accountRepository = accountRepository;
        this.reportService = reportService;
    }

    @GetMapping("/all")
    public List<Depositor> getAll() {
        return depositorRepository.findAll();
    }

    @PostMapping("/add")
    public Depositor assign(@RequestBody DepositorDTO dto) {
        // KRİTİK KONTROL: Bu hesap ID'si zaten bir müşteriye atanmış mı?
        if (depositorRepository.existsByAccountId(dto.getAccountId())) {
            throw new RuntimeException("Bu hesap zaten başka bir müşteriye tanımlanmış! Bir hesap sadece bir kişiye bağlanabilir.");
        }

        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Müşteri bulunamadı!"));

        Account account = accountRepository.findById(dto.getAccountId())
                .orElseThrow(() -> new RuntimeException("Hesap bulunamadı!"));

        Depositor depositor = new Depositor();
        depositor.setCustomer(customer);
        depositor.setAccount(account);

        return depositorRepository.save(depositor);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {
        if(!depositorRepository.existsById(id)) {
            throw new RuntimeException("Kayıt bulunamadı!");
        }
        depositorRepository.deleteById(id);
    }

    @GetMapping("/report/{format}")
    public String generateReport(@PathVariable String format) throws FileNotFoundException, JRException {
        return reportService.exportReport("depositors", format);
    }
}