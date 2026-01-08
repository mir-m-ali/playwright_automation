const EMAIL = `mir.ali1016@gmail.com`;
const API_TOKEN =
  "ATATT3xFfGF0wKEPj0unAyVPAcGvr9tkc0ircHiEOKYDpaCDe11N8Cp2fWxL3gAbATS74xo5L3Wk4bRDnKenSBPvaa_msinVnBY1HGAe3FGiaRnwukVnBHsO8q2fGwxIeCS4U-PMgEHmJWYGO7Hvpw9bwr2DGH5M-lTF0CJeNTS3tM8hbOpjToM=48BA20F7";

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
    console.error(`Error---> ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  console.log(data);
}

getJiraTicketDetails("PAP-3");
