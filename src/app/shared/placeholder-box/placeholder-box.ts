import { Component, input } from '@angular/core';

@Component({
  selector: 'app-placeholder-box',
  templateUrl: './placeholder-box.html'
})
export class PlaceholderBox {
  texto = input<string>('');
  alto = input<number>(120);
  icono = input<string>('bi-image');
}
