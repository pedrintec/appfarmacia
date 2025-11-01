import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Screen, SectionCard, InfoCard, EmptyState } from '../components/Layout';
import TransactionList from '../components/TransactionList';
import { useInventory } from '../hooks/InventoryContext';

const DashboardScreen = () => {
  const { medications, transactions, lowStock, expiringSoon, loading } = useInventory();

  const summary = useMemo(() => {
    const entries = transactions.filter((item) => item.type === 'entrada');
    const exits = transactions.filter((item) => item.type === 'saida');

    const entryQty = entries.reduce((acc, item) => acc + item.quantity, 0);
    const exitQty = exits.reduce((acc, item) => acc + item.quantity, 0);
    const totalStock = medications.reduce((acc, item) => acc + item.quantity, 0);

    return {
      totalMedications: medications.length,
      totalStock,
      entries: entryQty,
      exits: exitQty
    };
  }, [medications, transactions]);

  const lowStockItems = useMemo(
    () => medications.filter((item) => lowStock.includes(item.id)).slice(0, 3),
    [medications, lowStock]
  );

  const expiringSoonItems = useMemo(
    () => medications.filter((item) => expiringSoon.includes(item.id)).slice(0, 3),
    [medications, expiringSoon]
  );

  const recentTransactions = useMemo(() => transactions.slice(0, 5), [transactions]);

  return (
    <Screen
      title="Painel de controle"
      subtitle="Acompanhe indicadores, alertas e as últimas movimentações do estoque"
    >
      <SectionCard title="Indicadores" description="Resumo em tempo real do estoque">
        {loading ? (
          <Text style={styles.loading}>Carregando dados...</Text>
        ) : (
          <View style={styles.statsGrid}>
            <InfoCard
              icon="medkit-outline"
              title="Medicamentos"
              value={summary.totalMedications}
              tone="primary"
            />
            <InfoCard
              icon="cube-outline"
              title="Itens em estoque"
              value={summary.totalStock}
              tone="secondary"
            />
            <InfoCard
              icon="arrow-down-circle"
              title="Entradas"
              value={summary.entries}
              tone="success"
            />
            <InfoCard
              icon="arrow-up-circle"
              title="Saídas"
              value={summary.exits}
              tone="danger"
            />
          </View>
        )}
      </SectionCard>

      <SectionCard
        title="Alertas"
        description="Medicamentos que exigem atenção imediata"
      >
        <View style={styles.alertRow}>
          <View style={styles.alertColumn}>
            <Text style={styles.alertTitle}>Baixo estoque</Text>
            {lowStockItems.length === 0 ? (
              <EmptyState
                title="Tudo em ordem"
                description="Nenhum medicamento abaixo de 10 unidades."
                icon="shield-checkmark-outline"
              />
            ) : (
              lowStockItems.map((item) => (
                <View key={item.id} style={styles.alertCard}>
                  <Text style={styles.alertName}>{item.name}</Text>
                  <Text style={styles.alertMeta}>Quantidade atual: {item.quantity}</Text>
                </View>
              ))
            )}
          </View>
          <View style={styles.alertColumn}>
            <Text style={styles.alertTitle}>Vencimento próximo</Text>
            {expiringSoonItems.length === 0 ? (
              <EmptyState
                title="Sem vencimentos próximos"
                description="Nenhum medicamento vence nos próximos 30 dias."
                icon="calendar-clear-outline"
              />
            ) : (
              expiringSoonItems.map((item) => (
                <View key={item.id} style={styles.alertCard}>
                  <Text style={styles.alertName}>{item.name}</Text>
                  <Text style={styles.alertMeta}>Validade: {item.expiryDate || '—'}</Text>
                </View>
              ))
            )}
          </View>
        </View>
      </SectionCard>

      <SectionCard
        title="Últimas movimentações"
        description="Histórico das cinco movimentações mais recentes"
      >
        <TransactionList
          data={recentTransactions}
          emptyTitle="Sem movimentações ainda"
          emptyDescription="Registre uma entrada ou saída para começar a acompanhar o histórico."
        />
      </SectionCard>
    </Screen>
  );
};

const styles = StyleSheet.create({
  loading: {
    textAlign: 'center',
    color: '#475569',
    fontSize: 16,
    paddingVertical: 16
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6
  },
  alertRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8
  },
  alertColumn: {
    flex: 1,
    minWidth: 160,
    paddingHorizontal: 8
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12
  },
  alertCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  alertName: {
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4
  },
  alertMeta: {
    color: '#475569'
  }
});

export default DashboardScreen;
