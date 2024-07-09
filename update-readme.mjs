import fs from 'fs';
import fetch from 'node-fetch';

const githubToken = process.env.PAT_1;
const user = 'pereiraR3';
const theme = 'radical';

// URLs para buscar dados
const streakStatsUrl = `https://github-readme-streak-stats.herokuapp.com?user=${user}&theme=${theme}&mode=weekly`;
const topLangsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&theme=${theme}&layout=compact`;
const githubStatsUrl = `https://api.github.com/users/${user}/repos?per_page=100`;

// Função para buscar o número total de commits
async function fetchCommits() {
  const response = await fetch(githubStatsUrl, {
    headers: {
      Authorization: `token ${githubToken}`
    }
  });

  const repos = await response.json();

  let totalCommits = 0;

  for (const repo of repos) {
    const commitsResponse = await fetch(repo.commits_url.replace('{/sha}', ''), {
      headers: {
        Authorization: `token ${githubToken}`
      }
    });

    const commits = await commitsResponse.json();
    totalCommits += commits.length;
  }

  return totalCommits;
}

async function updateReadme() {
  const totalCommits = await fetchCommits();

  const readmeContent = `
<div align="center" style="margin-bottom:100px; display: flex; justify-content: center; gap: 10px;">
  <img style="width: 30%;" src="${streakStatsUrl}" alt="GitHub Readme Streak Stats" />
  <img style="width: 30%;" src="${topLangsUrl}" alt="Top Langs" />
  <img style="width: 30%;" src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=${theme}&include_all_commits=true" alt="GitHub Stats" />
</div>

<p align="center">Total Commits: ${totalCommits}</p>
`;

  fs.writeFileSync('README.md', readmeContent);
}

updateReadme();
