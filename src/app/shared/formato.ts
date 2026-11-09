// Formato de números para Colombia: punto en miles y coma en decimales
function miles(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function pesos(n: number): string {
  return '$' + miles(n);
}

export function millones(n: number): string {
  const texto = Number.isInteger(n) ? n.toString() : n.toFixed(1).replace('.', ',');
  return '$' + texto + ' M';
}

export function kg(n: number): string {
  return miles(n) + ' kg';
}
