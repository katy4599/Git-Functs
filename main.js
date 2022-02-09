import got from 'got';

/**
 * Get a user's repos off of GitHub
 * @param {string} username 
 * @param {function} callback This will return an error and an array of repositories
 * Documentation: https://docs.github.com/en/rest/reference/repos#list-repositories-for-a-user
 */
async function github(username, callback) {
    let err, data;
    try {
        const resp = got(`https://api.github.com/users/${username}/repos`)
        data = await resp.json();
        callback(err, data);
    } catch (err) {
        callback(err, data)
    }
}

function main() {
    github('dylhack', (error, projects) => {
        if (error != undefined) {
            console.log(error.message);
            return;
        }
        const sorted = projects.sort((projectA, projectB) => {
            if(projectA.stargazers_count > projectB.stargazers_count) { 
                return -1; 
            } else if(projectA.stargazers_count < projectB.stargazers_count) { 
                return 1; 
            } else {
                return 0;
            }
        });

        for (let project of sorted) {
            console.log(`Project ${project.name} has ${project.stargazers_count} stars.`)
        }
    });
}

main();