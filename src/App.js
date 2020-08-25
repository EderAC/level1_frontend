import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header'

function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => { 
        api.get('projects').then(response => {
            setProjects(response.data)
        });
     }, []);

    async function handleAddproject() {
        // setProjects([...projects, `Novo projeto ${Date.now()}`]);
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
           owner: "Eder" 
        });
        setProjects([...projects, response.data])
    }

    return (
        <>
            <Header title="Projects" />
            <ul>
                {projects.map(project => <li key={project.id} >{project.title}</li>)}
            </ul>
            <button type="button" onClick={handleAddproject} >Adicionar Projeto</button>
        </>
    )
}

export default App;