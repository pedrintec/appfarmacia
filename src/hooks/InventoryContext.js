import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { initDatabase, fetchMedications, insertMedication, fetchTransactions, insertTransaction, updateMedicationQuantity, fetchTransactionsByPeriod } from '../database/db';
import { buildCsv } from '../utils/csvExport';

const InventoryContext = createContext(null);

export const InventoryProvider = ({ children }) => {
  const [medications, setMedications] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMedications = useCallback(async () => {
    const items = await fetchMedications();
    setMedications(items);
  }, []);

  const loadTransactions = useCallback(async () => {
    const items = await fetchTransactions();
    setTransactions(items);
  }, []);

  const refresh = useCallback(async () => {
    await Promise.all([loadMedications(), loadTransactions()]);
  }, [loadMedications, loadTransactions]);

  useEffect(() => {
    (async () => {
      await initDatabase();
      await refresh();
      setLoading(false);
    })();
  }, [refresh]);

  const addMedication = useCallback(async (payload) => {
    await insertMedication(payload);
    await loadMedications();
  }, [loadMedications]);

  const recordMovement = useCallback(async ({ medicationId, type, quantity, reason, timestamp }) => {
    const selectedMedication = medications.find((med) => med.id === medicationId);
    if (!selectedMedication) {
      Alert.alert('Erro', 'Medicamento não encontrado.');
      return;
    }

    const updatedQuantity = type === 'entrada'
      ? selectedMedication.quantity + quantity
      : selectedMedication.quantity - quantity;

    if (updatedQuantity < 0) {
      Alert.alert('Estoque insuficiente', 'Não é possível remover mais unidades do que o disponível.');
      return;
    }

    await updateMedicationQuantity(medicationId, updatedQuantity);
    await insertTransaction({ medicationId, type, quantity, reason, timestamp });
    await refresh();
  }, [medications, refresh]);

  const expiringSoon = useMemo(() => {
    const now = new Date();
    return medications.filter((item) => {
      if (!item.expiryDate) {
        return false;
      }
      const expiry = new Date(item.expiryDate);
      const diff = (expiry - now) / (1000 * 60 * 60 * 24);
      return diff >= 0 && diff <= 30;
    }).map((item) => item.id);
  }, [medications]);

  const lowStock = useMemo(() => medications.filter((item) => item.quantity < 10).map((item) => item.id), [medications]);

  const getTransactionsForPeriod = useCallback(async (startDate, endDate) => {
    return fetchTransactionsByPeriod(startDate, endDate);
  }, []);

  const exportCsv = useCallback(async () => {
    try {
      const csv = buildCsv({ medications, transactions });
      const fileUri = `${FileSystem.documentDirectory}appfarmacia_export.csv`;
      await FileSystem.writeAsStringAsync(fileUri, csv, { encoding: FileSystem.EncodingType.UTF8 });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'text/csv',
          dialogTitle: 'Exportar estoque em CSV'
        });
      } else {
        Alert.alert('Exportação concluída', `Arquivo salvo em: ${fileUri}`);
      }
    } catch (error) {
      Alert.alert('Erro ao exportar', error.message);
    }
  }, [medications, transactions]);

  const value = useMemo(() => ({
    medications,
    transactions,
    loading,
    addMedication,
    recordMovement,
    expiringSoon,
    lowStock,
    getTransactionsForPeriod,
    exportCsv
  }), [medications, transactions, loading, addMedication, recordMovement, expiringSoon, lowStock, getTransactionsForPeriod, exportCsv]);

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory deve ser utilizado dentro de um InventoryProvider');
  }
  return context;
};
