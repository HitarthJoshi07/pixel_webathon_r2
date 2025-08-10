import React, { useState } from 'react';
import Loader from './components/Loader';
import Furrow from './components/Furrow'
import OilstainHero from './components/components.jsx/OilstainHero';
import RevealImageScroll from './components/RevealImageScroll';
import Footer from './components/footer';


const App = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('furrow'); // or 'oilstain'
   const [page1, setPage1] = useState('oilstain');
    const [page2, setPage2] = useState('footer');
  return (
    <>
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <>
          {page === 'furrow' && <Furrow />}
          {page1 === 'oilstain' && <OilstainHero />}
          {page2 === 'footer' && <Footer />}     
          
        </>
      )}
    </>
  );  
};

export default App;
