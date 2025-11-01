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

### Caso veja o erro `expo não é reconhecido`

Esse erro normalmente indica que a instalação das dependências falhou, por isso o binário do Expo não foi criado em `node_modules/.bin`. Siga os passos abaixo no terminal aberto na pasta `appfarmacia`:

1. Apague qualquer instalação parcial que possa ter restado:

   ```bash
   rm -rf node_modules package-lock.json
   ```

2. Limpe o cache do npm (opcional, mas recomendado quando o `npm install` falha):

   ```bash
   npm cache clean --force
   ```

3. Reinstale as dependências com as versões atualizadas do projeto:

   ```bash
   npm install
   ```

Com a instalação concluída, rode novamente `npx expo start`. O comando deve localizar o executável `expo` dentro de `node_modules/.bin` e iniciar o bundler normalmente.

## Executando e testando no Visual Studio Code

1. Abra a pasta `appfarmacia` no VS Code.
2. Utilize o atalho `Ctrl+Shift+P` (ou `Cmd+Shift+P` no macOS) e escolha **Tasks: Run Task** para acessar as tarefas pré-configuradas:
   - **npm install** – instala as dependências do projeto.
   - **expo start** – inicia o Metro bundler do Expo em um terminal dedicado.
   - **npm test** – executa o teste de fumaça do exportador CSV diretamente no terminal integrado.
3. Para depurar o teste no VS Code, abra a aba **Run and Debug** (`Ctrl+Shift+D`) e selecione a configuração **Debug CSV smoke test**. O VS Code iniciará o script `tests/csvExport.test.js` com suporte a breakpoints.
4. Também há uma configuração **Start Expo (Metro)** na aba de depuração para iniciar o Expo por meio do botão **Run** do VS Code, caso prefira não usar o menu de tarefas.

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
