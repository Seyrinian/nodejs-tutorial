import { add } from 'mathjs';
import chalk from 'chalk';

const a = 2;
const b = 3;

const result = add(a, b);

console.log(chalk.green(`La somme de ${a} et ${b} est ${result}`));
