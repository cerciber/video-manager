// Imports
const response = require('@src/adapters/presenters/response');

// Get top organization repositories
async function getTopOrganizationRespositoriesCase(
  apiManagement,
  organization,
  topNumber
) {
  // Initial data
  let page = 1;
  const promises = [];

  // Get num of request to get all repositories information
  const organizationDataResult = await apiManagement.request(
    `GET /orgs/${organization}`,
    {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  );
  const numOfRequests = Math.ceil(
    organizationDataResult.data.public_repos / 100
  );

  // Get complete data of repositoires (GitHub API REST currenlty no allow configurate order by starts)
  while (page <= numOfRequests) {
    // Get repositories per each page
    const promise = apiManagement.request('GET /orgs/google/repos', {
      per_page: 100,
      page,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    // Add respositories promises to total list
    promises.push(promise);

    // Go to next page
    page += 1;
  }

  // Wait to all request finish
  const results = await Promise.all(promises);

  // create a ist with total results
  const allRepos = await results.reduce(
    (acc, result) => {
      if (result.data.length !== 0) {
        acc.allRepos = acc.allRepos.concat(result.data);
      }
      return acc;
    },
    { allRepos: [] }
  ).allRepos;

  // Order respositories by starts
  const sortedRepos = allRepos.sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  );

  // Get top repositories
  const popularRepos = sortedRepos.slice(0, topNumber);

  // Get format top repositories
  let number = 0;
  const formatPopularRepos = popularRepos.map((repo) => {
    number += 1;
    return {
      number,
      id: repo.id,
      name: repo.name,
      description: repo.description ?? '',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
    };
  });

  // Return response
  return response.success(200, 'Top repositories retrieved successfully.', {
    repositories: formatPopularRepos,
  });
}

// Exports
module.exports = {
  getTopOrganizationRespositoriesCase,
};
