package com.sau.bankmanagement.controller;

import com.sau.bankmanagement.entity.Account;
import com.sau.bankmanagement.repository.AccountRepository;
import com.sau.bankmanagement.service.ReportService;
import net.sf.jasperreports.engine.JRException;
import org.springframework.web.bind.annotation.*;
import java.io.FileNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "http://localhost:5173")
public class AccountController {

    private final AccountRepository accountRepository;
    private final ReportService reportService;

    public AccountController(AccountRepository accountRepository, ReportService reportService) {
        this.accountRepository = accountRepository;
        this.reportService = reportService;
    }

    @GetMapping
    public List<Account> getAll() {
        return accountRepository.findAll();
    }

    @GetMapping("/{id}")
    public Account getById(@PathVariable int id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hesap bulunamadı! ID: " + id));
    }

    @PostMapping
    public Account save(@RequestBody Account account) {
        return accountRepository.save(account);
    }

    @PutMapping("/{id}")
    public Account update(@PathVariable int id, @RequestBody Account details) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hesap bulunamadı! ID: " + id));
        account.setAccountNumber(details.getAccountNumber());
        account.setBalance(details.getBalance());
        account.setBranchName(details.getBranchName());
        return accountRepository.save(account);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
        accountRepository.deleteById(id);
    }

    @GetMapping("/report/{format}")
    public String generateReport(@PathVariable String format) throws FileNotFoundException, JRException {
        return reportService.exportReport("accounts", format);
    }
}