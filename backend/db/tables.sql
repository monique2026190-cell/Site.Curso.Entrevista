
-- Cria a tabela de usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL, -- A senha será armazenada como um hash
    bio TEXT,
    avatar_url TEXT, -- URL para a imagem de avatar do usuário
    stripe_account_id VARCHAR(255) UNIQUE, -- ID da conta Stripe Connect do usuário
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Adiciona um índice na coluna de email para buscas mais rápidas
CREATE INDEX idx_usuarios_email ON usuarios(email);

-- Cria a tabela de cursos
CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    preco NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    taxa NUMERIC(5, 2) NOT NULL DEFAULT 10.00, -- Taxa da plataforma em porcentagem
    capa_curso TEXT, -- URL da imagem de capa do curso
    usuario_id INTEGER NOT NULL, -- Chave estrangeira para a tabela de usuários
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Cria a tabela de comentarios
CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    curso_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    comentario TEXT NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_curso FOREIGN KEY (curso_id) REFERENCES cursos(id),
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Cria a tabela de inscricoes
CREATE TABLE inscricoes (
    id SERIAL PRIMARY KEY,
    curso_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_curso FOREIGN KEY (curso_id) REFERENCES cursos(id),
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    UNIQUE(curso_id, usuario_id) -- Garante que um usuário só pode se inscrever uma vez em um curso
);

-- Cria a tabela de aulas
CREATE TABLE aulas (
    id SERIAL PRIMARY KEY,
    curso_id INTEGER NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    url_video TEXT,
    ordem INTEGER NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_curso FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
);

-- Tabela para armazenar as notas dos alunos em cada aula
CREATE TABLE notas_aulas (
    id SERIAL PRIMARY KEY,
    aula_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    -- O conteúdo da nota pode ser um texto longo, por isso usamos TEXT
    conteudo TEXT NOT NULL, 
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Chave estrangeira referenciando a tabela de aulas
    CONSTRAINT fk_aula FOREIGN KEY (aula_id) REFERENCES aulas(id) ON DELETE CASCADE,
    -- Chave estrangeira referenciando a tabela de usuários
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    -- Garante que um usuário tenha apenas uma nota por aula
    UNIQUE (aula_id, usuario_id)
);
