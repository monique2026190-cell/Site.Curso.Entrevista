import AppRoutes from './app.routes';
import { ProvedorUsuario } from './contexto/ContextoUsuario';

function App() {
  return (
    <ProvedorUsuario>
      <AppRoutes />
    </ProvedorUsuario>
  );
}

export default App;
