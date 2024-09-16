package org.sid.ebankingbackend.dtos;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import org.sid.ebankingbackend.entities.BankAccount;
import org.sid.ebankingbackend.enums.OperationType;

import java.util.Date;
import java.util.List;

@Data
public class AccountHistoryDTO {
    private String AccountId;
    private double Balance;
    @Enumerated(EnumType.STRING)
    private OperationType type;
    private int CurrentPage;
    private int PageSize;
    private int TotalPages;
    private List<AccountOperationDTO> accountOperationDTOS;


}
