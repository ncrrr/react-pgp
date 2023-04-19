import React from 'react';
import './App.css';
import TabMenu from './components/menu/TabMenu';

export default function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>PGPTools</h1>
                <h3>by OxiD</h3>
            </header>

            <br />

            <div className="container" style={{ marginBottom: '50px' }}>
                <TabMenu />
            </div>

            <div className="footer">
                <p>Copyright 2020</p>
            </div>
        </div>
    );
}
