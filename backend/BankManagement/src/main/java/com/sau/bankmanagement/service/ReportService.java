package com.sau.bankmanagement.service;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import com.sau.bankmanagement.repository.CustomerRepository;
import com.sau.bankmanagement.repository.AccountRepository;
import com.sau.bankmanagement.repository.DepositorRepository;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    private final CustomerRepository customerRepository;
    private final AccountRepository accountRepository;
    private final DepositorRepository depositorRepository;

    public ReportService(CustomerRepository customerRepository,
                         AccountRepository accountRepository,
                         DepositorRepository depositorRepository) {
        this.customerRepository = customerRepository;
        this.accountRepository = accountRepository;
        this.depositorRepository = depositorRepository;
    }

    public String exportReport(String reportType, String format) throws FileNotFoundException, JRException {
        String userHome = System.getProperty("user.home");
        String path = userHome + "\\Desktop";

        List<?> dataList;
        String jrxmlFile;
        String outputName;

        // Hangi raporun oluşturulacağına karar veriyoruz
        switch (reportType.toLowerCase()) {
            case "accounts":
                dataList = accountRepository.findAll();
                jrxmlFile = "classpath:accounts.jrxml";
                outputName = "\\accounts_report.pdf";
                break;
            case "depositors":
                dataList = depositorRepository.findAll();
                jrxmlFile = "classpath:depositors.jrxml";
                outputName = "\\depositors_report.pdf";
                break;
            default: // customer raporu
                dataList = customerRepository.findAll();
                jrxmlFile = "classpath:customers.jrxml";
                outputName = "\\customers_report.pdf";
                break;
        }

        File file = ResourceUtils.getFile(jrxmlFile);
        JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(dataList);

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("createdBy", "Burak Ozyurt");

        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

        if (format.equalsIgnoreCase("pdf")) {
            JasperExportManager.exportReportToPdfFile(jasperPrint, path + outputName);
        }

        return reportType + " raporu masaüstüne oluşturuldu!";
    }
}