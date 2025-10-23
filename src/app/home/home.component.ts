import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule, 
    CurrencyPipe,
    DatePipe
  ]
})
export class HomeComponent {
  totalBalance = 1000;
  recentTransactions = [
    { description: 'Compras supermercado', amount: -150, date: '2024-01-20' },
    { description: 'Servicios básicos', amount: -200, date: '2024-01-19' },
    { description: 'Ingreso mensual', amount: 2500, date: '2024-01-15' }
  ];
}