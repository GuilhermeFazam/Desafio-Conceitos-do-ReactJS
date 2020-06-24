import React, { useState, useEffect } from "react";
import api from "./services/api";
import Header from "./components/Header";
import "./styles.css";

function App() {
	const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		api.get("repositories").then((response) => {
			setRepositories(response.data);
		});
	}, []);

	async function handleAddRepository() {
		const response = await api.post("repositories", {
			title: `Novo Projeto ${Date.now()}`,
			owner: "Guilherme",
		});

		const repository = response.data;

		setRepositories([...repositories, repository]);
	}

	async function handleRemoveRepository(id) {
		const repositoryId = repositories[id].id;
		const repositoryIndex = repositories.findIndex((repository) => repository.id === repositoryId);

		await api.delete("repositories/" + repositoryId);
		setRepositories([...repositories.slice(0, repositoryIndex)]);
	}

	return (
		<>
			<Header title="Desafio: Conceitos do ReactJS" />
			<ul data-testid="repository-list">
				{repositories.map((repository, index) => (
					<li key={repository.id}>
						{repository.title}
						<button onClick={() => handleRemoveRepository(index)}>Remover</button>
					</li>
				))}
			</ul>
			<button onClick={handleAddRepository}>Adicionar</button>
		</>
	);
}

export default App;
