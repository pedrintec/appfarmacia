import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TransactionForm = ({ medications, onSubmit }) => {
  const [selectedMedication, setSelectedMedication] = useState(medications[0]?.id || null);
  const [type, setType] = useState('entrada');
  const [quantity, setQuantity] = useState('0');
  const [reason, setReason] = useState('');

  const medicationOptions = useMemo(() => medications.map((item) => ({ label: item.name, value: item.id })), [medications]);

  const handleSubmit = () => {
    if (medicationOptions.length === 0) {
      alert('Cadastre um medicamento antes de registrar movimentações.');
      return;
    }

    if (!selectedMedication) {
      alert('Selecione um medicamento.');
      return;
    }
    const parsedQuantity = Number(quantity);
    if (Number.isNaN(parsedQuantity) || parsedQuantity <= 0) {
      alert('Informe uma quantidade válida.');
      return;
    }

    onSubmit({
      medicationId: selectedMedication,
      type,
      quantity: parsedQuantity,
      reason: reason.trim(),
      timestamp: new Date().toISOString()
    });

    setQuantity('0');
    setReason('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Registrar movimentação</Text>
      <View style={styles.fieldset}>
        <Text style={styles.label}>Medicamento</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedMedication}
            onValueChange={(itemValue) => setSelectedMedication(itemValue)}
            enabled={medicationOptions.length > 0}
          >
            {medicationOptions.length === 0 ? (
              <Picker.Item label="Nenhum medicamento cadastrado" value={null} />
            ) : (
              medicationOptions.map((item) => (
                <Picker.Item key={item.value} label={item.label} value={item.value} />
              ))
            )}
          </Picker>
        </View>
      </View>

      <View style={styles.fieldset}>
        <Text style={styles.label}>Tipo de movimento</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={type} onValueChange={(itemValue) => setType(itemValue)}>
            <Picker.Item label="Entrada" value="entrada" />
            <Picker.Item label="Saída" value="saida" />
          </Picker>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Motivo (compra, venda, perda...)"
        value={reason}
        onChangeText={setReason}
        multiline
        numberOfLines={3}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 16
  },
  content: {
    paddingBottom: 24
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#264653'
  },
  fieldset: {
    marginBottom: 12
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
    color: '#264653'
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff'
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#e76f51',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default TransactionForm;
