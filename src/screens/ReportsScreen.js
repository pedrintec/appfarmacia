import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Screen, SectionCard, InfoCard } from '../components/Layout';
import { useInventory } from '../hooks/InventoryContext';
import TransactionList from '../components/TransactionList';

const ReportsScreen = () => {
  const { getTransactionsForPeriod, exportCsv } = useInventory();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!startDate || !endDate) {
      alert('Informe a data inicial e final no formato YYYY-MM-DD.');
      return;
    }

    setLoading(true);
    try {
      const data = await getTransactionsForPeriod(startDate, endDate);
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  const totals = useMemo(() => {
    const entries = items.filter((item) => item.type === 'entrada');
    const exits = items.filter((item) => item.type === 'saida');

    const entryQty = entries.reduce((acc, item) => acc + item.quantity, 0);
    const exitQty = exits.reduce((acc, item) => acc + item.quantity, 0);

    return {
      entryQty,
      exitQty,
      net: entryQty - exitQty
    };
  }, [items]);

  return (
    <Screen
      title="Relatórios"
      subtitle="Gere relatórios personalizados por período e exporte os dados"
      actions={[{ label: 'Exportar CSV', icon: 'download-outline', onPress: exportCsv }]}
    >
      <SectionCard
        title="Período de análise"
        description="Informe o intervalo desejado no formato AAAA-MM-DD"
      >
        <View style={styles.dateRow}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Data inicial</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={startDate}
              onChangeText={setStartDate}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Data final</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={endDate}
              onChangeText={setEndDate}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleGenerate}>
          <Text style={styles.buttonText}>{loading ? 'Gerando...' : 'Gerar relatório'}</Text>
        </TouchableOpacity>
      </SectionCard>

      <SectionCard
        title="Resumo do período"
        description="Totais calculados considerando as movimentações filtradas"
      >
        <View style={styles.statsRow}>
          <InfoCard icon="arrow-down-circle" title="Entradas" value={totals.entryQty} tone="success" />
          <InfoCard icon="arrow-up-circle" title="Saídas" value={totals.exitQty} tone="danger" />
          <InfoCard
            icon={totals.net >= 0 ? 'trending-up-outline' : 'trending-down-outline'}
            title="Saldo"
            value={totals.net}
            tone={totals.net >= 0 ? 'secondary' : 'danger'}
          />
        </View>
      </SectionCard>

      <SectionCard
        title="Movimentações filtradas"
        description="Todas as movimentações do período selecionado"
      >
        <TransactionList
          data={items}
          emptyTitle="Nenhum registro para o período"
          emptyDescription="Ajuste as datas ou registre novas movimentações para gerar o relatório."
        />
      </SectionCard>
    </Screen>
  );
};

const styles = StyleSheet.create({
  dateRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6
  },
  inputGroup: {
    flex: 1,
    minWidth: 150,
    marginHorizontal: 6,
    marginBottom: 12
  },
  label: {
    color: '#0f172a',
    fontWeight: '600',
    marginBottom: 6
  },
  input: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 15,
    color: '#1e293b'
  },
  button: {
    marginTop: 16,
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6
  }
});

export default ReportsScreen;
