import HomePage from './pages/home';
import SearchPage from './pages/search';
import PetDetailsPage from './pages/detail';
import PetDetailsNotFound from './pages/petDetailsNotFound';
import Root from './components/root';

// Add react-router-dom imports
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Pet from './components/pet';
import HeroPhotos from './components/heroPhotos/HeroPhotos';
// create router with JSX Route elements
const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root/>}>
      <Route index element={<HomePage />} />
      <Route path=':type' element={<HomePage />} />
      <Route path=':type/:id' element={<PetDetailsPage />}>
        <Route path='photos/:id' element={<HeroPhotos />} />
      </Route>
      
      <Route path='search' element={<SearchPage />} />

      <Route path='*' element={<PetDetailsNotFound />} />
    </Route>
));

function App() {
  return <RouterProvider router={appRouter}/>;
}

export default App;
