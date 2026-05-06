import { useState, useEffect } from 'react';

export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  fork: boolean
}

export const useGitHub = (username: string) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
        const data = await response.json();
        // Filter out forks so it only shows your original work
        setRepos(data.filter((repo: Repo) => !repo.fork).slice(0, 6));
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [username]);

  return { repos, loading };
};
