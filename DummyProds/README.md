# DummyProds

Projeto com intenção de aplicar novos conhecimentos adquiridos no React

## Visão Geral

Este é um projeto que tenta replicar o Frontend de sites de compras como Amazon e Mercado Livre. De forma bem mais simplificada do que um site de compras real, com esse projeto temos algumas funcionalidades interessantes funcionando, entre elas podemos destacar: uma tela de autentificação, listagem e exibição dos produtos com paginação, filtragem de dados através das categorias dos produtos, ordenação dos produtos por preço (do menor ao maior, ou do maior ao menor), barra de pesquisa, página detalhada do produto, mostrando todas as informações realacionadas, seção de produtos recomendados.

## Base de dados

Para exibição dos produtos foi utilizada uma base de dados de uma API chamada de DummyJson, que disponibiliza uma série de dados de produtos, carrinhos de compra, usuários, postagens, listas de taferas e etc. Para mais informações acesse o link da API: https://dummyjson.com/.

Para esse projeto foi utilizada a parte de autentificação e produtos, que conta com um total de 194 produtos, dividídos em 24 categorias, e cada produto com diversas informações como especificações, fotos e avaliações

## Imagens e acesso

O projeto está hospedado no github pages e pode ser acessado atavrés do link: https://lucasrocha23.github.io/DummyProds

Para acessar, as credenciais são, username: emilys e senha: emilyspass, disponibilizadas pela API DummyJson

A seguir temos algumas imagens que mostram as telas do projeto

### Tela de autentificação
![dummy-tela-de-autentificação](https://github.com/user-attachments/assets/56bb8aa2-f2ac-4f90-b16d-d190a43a7140)

### Tela com a lista de produtos
![dummy-tela-de-listaProdutos](https://github.com/user-attachments/assets/1f1a6838-a307-4a9f-acd8-9dbd420d0b9f)

### Tela de detalhes do produto
![dummy-tela-de-detalhesProduto](https://github.com/user-attachments/assets/a6aa06cb-6a70-442b-8df3-7e2d65507d76)

# Dependências e comandos

Para este projeto as bibliotecas utilizadas foram:
- @tanstack/react-query: 5.54.1
- react-icons: 5.3.0
- react-router-dom: 6.26.1
- zustand: 4.5.5

Para executar o projeto localmente, no diretório do projeto, execute esse comando no termimal:

### `npm run dev`
