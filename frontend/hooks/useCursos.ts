import { useState, useEffect } from 'react';
import { buscarCursos } from '../servicos/servico.cursos';

// Interface para tipar os dados do curso
interface Curso {
  id: number;
  nome: string;
  descricao: string;
  // Adicione outros campos conforme necessário
}

export const useCursos = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setLoading(true);
        const response = await buscarCursos();
        setCursos(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, []); // O array vazio garante que o efeito só rode uma vez

  return { cursos, loading, error };
};
