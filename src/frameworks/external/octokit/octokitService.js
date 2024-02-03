const { Octokit } = require('octokit');

const octokitService = async (gitHubKey) => {
  const octokit = new Octokit({
    auth: gitHubKey,
  });

  return octokit;
};

module.exports = { octokitService };
