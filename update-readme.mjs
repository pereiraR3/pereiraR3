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
<img align="center" style="margin-bottom:100px; object-fit: contain" width=100% src="./images/banner.png" />
&nbsp;&nbsp;&nbsp;

<p align="center"> 🙋🏾‍♂️ I like solving complex problems through technology. <br><br> I'm a software engineer with a passion for optimizing and innovating software solutions. My experience spans technical and managerial roles, including leading teams, coordinating projects, and continuously improving software with a focus on agile development principles.</p>&nbsp;

<div align="center" style="margin-bottom:100px; display: flex; justify-content: center; gap: 10px;">
  <img style="width: 45%;" src="${streakStatsUrl}" alt="GitHub Readme Streak Stats" />
  <img style="width: 32%;" src="${topLangsUrl}" alt="Top Langs" />
</div>


&nbsp;
&nbsp;

## My Skills

#### Main Stack:

![Java](https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white)&nbsp;
![Python](https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white)&nbsp;
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)&nbsp;
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)&nbsp;
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)&nbsp;
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)&nbsp;
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)&nbsp;
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)&nbsp;

<img src="https://raw.githubusercontent.com/MicaelliMedeiros/micaellimedeiros/master/image/computer-illustration.png" min-width="400px" max-width="400px" width="400px" align="right" alt="Computador iuriCode">

#### Secondary Stack:

![C++](https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white)&nbsp;
![C](https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white)&nbsp;

#### Studying in this moment:

![Kubernetes](https://img.shields.io/badge/kubernetes-4285F4?style=for-the-badge&logo=kubernetes&logoColor=white)&nbsp;

#### Databases:
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)&nbsp;
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)&nbsp;
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)&nbsp;

#### Workstation Tools:

![VScode](https://img.shields.io/badge/vscode-4285F4?style=for-the-badge&logo=vscode&logoColor=white)&nbsp;
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)&nbsp;
![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)&nbsp;
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)&nbsp;
![Google Workspace](https://img.shields.io/badge/Google_Workspace-4285F4?style=for-the-badge&logo=google-workspace&logoColor=white)&nbsp;

&nbsp;
&nbsp;

## Contacts:

<div> 
<a href="https://www.instagram.com/dev.anthony3r" target="_blank"><img src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white">
</a>
<a href = "mailto:contato.anthony.rezende@sou.ufmt.br"> <img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/anthony-ricardo-rodrigues-rezende-486917227/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white"  target="_blank"></a> 
</div>&nbsp;&nbsp;
  
<img width=100% src="https://capsule-render.vercel.app/api?type=waving&color=8F0D87&height=120&section=footer"/>
`;

  fs.writeFileSync('README.md', readmeContent);
}

updateReadme();
