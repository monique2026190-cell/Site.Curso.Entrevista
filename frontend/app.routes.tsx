import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Pagina1 from './paginas/Pagina1';
import Pagina2 from './paginas/Pagina2';
import Pagina3 from './paginas/Pagina3';
import PaginaVendas from './paginas/PaginaVendas';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Pagina1 />,
  },
  {
    path: "/pagina2",
    element: <Pagina2 />,
  },
  {
    path: "/pagina3",
    element: <Pagina3 />,
  },
  {
    path: "/pagina-vendas",
    element: <PaginaVendas />,
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
