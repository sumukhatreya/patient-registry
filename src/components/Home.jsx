import { useEffect, useState } from 'react'
import { usePGlite } from '@electric-sql/pglite-react';
import { retrieveAllEntries } from '../services/db';
import PatientList from './PatientList';
import Error from './Error';

const Home = () => {
    const [entries, setEntries] = useState(null);
    const [isError, setError] = useState(false);
    const db = usePGlite();

    useEffect(() => {
        const fetch = async () => {
            const res = await retrieveAllEntries(db, 'registry');
            setEntries(res);
        }

        fetch().catch(res => setError(true));
    }, [])

    if (isError) {
        return (
            <div>
                <Error />
            </div>
        );
    } 
    
    return (
      entries && (
        <div className='home'>
          <PatientList
            entries={entries}
            title='All patient entries'
          />
        </div>
      )
    );
}

export default Home;