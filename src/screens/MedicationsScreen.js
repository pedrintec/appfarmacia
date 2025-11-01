import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { Screen, SectionCard, Chip } from '../components/Layout';
import MedicationForm from '../components/MedicationForm';
import MedicationList from '../components/MedicationList';
import { useInventory } from '../hooks/InventoryContext';

const MedicationsScreen = () => {
  const { medications, addMedication, lowStock, expiringSoon } = useInventory();
  const [search, setSearch] = useState('');
  const [onlyLowStock, setOnlyLowStock] = useState(false);
  const [onlyExpiring, setOnlyExpiring] = useState(false);

  const handleSubmit = async (payload) => {
    try {
      await addMedication(payload);
      Alert.alert('Sucesso', 'Medicamento cadastrado com sucesso.');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  const filteredMedications = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return medications.filter((item) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.category?.toLowerCase().includes(normalizedSearch) ||
        item.manufacturer?.toLowerCase().includes(normalizedSearch) ||
        item.barcode?.toLowerCase().includes(normalizedSearch);

      const matchesLowStock = !onlyLowStock || lowStock.includes(item.id);
      const matchesExpiring = !onlyExpiring || expiringSoon.includes(item.id);

      return matchesSearch && matchesLowStock && matchesExpiring;
    });
  }, [medications, lowStock, expiringSoon, search, onlyLowStock, onlyExpiring]);

  return (
    <Screen
      title="Medicamentos"
      subtitle="Cadastre, pesquise e acompanhe o status dos itens do estoque"
    >
      <SectionCard title="Novo medicamento" description="Informe os dados para adicionar ao estoque">
        <MedicationForm onSubmit={handleSubmit} />
      </SectionCard>

      <SectionCard
        title="Medicamentos cadastrados"
        description="Use os filtros para localizar rapidamente os itens que precisa"
        right={
          <Text style={styles.counter}>
            {filteredMedications.length} / {medications.length}
          </Text>
        }
      >
        <View style={styles.filters}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome, categoria, fabricante ou código de barras"
            value={search}
            onChangeText={setSearch}
          />
          <View style={styles.chipsRow}>
            <Chip
              label="Somente baixo estoque"
              active={onlyLowStock}
              onPress={() => setOnlyLowStock((value) => !value)}
            />
            <Chip
              label="Somente vencendo"
              active={onlyExpiring}
              onPress={() => setOnlyExpiring((value) => !value)}
            />
            {(onlyLowStock || onlyExpiring || search) && (
              <Chip
                label="Limpar filtros"
                active={false}
                onPress={() => {
                  setSearch('');
                  setOnlyLowStock(false);
                  setOnlyExpiring(false);
                }}
              />
            )}
          </View>
        </View>

        <MedicationList
          data={filteredMedications}
          lowStock={lowStock}
          expiringSoon={expiringSoon}
          emptyDescription="Tente ajustar a busca ou adicionar um novo medicamento."
        />
      </SectionCard>
    </Screen>
  );
};

const styles = StyleSheet.create({
  filters: {
    marginBottom: 16
  },
  searchInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 15,
    color: '#1e293b'
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12
  },
  counter: {
    fontWeight: '700',
    color: '#2563eb'
  }
});

export default MedicationsScreen;
