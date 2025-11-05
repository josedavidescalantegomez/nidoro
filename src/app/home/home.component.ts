import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  totalBalance = 1000;
  recentTransactions = [
    { description: 'Compras supermercado', amount: -150, date: '2024-01-20' },
    { description: 'Servicios básicos', amount: -200, date: '2024-01-19' },
    { description: 'Ingreso mensual', amount: 2500, date: '2024-01-15' }
  ];
}