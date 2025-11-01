import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from './src/screens/DashboardScreen';
import MedicationsScreen from './src/screens/MedicationsScreen';
import MovementsScreen from './src/screens/MovementsScreen';
import ReportsScreen from './src/screens/ReportsScreen';
import { InventoryProvider } from './src/hooks/InventoryContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <InventoryProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#2a9d8f',
            tabBarInactiveTintColor: '#264653',
            tabBarStyle: {
              paddingBottom: 6,
              height: 60
            },
            tabBarIcon: ({ color, size }) => {
              const icons = {
                Dashboard: 'speedometer-outline',
                Medicamentos: 'medkit-outline',
                Movimentacoes: 'swap-horizontal-outline',
                Relatorios: 'bar-chart-outline'
              };
              const iconName = icons[route.name] || 'ellipse-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          })}
        >
          <Tab.Screen name="Dashboard" component={DashboardScreen} />
          <Tab.Screen name="Medicamentos" component={MedicationsScreen} />
          <Tab.Screen name="Movimentacoes" component={MovementsScreen} />
          <Tab.Screen name="Relatorios" component={ReportsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </InventoryProvider>
  );
}
