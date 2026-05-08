package com.sau.bankmanagement.controller;

import com.sau.bankmanagement.entity.Customer;
import com.sau.bankmanagement.repository.CustomerRepository;
import com.sau.bankmanagement.service.FileService;
import com.sau.bankmanagement.service.ReportService;
import net.sf.jasperreports.engine.JRException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/customer")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    private final CustomerRepository repository;
    private final FileService fileService;
    private final ReportService reportService;

    public CustomerController(CustomerRepository repository, FileService fileService, ReportService reportService) {
        this.repository = repository;
        this.fileService = fileService;
        this.reportService = reportService;
    }

    @GetMapping("/all")
    public List<Customer> getAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Customer getById(@PathVariable int id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Müşteri bulunamadı! ID: " + id));
    }

    @PostMapping("/add")
    public Customer save(@ModelAttribute Customer customer,
                         @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            String fileName = fileService.saveFile(image);
            customer.setProfileImage(fileName);
        }
        return repository.save(customer);
    }

    @PutMapping("/update/{id}")
    public Customer update(@PathVariable int id, @ModelAttribute Customer details,
                           @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
        Customer customer = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Güncellenecek müşteri bulunamadı! ID: " + id));

        customer.setName(details.getName());
        customer.setCity(details.getCity());
        customer.setAddress(details.getAddress());

        if (image != null && !image.isEmpty()) {
            String fileName = fileService.saveFile(image);
            customer.setProfileImage(fileName);
        }
        return repository.save(customer);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {
        if(!repository.existsById(id)) throw new RuntimeException("Silinecek müşteri bulunamadı!");
        repository.deleteById(id);
    }

    @GetMapping("/report/{format}")
    public String generateReport(@PathVariable String format) throws FileNotFoundException, JRException {
        return reportService.exportReport("customers", format);
    }
}