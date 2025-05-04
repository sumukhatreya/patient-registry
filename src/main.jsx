import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App.jsx';
import { setupAndSeedTable } from './services/db.js';
import { PGliteProvider } from '@electric-sql/pglite-react';
import { PGliteWorker } from '@electric-sql/pglite/worker'


const Root = () => {
  const [pg, setPg] = useState(null);

  useEffect(() => {
    const setupDb = async () => {
      // This code sets up multi-tab workers so that the application can be used in multiple tabs simultaneously. The data is persisted to IndexedDB, so that data persists across page refreshes.
      const worker = new Worker(
        new URL('./services/pglite-worker.js', import.meta.url),
        { type: 'module' }
      );
      console.log('This is the worker', worker);
      const pgConn = new PGliteWorker(worker, {
        dataDir: 'idb://patient-db',
      });
      console.log('This is pgConn', pgConn);
      // Create the patient registry and seed it with some data if no data exists.
      await setupAndSeedTable(pgConn, 'registry');
      // const res = await pgConn.query(`SELECT * FROM registry`);
      // console.log('This is the data', res.rows);
      setPg(pgConn);
      }

    setupDb().catch(console.error);
  }, []);

  return (
    pg && (
      <div>
        <PGliteProvider db={pg}>
          <App />
        </PGliteProvider>
      </div>
    )
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
