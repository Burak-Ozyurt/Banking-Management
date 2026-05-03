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
@RequestMapping("/api/depositors")
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

    @GetMapping
    public List<Depositor> getAll() {
        return depositorRepository.findAll();
    }

    @GetMapping("/customer/{customerId}")
    public List<Depositor> getByCustomer(@PathVariable int customerId) {
        return depositorRepository.findByCustomerId(customerId);
    }

    @PostMapping
    public Depositor assign(@RequestBody DepositorDTO dto) {
        Customer customer = customerRepository.findById(dto.getCustomerId())
                .orElseThrow(() -> new RuntimeException("İlişkilendirilecek müşteri bulunamadı!"));

        Account account = accountRepository.findById(dto.getAccountId())
                .orElseThrow(() -> new RuntimeException("İlişkilendirilecek hesap bulunamadı!"));

        Depositor depositor = new Depositor();
        depositor.setCustomer(customer);
        depositor.setAccount(account);
        depositor.setCreationDate(dto.getCreationDate());

        return depositorRepository.save(depositor);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        if(!depositorRepository.existsById(id)) {
            throw new RuntimeException("Silinecek ilişki kaydı bulunamadı!");
        }
        depositorRepository.deleteById(id);
    }

    @GetMapping("/report/{format}")
    public String generateReport(@PathVariable String format) throws FileNotFoundException, JRException {
        return reportService.exportReport("depositors", format);
    }
}