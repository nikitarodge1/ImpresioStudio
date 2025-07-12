import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PhotographerProvider } from './context/PhotographerContext';
import CategoryListing from './pages/CategoryListing';
import PhotographerProfile from './pages/PhotographerProfile';

function App() {
  return (
    <PhotographerProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-900">
          <Routes>
            <Route path="/" element={<CategoryListing />} />
            <Route path="/photographer/:id" element={<PhotographerProfile />} />
          </Routes>
        </div>
      </Router>
    </PhotographerProvider>
  );
}

export default App;
