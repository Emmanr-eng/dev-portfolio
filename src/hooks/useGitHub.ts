import { useState, useEffect } from 'react';

export const useGitHub = (username: string) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
      .then(res => res.json())
      .then(data => {
        setRepos(data.filter((repo: any) => !repo.fork));
        setLoading(false);
      });
  }, [username]);

  return { repos, loading };
};
