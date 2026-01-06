console.log("Running GitHub Action script...");
let commitMessage = process.argv[2];
if (commitMessage !== undefined) {
  console.log(commitMessage);
  let index = commitMessage.indexOf(":");
  if (index !== -1) {
    let jiraId = commitMessage.substring(0, index);
    let message = commitMessage.substring(index + 1).trim();
    console.log(`Jira ID: ${jiraId}`);
    console.log(`message: ${message}`);
  } else {
    console.log("Commit message not in expected format!");
  }
} else {
  console.log("No commit message provided.");
}
