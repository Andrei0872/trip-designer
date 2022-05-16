import './App.scss';
import Footer from './layout/Footer';
import Header from './layout/Header';
import TripPlanner from './pages/TripPlanner';

function App() {
  return (
    <div className="main">
      <Header />
      <TripPlanner />
      <Footer />
    </div>
  );
}

export default App;
