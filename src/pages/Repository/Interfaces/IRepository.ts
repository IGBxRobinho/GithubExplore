export interface IRepository{
	full_name: string;
	description: string;
	stargazers_count: number;
	forks_count: number;
	open_issues_count: number;
	owner:{
		login: string;
		avatar_url: string
	}
}

export interface IRepositoryParams{
	repository: string;
}

export interface IIssues{
	id: string;
	title: string;
	html_url: string;
	user:{
		login: string;
	}
}