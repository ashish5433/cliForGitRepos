**GitHub Org Data Collector**

This is a Node.js CLI tool that pulls public data from a GitHub organization, stores it in MongoDB, and provides useful summary/export commands.
The tool handles pagination, checkpoint resume, and GitHub rate limits automatically.

**Clone the Repository**

Step 1: git clone <a>[https://github.com/yourname/github-org-collector.git](https://github.com/ashish5433/cliForGitRepos.git)</a>

Note:Replace youname with your Github username

**Install Dependencies**

npm install

**Set up .env file**
Create a .env file with all the credentials provided in .env.example

**Steps To run commands**
Run npm link to make it global.

**Commands**

1.Init : orgpulse init

2.Fetch : orgpulse fetch <org> --since[dd-mm-yyyy]

3.Top : orgpulse top --org expressjs --metric stars --limit 5

4.Export : orgpulse export --org expressjs --out repos.csv

5.Sync-Stars: orgpulse sync-stars --org expressjs

**Feild-Mapping**

Mapping with RepoSchema

| GitHub Field        | DB Field   |
| ------------------- | ---------- |
| name                | name       |
| description         | description|
| topics              | topics     |
| forks_count         | forks      |
| stargazers_count    | stars      |
| open_issues_count   | openIssues |
| license.spdx_id     | license    |
| pushed_at           | pushedAt   |

Mapping of Issues

| GitHub Field    | DB Field |
| --------------- | -------- |
| repository.name | repo     |
| number          | number   |
| title           | title    |
| state           | state    |

**Debug Dairy**

Succesffuly handled rate limit by making it Sleep for required Time and resumes from where it last left.

<img width="1648" height="480" alt="image" src="https://github.com/user-attachments/assets/67136e6b-6326-4414-a525-7e04b21dde2e" />

**Pagination/Checkpoint Flow**
<img width="515" height="624" alt="image" src="https://github.com/user-attachments/assets/e0071f11-ba2c-4c67-a7bb-2bb0853d85f0" />

