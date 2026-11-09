import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FincaService {
  readonly nombre = 'Finca La Esperanza';
  readonly ciclo = '2026-A';
  readonly hectareas = 12;
}
