//quickType

export interface accountdetails {

  accountOperationDTOS: AccountOperationDTO[];
  balance:              number;
  totalPages:           number;
  accountId:            string;
  currentPage:          number;
  pageSize:             number;
}

export interface AccountOperationDTO {
  id:            number;
  operationDate: Date;
  amount:        number;
  type:          string;
  description:   string;
}

