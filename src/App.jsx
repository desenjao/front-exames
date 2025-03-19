import { useState } from 'react';
import Navbar from './assets/Navbar';
import Login from './assets/Login';
import ExamesList from './assets/ExamesList';
import AddExame from './assets/AddExame';
import './App.css';

const App = () => {
    const [token, setToken] = useState('');

    return (
        <div>
            <Navbar />
            {!token ? (
                <Login onLogin={setToken} />
            ) : (
                <>
                    
                    <AddExame token={token} />
                    <ExamesList token={token} />
                </>
            )}
        </div>
    );
};

export default App;