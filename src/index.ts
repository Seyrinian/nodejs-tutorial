function add(a: number, b: number): number {
  return a + b;
}

console.log(add(2, 'three')); // Erreur détectée à la compilation
console.log(add(2, 3)); // 5
