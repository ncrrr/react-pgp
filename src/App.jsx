import React from 'react';
import MainAccordion from './components/MainAccordion';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import TabMenu from './components/menu/TabMenu';

export default function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>PGPTools</h1>
                <h3>by OxiD</h3>
            </header>

            <div className="container">
                <TabMenu />
                <MainAccordion />
            </div>

            <div className="footer">
                <p>Copyright 2020</p>
            </div>
        </div>
    );
}