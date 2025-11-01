const escapeCell = (value) => {
  if (value === null || value === undefined) {
    return '';
  }
  const stringValue = String(value).replace(/"/g, '""');
  if (stringValue.search(/([",
])/g) >= 0) {
    return `"${stringValue}"`;
  }
  return stringValue;
};

const buildSection = (title, headers, rows) => {
  const headerRow = headers.map(escapeCell).join(',');
  const dataRows = rows.map((row) => headers.map((key) => escapeCell(row[key])).join(','));
  return [`# ${title}`, headerRow, ...dataRows].join('\n');
};

export const buildCsv = ({ medications, transactions }) => {
  const medicationRows = medications.map((item) => ({
    Nome: item.name,
    Categoria: item.category,
    Fabricante: item.manufacturer,
    Validade: item.expiryDate,
    Quantidade: item.quantity,
    Lote: item.lot,
    CodigoBarras: item.barcode
  }));

  const transactionRows = transactions.map((item) => ({
    Medicamento: item.medicationName,
    Tipo: item.type,
    Quantidade: item.quantity,
    Motivo: item.reason,
    DataHora: item.timestamp
  }));

  const medicationSection = buildSection('Medicamentos', Object.keys(medicationRows[0] || {
    Nome: '',
    Categoria: '',
    Fabricante: '',
    Validade: '',
    Quantidade: '',
    Lote: '',
    CodigoBarras: ''
  }), medicationRows);

  const transactionSection = buildSection('Movimentacoes', Object.keys(transactionRows[0] || {
    Medicamento: '',
    Tipo: '',
    Quantidade: '',
    Motivo: '',
    DataHora: ''
  }), transactionRows);

  return `${medicationSection}\n\n${transactionSection}`;
};
