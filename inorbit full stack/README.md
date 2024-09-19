# Inorbit 

Projeto full-stack com intenção de aplicar novos conhecimentos adquiridos na parte de backend com TypeScript e Node.js, e no frontend com React e Vite

## Visão Geral

Este é um projeto de gerenciamento de metas, permitindo a criação de novas metas e a marcação de conclusão de metas criadas. Para este projeto, temos a utilizaçào de novos recursos como um backend que se que se comunica com o frontend através de requisições HTTP e armazena os dados em um banco de dados PostgreSQL, enquanto no front, temos a utilização de bibliotecas como tailwind, que permite descrever a estilização de um elemento HTML direto do atributo classname, sem precisar de um arquivo CSS, como também a utilização da biblioteca Radix-ui, que contém feitos diversos recursos de UI presentes em diversas aplicações web

## Base de dados

Para exibição das metas cadastradas e concluídas o backend se comunica com uma plataforma PostgreSQL sem servidor, chamada de Neon.tech, projetada para nuvem e pensada em ajudar desenvolvedores a construirem aplicações confiáveis e escaláveis de maneira mais rápida. Ela separa computação e armazenamento para oferecer funções modernas de desenvolvimento como dimensionamento automático, ramificação, restauração pontual e muito mais

## Imagens 

A seguir temos algumas imagens que mostram as telas do projeto

### Tela incial
![inorbit sem metas](https://github.com/user-attachments/assets/35051e1c-8a2a-4657-92b3-99f6301519b6)

### Tela de criação de metas
![inorbit criação de metas](https://github.com/user-attachments/assets/0e119103-d96a-4d42-a561-baf4c4bbcd11)

### Tela de listagem de metas e metas concluídas
![inorbit metas cadastradas](https://github.com/user-attachments/assets/8d200552-55a2-4526-a826-d48f6c19a3af)

# Dependências e comandos

Para este projeto, no backend as bibliotecas utilizadas foram:
- @fastify/cors: ^9.0.1
- @paralleldrive/cuid2: ^2.2.2
- dayjs: ^1.11.13
- drizzle-orm: ^0.33.0
- fastify: ^4.28.1
- fastify-type-provider-zod: ^2.0.0
- postgres: ^3.4.4
- zod: ^3.23.8

E como dependências de desenvolvedor temos:
- @biomejs/biome: ^1.8.3
- @types/node: ^22.5.4
- drizzle-kit: ^0.24.2 
- tsx: ^4.19.0
- typescript: ^5.6.2


Para o frontend as bibliotecas utilizadas foram:
- @hookform/resolvers: ^3.9.0
- @radix-ui/react-dialog: ^1.1.1
- @radix-ui/react-progress: ^1.1.0
- @radix-ui/react-radio-group: ^1.2.0
- @tanstack/react-query: ^5.56.2
- dayjs: ^1.11.13
- lucide-react: ^0.441.0
- react-hook-form: ^7.53.0
- tailwind-merge: ^2.5.2
- tailwind-variants: ^0.2.1
- zod: ^3.23.8

E como dependências de desenvolvedor temos:
- @biomejs/biome: ^1.9.0
- autoprefixer: ^10.4.20
- postcss: ^8.4.45
- tailwindcss: ^3.4.11

Para executar backend, no diretório server, execute esse comando no termimal:

### `npm run dev`

Para o frontend, no diretório web, execute um novo terminal com o seguinte comando:

### `npm run dev`