import { useState, useEffect, useCallback } from 'react';

export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  fork: boolean;
}

// ── FIX #4: Module-level in-memory cache ──────────────────────────────────────
// Persists across component mounts within the same page session so the GitHub
// API is only hit once per username, not on every render / hot-reload cycle.
const repoCache = new Map<string, Repo[]>();

export const useGitHub = (username: string) => {
  const [repos, setRepos]     = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  // FIX #3: expose an error state so the UI can react
  const [error, setError]     = useState<string | null>(null);

  const fetchRepos = useCallback(async (signal: AbortSignal) => {
    // FIX #4: return cached result immediately — no network hit
    if (repoCache.has(username)) {
      setRepos(repoCache.get(username)!);
      setLoading(false);
      return;
    }

    try {
      // FIX #5: request 100 repos so the fork-filter sees everything
      const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
        { signal },
      );

      // FIX #2: check HTTP status before calling .json()
      if (!response.ok) {
        const msg =
          response.status === 403
            ? 'GitHub API rate limit reached. Try again in a minute.'
            : `GitHub API error ${response.status}.`;
        throw new Error(msg);
      }

      const data: Repo[] = await response.json();

      // Filter forks, take top 6 by last-updated order (API already sorted)
      const filtered = data.filter((repo) => !repo.fork).slice(0, 6);

      // FIX #4: populate cache for subsequent mounts
      repoCache.set(username, filtered);

      setRepos(filtered);
      setError(null);
    } catch (err) {
      // FIX #1: AbortError is expected on cleanup — don't treat it as a real error
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Failed to load repositories.');
      console.error('[useGitHub]', err);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    // FIX #1: AbortController cancels the in-flight fetch on unmount
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetchRepos(controller.signal);
    return () => controller.abort();
  }, [fetchRepos]);

  return { repos, loading, error };
};