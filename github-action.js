async function runGitHubAction() {
  console.log("Running GitHub Action script...");
  let commitMessage = process.argv[2];
  console.log(`arguments passed to script: ${process.argv.length}`);
  if (commitMessage !== undefined) {
    console.log(commitMessage);
    let index = commitMessage.indexOf(":");
    if (index !== -1) {
      let jiraId = commitMessage.substring(0, index);
      let message = commitMessage.substring(index + 1).trim();
      console.log(`Jira ID: ${jiraId}`);
      console.log(`message: ${message}`);
      await updateJiraField(jiraId, message);
    } else {
      console.log("Commit message not in expected format!");
    }
  } else {
    console.log("No commit message provided.");
  }
}

const EMAIL = `mir.ali1016@gmail.com`;
const API_TOKEN =
  "ATATT3xFfGF0GaESkO-Yy7mEar2Mrz-DJWEdvQBLzraTl7kMqV7zyPzrKCK3NwX46jHQUd_pgC9qv27U2LcAhkwo-nKMKWni0GowQALbPz6LGCIV3nPSIs7t4lJcQepCOgqCsZ_-U1jS6k3xLjwVfIPs1G55dHQCncrotINDSE85WE8QLBGhqB8=F3EDEF91";
//process.env.JIRA_API_TOKEN;

console.log(`token: ${API_TOKEN}`);

const AUTH = Buffer.from(`${EMAIL}:${API_TOKEN}`).toString("base64");
const DOMAIN = `mirmali.atlassian.net`;

async function updateJiraField(jiraId, message) {
  const bodyData = {
    fields: { customfield_10088: new Date().toISOString() + ": " + message },
  };
  try {
    const response = await fetch(
      `https://${DOMAIN}/rest/api/3/issue/${jiraId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Basic ${AUTH}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }
    );

    if (response.status === 204) console.log("Jira issue updated successfully");
    else {
      const error = await response.text();
      console.error(`Error ${response.status}: ${error}`);
    }
  } catch (err) {
    console.log("Fetch error:", err);
  }
}

async function getJiraTicketDetails(jiraId) {
  const response = await fetch(
    `https://${DOMAIN}/rest/api/3/issue/${jiraId}?fields=summary,status,assignee`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${AUTH}`,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    console.error(`Error---> ${response.statusText}`);
  }

  const data = await response.json();
  console.log(data);
}

//getJiraTicketDetails("PAP-3");
runGitHubAction();
