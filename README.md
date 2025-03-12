# Separador de PDF de Imposto de Renda

## Descrição

Este é um aplicativo que permite separar um **PDF de Imposto de Renda** em vários arquivos individuais, um para cada página. O usuário seleciona o arquivo PDF de entrada e a pasta de destino para salvar os arquivos separados. O aplicativo é desenvolvido com **React** e **Electron**, e processa os PDFs usando bibliotecas como **pdf-lib** e **pdf-parse**.

## Funcionalidades

- Selecione um **PDF de Imposto de Renda**.
- Escolha a **pasta de destino** para salvar os arquivos PDF gerados.
- O aplicativo processa o PDF e gera um arquivo separado para cada página.
- O nome dos arquivos gerados será baseado no nome do beneficiário extraído do PDF.

## Tecnologias Utilizadas

- **React**: Biblioteca para a construção da interface de usuário.
- **Electron**: Framework para a criação de aplicativos desktop com tecnologias web.
- **Vite**: Build tool para acelerar o processo de desenvolvimento e build do projeto.
- **pdf-lib**: Biblioteca para manipulação de arquivos PDF.
- **pdf-parse**: Biblioteca para extrair texto de PDFs.
- **Python**: Para o processamento adicional de PDFs, se necessário.

## Pré-requisitos

Antes de rodar o projeto, você precisa ter o seguinte instalado no seu ambiente de desenvolvimento:

- **Node.js** (recomendado versão 14.x ou superior)
- **npm** (gerenciador de pacotes do Node.js)
- **Electron** (caso não esteja instalado globalmente)
- **Python** (se o projeto envolver scripts Python para processamento adicional de PDFs)

## Instalação

### 1. Clone o repositório

Clone o repositório para a sua máquina local:

```bash
git clone https://github.com/seu-usuario/separador-pdf-imposto-de-renda.git
```
### 2. Navegue até o diretório do projeto

```bash
cd separador-pdf-imposto-de-renda
```

### 3. Instale as dependências
Para instalar as dependências do projeto, execute o seguinte comando:

```bash
npm install
```
### 4. Instale as dependências do Python (se necessário)
Se o projeto utiliza Python para manipulação adicional de PDFs ou automações, instale as dependências com o seguinte comando:

```bash
pip install -r requirements.txt
```
Nota: O arquivo requirements.txt pode ser necessário caso o projeto utilize bibliotecas Python específicas para processamento de PDF. Caso contrário, ignore esta etapa.

### 5. Inicialize o Electron com o Vite

```bash
npm run dev
```
Isso abrirá o aplicativo no ambiente de desenvolvimento local. O Electron irá rodar na porta 5173 e será acessado via http://localhost:5173.

### 6.Gerar o build para produção

```bash
npm run build
```
Isso abrirá o aplicativo no ambiente de desenvolvimento local. O Electron irá rodar na porta 5173 e será acessado via http://localhost:5173.

### 7.Como Usar

Abra o aplicativo: Ao abrir o aplicativo, você verá a interface de usuário com dois campos:

PDF de Entrada: Clique no ícone de pasta ao lado deste campo para selecionar o arquivo PDF do Imposto de Renda.
Pasta de Destino: Clique no ícone de pasta ao lado deste campo para selecionar onde os PDFs separados serão salvos.
Selecione o arquivo PDF e a pasta de destino:

Após selecionar o PDF de entrada, o caminho do arquivo será exibido no campo.
Após selecionar a pasta de destino, o caminho da pasta será exibido.
Clique no botão "Processar PDF":

O aplicativo começará a processar o PDF selecionado, separando-o em arquivos individuais, baseados no nome do beneficiário encontrado no documento.
Os arquivos serão salvos na pasta de destino que você escolheu, com o nome do beneficiário e o número da página.
Verifique os arquivos gerados: Os arquivos separados estarão na pasta de destino.

Contribuição
Contribuições são bem-vindas! Para contribuir, siga as etapas abaixo:

Faça um fork do repositório.
Crie uma nova branch (git checkout -b feature/nova-funcionalidade).
Faça suas alterações e commite (git commit -m 'Adicionando nova funcionalidade').
Push para a branch (git push origin feature/nova-funcionalidade).
Abra um pull request.
Licença
Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes.

Suporte
Caso tenha alguma dúvida ou encontre problemas, entre em contato com o autor ou abra uma issue no repositório.
