# AppFarmacia

Aplicativo simples para controle de estoque de medicamentos utilizando React Native (Expo) e SQLite.

## Recursos principais

- Cadastro de medicamentos com nome, categoria, fabricante, validade, quantidade, lote e código de barras.
- Registro de entradas e saídas com data/hora automática e motivo (compra, venda, perda, vencimento etc.).
- Alertas visuais para medicamentos com estoque baixo (menos de 10 unidades) e com validade a vencer em 30 dias.
- Relatório filtrado por período das movimentações cadastradas.
- Exportação dos dados em CSV, compartilhando o arquivo ou salvando localmente.
- Interface responsiva preparada para tablets e celulares.

## Pré-requisitos

- [Node.js](https://nodejs.org/) versão 18 ou superior.
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) (instalada globalmente ou via `npx`).

## Como executar localmente

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Inicie o Metro bundler do Expo:

   ```bash
   npx expo start
   ```

3. Use o aplicativo Expo Go (Android/iOS) para ler o QR code exibido no terminal ou abra o emulador configurado no seu computador.

## Estrutura do projeto

```
appfarmacia/
├── App.js                # Navegação principal por abas
├── src/
│   ├── components/       # Formulários e listas reutilizáveis
│   ├── database/         # Inicialização e consultas SQLite
│   ├── hooks/            # Contexto de inventário
│   ├── screens/          # Telas do aplicativo
│   └── utils/            # Funções auxiliares (exportação CSV)
└── README.md
```

## Testando as principais funcionalidades

1. **Cadastro**: Acesse a aba *Medicamentos*, preencha o formulário e salve. O item aparecerá na lista logo abaixo.
2. **Movimentações**: Na aba *Movimentações*, escolha o medicamento, informe o tipo (entrada ou saída), quantidade e motivo. O estoque será ajustado automaticamente.
3. **Alertas**: Na aba *Dashboard* e na lista de medicamentos, os itens com estoque baixo ou validade próxima serão destacados.
4. **Relatórios**: Na aba *Relatórios*, informe uma data inicial e final no formato `YYYY-MM-DD` e toque em *Gerar relatório* para listar as movimentações do período. Utilize *Exportar CSV* para gerar o arquivo com todos os dados.

## Observações

- Os dados são armazenados localmente em SQLite (arquivo `pharmacy.db`).
- O aplicativo foi desenvolvido para execução rápida utilizando o Expo; caso deseje gerar builds nativos, siga a documentação oficial do Expo.
