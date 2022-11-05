// variable targeting the profile info section of the site
let profileInfoSection = document.querySelector(".overview"); 
// variable targeting the ul that will populate public repos
let listOfRepos = document.querySelector(".repo-list");
let allReposContainer = document.querySelector(".repos");
let indRepoData = document.querySelector(".repo-data");

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
    const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoRes.json();
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

listOfRepos.addEventListener("click", function(e){
    if (e.target.matches("h3")){
        let repoName = e.target.innerText;
        getRepoInfo(repoName);

    }
})

async function getRepoInfo(repoName){
    let resRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    let repoInfo = await resRepoInfo.json();
    let fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    let languageData = await fetchLanguages.json();
    let languages = [];
    for (let language in languageData){
        languages.push(language);
    }
    displaySpecRepo(repoInfo, languages);
}

function displaySpecRepo(repoInfo, languages){
    indRepoData.innerHTML = "";
    indRepoData.classList.remove("hide");
    allReposContainer.classList.add("hide");
    let divElement = document.createElement("div");
    divElement.innerHTML = `
                                <h3>Name: ${repoInfo.name}</h3>
                                <p>Description: ${repoInfo.description}</p>
                                <p>Default Branch: ${repoInfo.default_branch}</p>
                                <p>Languages: ${languages.join(", ")}</p>
                                <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener"> View Repo on Github!</a>
                            `
    indRepoData.append(divElement);                            

}