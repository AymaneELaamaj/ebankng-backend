import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-account-bycustomer',
  templateUrl: './account-bycustomer.component.html',
  styleUrl: './account-bycustomer.component.css'
})
export class AccountBycustomerComponent implements OnInit {
  accounts: any[] = [];
  customerId!: number;

  constructor(
    private route: ActivatedRoute,
    private bankAccountService: ServiceService
  ) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['customerId'];
    this.getAccounts();
  }

  getAccounts(): void {
    console.log('Fetching accounts for ID:', this.customerId);
    this.bankAccountService.accbycust(this.customerId).subscribe(
      (data) => {
        this.accounts = data;
        console.log('Accounts data:', data);
      },
      (error) => {
        console.error('Error fetching accounts', error);
      }
    );
  }


}
