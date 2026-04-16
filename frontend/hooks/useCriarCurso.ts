import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarCurso } from '../servicos/servico.cursos';

interface CursoData {
  nome: string;
  descricao: string;
}

export const useCriarCurso = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const salvarCurso = async (cursoData: CursoData) => {
    setLoading(true);
    setError(null);
    try {
      await criarCurso(cursoData);
      navigate('/cursos'); // Sucesso, navegar para a lista de cursos
    } catch (err) {
      setError('Falha ao criar o curso. Tente novamente mais tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { salvarCurso, loading, error };
};
