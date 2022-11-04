// variable targeting the profile info section of the site
let profileInfoSection = document.querySelector(".overview"); 
// variable targeting the ul that will populate public repos
let listOfRepos = document.querySelector(".repo-list");

const username = "vik-wed";

// API connection
async function fetchUserData(){
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data)
    
}
fetchUserData();

function displayUserInfo(data){
    let div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
                        <img alt ="user avatar" src=${data.avatar_url} />
                    </figure>
                    <div>
                        <p><strong>Name:</strong> ${data.name}</p>
                        <p><strong>Bio:</strong> ${data.bio}</p>
                        <p><strong>Location:</strong> ${data.location}</p>
                        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
                    </div>`;
    profileInfoSection.append(div);
    fetchRepoData();
}

async function fetchRepoData(){
    const repoInfo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoInfo.json();
    displayRepoInfo(repoData);

}

function displayRepoInfo(repoData){
    for (let repo of repoData){
        let li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        listOfRepos.append(li);

    }
}