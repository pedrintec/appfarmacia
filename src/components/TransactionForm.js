import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TransactionForm = ({ medications, onSubmit }) => {
  const [selectedMedication, setSelectedMedication] = useState(medications[0]?.id || null);
  const [type, setType] = useState('entrada');
  const [quantity, setQuantity] = useState('0');
  const [reason, setReason] = useState('');

  const medicationOptions = useMemo(
    () => medications.map((item) => ({ label: item.name, value: item.id })),
    [medications]
  );

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
    <View style={styles.container}>
      <Text style={styles.title}>Registrar movimentação</Text>
      <View style={styles.row}>
        <View style={[styles.pickerWrapper, styles.flexLarge]}>
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
        <View style={[styles.pickerWrapper, styles.flexSmall]}>
          <Picker selectedValue={type} onValueChange={(itemValue) => setType(itemValue)}>
            <Picker.Item label="Entrada" value="entrada" />
            <Picker.Item label="Saída" value="saida" />
          </Picker>
        </View>
      </View>

      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.flexSmall]}
          placeholder="Quantidade"
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />
        <TextInput
          style={[styles.input, styles.flexLarge, styles.multiline]}
          placeholder="Motivo (compra, venda, perda...)"
          value={reason}
          onChangeText={setReason}
          multiline
          numberOfLines={3}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6
  },
  pickerWrapper: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    marginHorizontal: 6,
    marginBottom: 12
  },
  input: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 15,
    color: '#1e293b',
    marginHorizontal: 6,
    marginBottom: 12
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top'
  },
  flexLarge: {
    flexBasis: '58%'
  },
  flexSmall: {
    flexBasis: '38%'
  },
  button: {
    backgroundColor: '#e11d48',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16
  }
});

export default TransactionForm;
