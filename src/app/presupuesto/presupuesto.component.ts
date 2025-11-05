import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PresupuestoService, Presupuesto } from '../services/presupuesto.service';

@Component({
  selector: 'app-presupuesto',
  standalone: false,
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.scss']
})
export class PresupuestoComponent implements OnInit {
  presupuestoForm!: FormGroup;
  dataSource: Presupuesto[] = [];
  categorias: string[] = ['Alimentación', 'Transporte', 'Vivienda', 'Entretenimiento', 'Salud', 'Otros'];
  meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  displayedColumns: string[] = ['category', 'description', 'amount', 'month', 'acciones'];
  filtroCategoria: string = '';
  filtroMes: string = '';
  modoEdicion: boolean = false;
  idEditando: string | null = null;

  constructor(private fb: FormBuilder, private presupuestoService: PresupuestoService) {}

  ngOnInit(): void {
    this.presupuestoForm = this.fb.group({
      category: [''],
      description: [''],
      amount: [0],
      month: ['']
    });

    this.obtenerPresupuestos();
  }

  obtenerPresupuestos(): void {
    this.presupuestoService.getPresupuestos().subscribe({
      next: (data) => this.dataSource = data,
      error: (err) => console.error('Error al obtener presupuestos:', err)
    });
  }

  guardar(): void {
    const presupuesto = this.presupuestoForm.value;

    if (this.modoEdicion && this.idEditando) {
      // 🔁 Actualizar
      this.presupuestoService.updatePresupuesto(this.idEditando, presupuesto).subscribe({
        next: (res) => {
          const index = this.dataSource.findIndex(p => p.id === res.id);
          if (index !== -1) this.dataSource[index] = res;
          this.cancelarEdicion();
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      // ➕ Crear
      this.presupuestoService.createPresupuesto(presupuesto).subscribe({
        next: (res) => {
          this.dataSource.push(res);
          this.presupuestoForm.reset();
        },
        error: (err) => console.error('Error al agregar:', err)
      });
    }
  }

  editar(element: Presupuesto): void {
    this.presupuestoForm.patchValue(element);
    this.idEditando = element.id!;
    this.modoEdicion = true;
  }

  cancelarEdicion(): void {
    this.presupuestoForm.reset();
    this.modoEdicion = false;
    this.idEditando = null;
  }

  eliminar(id: string): void {
    this.presupuestoService.deletePresupuesto(id).subscribe({
      next: () => {
        this.dataSource = this.dataSource.filter(item => item.id !== id);
      },
      error: (err) => console.error('Error al eliminar:', err)
    });
  }

  filtrarPorCategoria(): Presupuesto[] {
    return this.dataSource.filter(item =>
      (!this.filtroCategoria || item.categoria === this.filtroCategoria) &&
      (!this.filtroMes || item.mes === this.filtroMes)
    );
  }

  get totalFiltrado(): number {
    return this.filtrarPorCategoria().reduce((sum, item) => sum + item.monto, 0);
  }
}
