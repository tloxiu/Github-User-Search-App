const themeModeSwitcher = document.querySelector(".theme-mode-switcher")
const themeModeNameDisplay = document.querySelector(".theme-mode-name");
const themeModeIcon = document.querySelector(".theme-mode-icon");
const searchInput = document.querySelector(".search-input");
const noResultsMessageElement = document.querySelector(".no-results-message");
const searchBtn = document.querySelector(".search-btn");
const profilePic = document.querySelector(".profile-picture");
const displayUsername = document.querySelector(".display-username");
const accountUsername = document.querySelector(".account-username");
const joinDateMobileTablet = document.querySelector(".join-date-mobile-tablet");
const joinDateDesktop = document.querySelector(".join-date-desktop");
const bioMobileTablet = document.querySelector(".bio-mobile-tablet");
const bioDesktop = document.querySelector(".bio-desktop");
const reposAmount = document.querySelector(".repos-amount");
const followersAmount = document.querySelector(".followers-amount");
const followingAmount = document.querySelector(".following-amount");
const userLocation = document.querySelector(".location");
const userWebsite = document.querySelector(".website");
const userTwitter = document.querySelector(".twitter");
const userCompany = document.querySelector(".company");
const appName = document.querySelector(".app-name");
const searchResultCard = document.querySelector(".search-result-card");
const userProfileSocials = document.querySelector(".user-profile-socials");
const website = document.querySelector(".website");



const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
handleColorSchemeChange(colorSchemeQuery);



function handleColorSchemeChange(event) {
    if (event.matches) {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
        themeModeNameDisplay.textContent = "Light";
        themeModeIcon.setAttribute("src", "assets/icon-sun.svg")

    } else {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
        themeModeNameDisplay.textContent = "Dark";
        themeModeIcon.setAttribute("src", "assets/icon-moon.svg")
    }
}

function toggleTheme(){
    if(themeModeNameDisplay.textContent === "Dark"){
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
        themeModeNameDisplay.textContent = "Light";
        themeModeIcon.setAttribute("src", "assets/icon-sun.svg")
    }
    else{
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        themeModeNameDisplay.textContent = "Dark";
        themeModeIcon.setAttribute("src", "assets/icon-moon.svg")
    }
}


function formatUserJoinedDate(dateIso) {
    let date = new Date(dateIso);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    
    return `Joined ${day} ${month} ${year}`;
}


function validateUsername(element, fetchData){
    if(fetchData){
        element.textContent = fetchData;
        element.classList.remove("not-available");
    }
    else{
        element.textContent = `Not available`;
        element.classList.add("not-available");
    }
}


function validateUserSocials(element, fetchData){
    if(fetchData){
        element.textContent = fetchData;
        element.parentNode.classList.remove("not-available");
    }
    else{
        element.textContent = `Not available`;
        element.parentNode.classList.add("not-available");
    }
}


function validateUserBio(element, fetchData){
    if(fetchData){
        element.textContent = fetchData;
        element.classList.remove("not-available");
    }
    else{
        element.textContent = `This profile has no bio`;
        element.classList.add("not-available");
    }
}


function checkDomainName(url) {
    let domain = url;
    userWebsite.setAttribute("href", domain);
    
    if (domain.startsWith("https://")) {
        domain = domain.substring(0, domain.indexOf("/", 8));
    }
    else if (!domain.startsWith("https://")){
        const formatDomain = `https://${domain}`
        userWebsite.setAttribute("href", formatDomain);
    }
    return domain;
}


function notAvailableSocials(userInfoSocial){
    if(!userInfoSocial.parentElement.classList.contains("not-available")){
        userInfoSocial.textContent = "Not available";
        userInfoSocial.parentElement.classList.add("not-available");
    }
    else return;
}


function fetchApi(){
    event.preventDefault();
    if(searchInput.value){
        const usernameInput = searchInput.value; 
        const apiUrl = `https://api.github.com/users/${usernameInput}`;
        
        fetch(apiUrl).then(response => {
            return response.json();
        }).then(userInfo => {
            noResultsMessageElement.classList.add("hidden");
            validateUsername(displayUsername, userInfo.name); 
            validateUserBio(bioDesktop, userInfo.bio);
            validateUserBio(bioMobileTablet, userInfo.bio);
            validateUserSocials(userLocation, userInfo.location);
            validateUserSocials(userWebsite, checkDomainName(userInfo.blog));
            validateUserSocials(userCompany, userInfo.company);
            validateUserSocials(userTwitter, userInfo.twitter_username);

            accountUsername.textContent = `@${userInfo.login}`;
            reposAmount.textContent = userInfo.public_repos;
            followersAmount.textContent = userInfo.followers;
            followingAmount.textContent = userInfo.following;
            profilePic.setAttribute("src", userInfo.avatar_url);

            joinDateDesktop.textContent = formatUserJoinedDate(userInfo.created_at);
            joinDateMobileTablet.textContent = formatUserJoinedDate(userInfo.created_at);

        }).catch(error => {
            console.log(error)
            noResultsMessageElement.classList.remove("hidden");
            accountUsername.textContent = "Not available";
            joinDateDesktop.textContent = "Not available";
            joinDateMobileTablet.textContent = "Not available";
            bioDesktop.textContent = "Not available";
            bioMobileTablet.textContent = "Not available";
            displayUsername.textContent = "Not available";
            reposAmount.textContent = "-";
            followersAmount.textContent = "-";
            followingAmount.textContent = "-";
            userTwitter.classList.remove("not-available");
            profilePic.setAttribute("src", "assets/github-mark.svg");
            notAvailableSocials(userLocation);
            notAvailableSocials(userCompany);
            notAvailableSocials(userTwitter);
            notAvailableSocials(userWebsite);
        });
    }
    else return;
}


themeModeSwitcher.addEventListener("click", toggleTheme);
searchBtn.addEventListener("click", fetchApi)
colorSchemeQuery.addEventListener("change", handleColorSchemeChange);

