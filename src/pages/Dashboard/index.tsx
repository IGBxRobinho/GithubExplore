import React ,{ useState, useEffect, FormEvent} from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';


import githubExplore from '../../assets/github_explorer.svg';

import { Title, Form, Repositories, Error } from './style';
import IRepository from './Interfaces/IRepository';

const Dashboard: React.FC = () => {
	const [newRepo, setNewRepo] = useState('');
	const [inputError, setInputError] = useState('');
	const [repositories, setRepositories] = useState<IRepository[]>(()=>{
		const storageRepositories = localStorage.getItem('@GithubExplore:repositories');

		if(storageRepositories){
			return JSON.parse(storageRepositories);
		}else{
			return [];
		}
	});	

	
	useEffect(() =>{
		localStorage.setItem('@GithubExplore:repositories',
		JSON.stringify(repositories),
		);
	},[repositories]);

	async function handleAddRepository(
		event: FormEvent<HTMLFormElement>,
		):Promise<void>{
			event.preventDefault();
			if(!newRepo){
				setInputError('Digite o autor/nome do repositório');
				return;
			}
		
		try{
			const response = await api.get<IRepository>(`repos/${newRepo}`);
			const repository = response.data;
			setRepositories([...repositories, repository ]);
			setNewRepo('');
			setInputError('');

		}catch(err){
			setInputError('Erro na busca por esse repositório');
		}
		
	}

	return (
		<>			
			<img src={githubExplore} alt="Github Explorer" />
			 
			<Title>Explore respositórios no Github</Title>
			
			<Form hasError={!! inputError } onSubmit={handleAddRepository} >
				<input 
					value={newRepo}
					onChange={(e) => setNewRepo(e.target.value)}
					placeholder="Digite o nome do repositorio"
				 />
				<button type="submit">Pesquisar</button>
			</Form>

			{ inputError && <Error>{inputError}</Error> }

			<Repositories>
				{repositories.map( repository =>(					
					<Link 
						key={repository.full_name} 
						to={`/repositories/${repository.full_name}`}>
						<img 
							src={repository.owner.avatar_url} 
							alt={repository.owner.login}
						/>
						<div>
							<strong>{repository.full_name}</strong>
							<p>{repository.description}</p>
						</div>
						<FiChevronRight size={20} />
					</Link>
				))}
			</Repositories>		
		</>
	);
};

export default Dashboard;