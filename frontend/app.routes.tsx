import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './paginas/Login';
import CompletarPerfil from './paginas/CompletarPerfil';
import Cursos from './paginas/Cursos';
import DetalhesCurso from './paginas/DetalhesCurso';
import ConteudoCurso from './paginas/ConteudoCurso';
import CriarProposta from './paginas/CriarProposta';
import CriarConteudo from './paginas/CriarConteudo';
import Notificacoes from './paginas/Notificacoes';
import MeusCursos from './paginas/MeusCursos';
import MeuPerfil from './paginas/MeuPerfil';
import PesquisaCursos from './paginas/PesquisaCursos';
import ConfiguracoesCurso from './paginas/ConfiguracoesCurso';
import ConfiguracoesApp from './paginas/ConfiguracoesApp';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/completar-perfil" element={<CompletarPerfil />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/curso/:id" element={<DetalhesCurso />} />
        <Route path="/conteudo-curso/:id" element={<ConteudoCurso />} />
        <Route path="/criar-proposta" element={<CriarProposta />} />
        <Route path="/curso/:id/configuracoes" element={<ConfiguracoesCurso />} />
        <Route path="/criar-conteudo/:id" element={<CriarConteudo />} />
        <Route path="/notificacoes" element={<Notificacoes />} />
        <Route path="/meus-cursos" element={<MeusCursos />} />
        <Route path="/meu-perfil" element={<MeuPerfil />} />
        <Route path="/pesquisar-cursos" element={<PesquisaCursos />} />
        <Route path="/configuracoes-app" element={<ConfiguracoesApp />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
