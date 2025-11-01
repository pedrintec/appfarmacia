import React, { useMemo } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Screen, SectionCard, InfoCard } from '../components/Layout';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { useInventory } from '../hooks/InventoryContext';

const MovementsScreen = () => {
  const { medications, transactions, recordMovement } = useInventory();

  const handleSubmit = async (movement) => {
    try {
      await recordMovement(movement);
      Alert.alert('Sucesso', 'Movimentação registrada.');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const stats = useMemo(() => {
    const entries = transactions.filter((item) => item.type === 'entrada');
    const exits = transactions.filter((item) => item.type === 'saida');

    const entryQty = entries.reduce((acc, item) => acc + item.quantity, 0);
    const exitQty = exits.reduce((acc, item) => acc + item.quantity, 0);

    return {
      entries: entryQty,
      exits: exitQty,
      balance: entryQty - exitQty
    };
  }, [transactions]);

  return (
    <Screen
      title="Movimentações"
      subtitle="Registre entradas e saídas e acompanhe o fluxo do estoque"
    >
      <SectionCard
        title="Nova movimentação"
        description="Informe o medicamento, o tipo de movimento e os detalhes"
      >
        <TransactionForm medications={medications} onSubmit={handleSubmit} />
      </SectionCard>

      <SectionCard title="Resumo" description="Totais acumulados considerando todas as movimentações">
        <View style={styles.statsRow}>
          <InfoCard icon="arrow-down-circle" title="Entradas" value={stats.entries} tone="success" />
          <InfoCard icon="arrow-up-circle" title="Saídas" value={stats.exits} tone="danger" />
          <InfoCard
            icon={stats.balance >= 0 ? 'trending-up-outline' : 'trending-down-outline'}
            title="Saldo"
            value={stats.balance}
            tone={stats.balance >= 0 ? 'secondary' : 'danger'}
          />
        </View>
      </SectionCard>

      <SectionCard
        title="Histórico completo"
        description="Todas as movimentações ordenadas da mais recente para a mais antiga"
      >
        <TransactionList
          data={transactions}
          emptyDescription="Nenhuma movimentação registrada até o momento."
        />
      </SectionCard>
    </Screen>
  );
};

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6
  }
});

export default MovementsScreen;
