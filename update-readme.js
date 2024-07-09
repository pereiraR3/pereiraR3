const fs = require('fs');

const githubToken = process.env.PAT_1;
const user = 'pereiraR3';
const theme = 'radical';
const streakStatsUrl = `https://github-readme-streak-stats.herokuapp.com?user=${user}&theme=${theme}&mode=weekly`;
const topLangsUrl = `https://github-readme-stats-indol-seven-37.vercel.app/api/top-langs/?username=${user}&show_icons=true&theme=${theme}&layout=compact&token=${githubToken}`;

const readmeContent = `
<div align="center" style="margin-bottom:100px;">
  <img width="55%" src="${streakStatsUrl}" alt="GitHub Readme Streak Stats" />
  <img width="40%" src="${topLangsUrl}" alt="GitHub Top Languages" />
</div>
`;

fs.writeFileSync('README.md', readmeContent);
