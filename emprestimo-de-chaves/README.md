# Emprestimo de chaves

Projeto frontend feito com React e Vite, pensado para resolver um problema da instituição que estudei, em que os professores precisavam anotar em uma caderneta as informações da chave de uma sala ou laboratório que eles pegavam, o que era um processo lento e muitas vezes falho.

## Visão Geral

Este é um projeto de gerenciamento de emprestimo de chaves, em que podem ser cadastrados uma nova chave de alguma sala ou laboratório, também podemos cadastrar um novo funcionário para que ele possa pegar uma chave cadastrada, também podemos cadastrar um empréstimo ou cadastrar uma devolução e também podemos olhar o histórico de emprestimos de devoluções realizadas

## Base de dados

Para o armazenamentos de dados, é utilizado uma biblioteca chamada json-server, que permite através de um documento no formato json simular um backend hospedado e se comunica com o front através de requisições HTTP

## Imagens 

A seguir temos algumas imagens que mostram as telas do projeto

### Tela incial
![emprestimo home](https://github.com/user-attachments/assets/43d26c96-8648-46b8-9519-a93d2ba845d6)

### Tela salas
![emprestimo salas](https://github.com/user-attachments/assets/8e780f59-5c83-463f-800a-6af811c49034)

### Tela de cadastro de novas chaves
![emprestimo add sala](https://github.com/user-attachments/assets/14d25d30-4612-4f7e-bbd2-7134bb933816)

### Tela de funcionários
![emprestimo funcionarios](https://github.com/user-attachments/assets/99375089-bc5d-4959-b8a7-4cfacd3e619a)

### Tela de realização de empréstimos ou devoluções
![emprestimo emp](https://github.com/user-attachments/assets/1f68416b-0592-40e6-8fa5-a91a13cb60b4)

### Tela de histórico
![emprestimo historico](https://github.com/user-attachments/assets/ea0f8e75-f6e6-4f7e-99aa-64a193edfca9)

# Dependências e comandos

Para este projeto, no backend as bibliotecas utilizadas foram:
- axios: ^1.7.7,
- json-server: ^0.17.4,
- react-icons: ^5.3.0,
- react-router-dom: ^6.26.1
  
Para executar o projeto localmente execute esse comando no termimal:

### `npm run dev`

Para executar o json-server e simular o backend execute:

### `npm run server`