import React, { useEffect , useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom'
import api from '../../services/api';

import githubExplore from '../../assets/github_explorer.svg';

import { Header, RepositoryInfo, Issues } from './styles';
import { FiChevronsLeft, FiChevronRight } from 'react-icons/fi';

import {IRepository, IRepositoryParams, IIssues } from './Interfaces/IRepository';



const Repository: React.FC = () => {
	const [ repository, setRepository] = useState<IRepository | null>(null);
	const [ issue, setIssue] = useState<IIssues[]>([]);

	const { params } = useRouteMatch<IRepositoryParams>();

	useEffect( ()=>{
		api.get(`repos/${params.repository}`).then( response =>{
			setRepository(response.data);
		});
	
		api.get(`repos/${params.repository}/issues`).then( response =>{
			setIssue(response.data);
		});
		
		/* async function loadData(): Promise<void>{
		//  const repository = await api.get(`repos/${params.repository}`);
		//  const issues = await api.get(`repos/${params.repository}/issues`);
			const [ repository, issues] = await Promise.all([
				api.get(`repos/${params.repository}`),
				api.get(`repos/${params.repository}/issues`)
			]);

			console.log(repository);
			console.log(issues);
		};

		loadData(); */
	}, [params.repository]);

	return (<>		
		<Header>									
			<img src={githubExplore} alt="Github Explorer" />	
			<Link to="/">
				<FiChevronsLeft size={16} />
				Voltar
			</Link>
		</Header>
		{ repository && (
			<RepositoryInfo>

				<header>
					<img 
						src={repository.owner.avatar_url}
					 	alt={repository.owner.login}
					 />
					<div>
						<strong>{repository.full_name}</strong>
						<p>{repository.description}</p>
					</div>
				</header>
				<ul>
					<li>
						<strong>{repository.stargazers_count}</strong>
						<span>Stars</span>
					</li>
					<li>
						<strong>{repository.forks_count}</strong>
						<span>Forks</span>
					</li>
					<li>
						<strong>{repository.open_issues_count}</strong>
						<span>Issues abertas</span>
					</li>
				</ul>
			</RepositoryInfo>
		)}
		
		<Issues>
			{issue.map((issue) => (
				<a key={issue.id} href={issue.html_url}>
				<div>
					<strong>{issue.title}</strong>
					<p>{issue.user.login}</p>
				</div>
				<FiChevronRight size={20} />
				</ a>
			))}		
		</Issues>
		</>
	);	
};

export default Repository;