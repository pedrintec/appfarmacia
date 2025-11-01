const fs = require('fs');
const path = require('path');
const vm = require('vm');

const filePath = path.join(__dirname, '..', 'src', 'utils', 'csvExport.js');
const source = fs.readFileSync(filePath, 'utf8');
const transformed = source.replace(/export\s+const\s+buildCsv/, 'const buildCsv');
const context = { console, module: { exports: {} }, exports: {} };
vm.createContext(context);
vm.runInContext(`${transformed}\nmodule.exports = { buildCsv };`, context, { filename: 'csvExport.js' });
const { buildCsv } = context.module.exports;

const sampleData = {
  medications: [
    {
      name: 'Paracetamol',
      category: 'Analgésico',
      manufacturer: 'FarmCo',
      expiryDate: '2024-12-31',
      quantity: 5,
      lot: 'L123',
      barcode: '7891234567890'
    }
  ],
  transactions: [
    {
      medicationName: 'Paracetamol',
      type: 'Saída',
      quantity: 2,
      reason: 'Venda',
      timestamp: '2024-05-22 10:30'
    }
  ]
};

const output = buildCsv(sampleData);

const expected = [
  '# Medicamentos',
  'Nome,Categoria,Fabricante,Validade,Quantidade,Lote,CodigoBarras',
  'Paracetamol,Analgésico,FarmCo,2024-12-31,5,L123,7891234567890',
  '',
  '# Movimentacoes',
  'Medicamento,Tipo,Quantidade,Motivo,DataHora',
  'Paracetamol,Saída,2,Venda,2024-05-22 10:30'
].join('\n');

if (output !== expected) {
  console.error('CSV output did not match expected value.');
  console.error('Expected:\n', expected);
  console.error('Received:\n', output);
  process.exit(1);
}

console.log('csvExport buildCsv test passed.');
