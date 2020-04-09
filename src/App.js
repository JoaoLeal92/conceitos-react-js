import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepo] = useState([])

  // Buscando no backend os repositórios já cadastrados
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepo(response.data)
    });
  }, [])

  async function handleAddRepository() {
    // Adiciona repositórios à lista
    const response = await api.post('/repositories', {
      url: "https://github.com/Rocketseat/repo2",
      title: `Repo ${Date.now()}`,
      techs: ["Node", "Express", "TypeScript"]
    });

    setRepo([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    // TODO
    // Remove repositórios cadastrados
    await api.delete(`/repositories/${id}`);

    setRepo(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>)}

      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
