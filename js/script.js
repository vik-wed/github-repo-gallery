// variable targeting the profile info section of the site
let profileInfoSection = document.querySelector(".overview"); 
const username = "vik-wed";

// API connection
async function githubAPI(){
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    displayUserInfo(data)
    
}
githubAPI();

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
}