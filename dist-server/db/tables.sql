-- Exclui as tabelas se elas já existirem para garantir um estado limpo
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS cursos CASCADE;

-- Cria a tabela de usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE NOT NULL, -- ID do Google para identificar o usuário
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    foto_perfil TEXT, -- URL da foto de perfil do Google
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Cria a tabela de cursos
CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    preco NUMERIC(10, 2) NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
