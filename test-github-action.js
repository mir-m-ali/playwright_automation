const EMAIL = `mir.ali1016@gmail.com`;
const API_TOKEN =
  "ATATT3xFfGF0GaESkO-Yy7mEar2Mrz-DJWEdvQBLzraTl7kMqV7zyPzrKCK3NwX46jHQUd_pgC9qv27U2LcAhkwo-nKMKWni0GowQALbPz6LGCIV3nPSIs7t4lJcQepCOgqCsZ_-U1jS6k3xLjwVfIPs1G55dHQCncrotINDSE85WE8QLBGhqB8=F3EDEF91";

const AUTH = Buffer.from(`${EMAIL}:${API_TOKEN}`).toString("base64");
const DOMAIN = `mirmali.atlassian.net`;

const BASE_URL = `https://${DOMAIN}/rest/api/3/issue/`;

async function updateJiraField(jiraId, message) {
  const bodyData = {
    fields: { customfield_10088: new Date().toISOString() + ": " + message },
  };
  const url = `https://${DOMAIN}/rest/api/3/issue/${jiraId}`;
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Basic ${AUTH}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

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
  const url = `https://${DOMAIN}/rest/api/3/issue/${jiraId}?fields=summary,status,assignee`;
  console.log(url);
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Basic ${AUTH}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    console.error(`Error---> ${response.statusText}`);
  }

  const data = await response.json();
  console.log(data);
}

async function readGoogle() {
  const response = await fetch(
    "https://www.googleapis.com/books/v1/volumes?q=isbn:0747532699",
    {
      method: "GET",
      headers: {
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
//runGitHubAction();
readGoogle();
