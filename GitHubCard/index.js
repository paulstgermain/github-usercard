import axios from 'axios';

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
const cardsDiv = document.querySelector('.cards');

axios.get('https://api.github.com/users/paulstgermain')
.then(result => {
    // console.log(result.data);
    // console.log(cardMaker(result.data));
    cardsDiv.append(cardMaker(result.data));
})

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = ['bigknell', 'dustinmyers'];

axios.get('https://api.github.com/users/paulstgermain/followers')
.then(result => {
    Array.from(result.data).forEach(item => {
      followersArray.unshift(item.login);
    })
  }).then(result => {
    followersArray.forEach(item => {
      axios.get(`https://api.github.com/users/${item}`)
      .then(result => {
        cardsDiv.append(cardMaker(result.data));
      })
    })
  })

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/


function cardMaker(data){
  // CREATE ALL CARD ELEMENTS
  const card = document.createElement('div');
  const profileImage = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const username = document.createElement('p');
  const location = document.createElement('p');
  const profileLink = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');
  // PUT THE PIECES TOGETHER WITH APPEND
  card.append(profileImage);
  card.append(cardInfo);
  cardInfo.append(name);
  cardInfo.append(username);
  cardInfo.append(location);
  cardInfo.append(profileLink);
  cardInfo.append(followers);
  cardInfo.append(following);
  cardInfo.append(bio);
  // ADD NECESSARY CLASSES
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  username.classList.add('username');
  // PULL THE USER INFO FROM API AND PLACE IN CARD
  profileImage.setAttribute('src', data.avatar_url);
  name.innerText = data.name;
  username.innerText = data.login;
  location.innerText = `Location: ${data.location}`;
  profileLink.setAttribute('href', data.html_url);
  profileLink.innerText = 'Profile';
  followers.innerText = `Followers: ${data.followers}`;
  following.innerText = `Following: ${data.following}`;
  bio.innerText = `Bio: ${data.bio}`;

  return card;

    // cardDiv.innerHTML = `
    // <div class="card">
    //   <img src="${data.avatar_url}" />
    //   <div class="card-info">
    //     <h3 class="name">${data.name}</h3>
    //     <p class="username">${data.login}</p>
    //     <p>Location: ${data.location}</p>
    //     <p>Profile:
    //       <a href="${data.html_url}">${data.html_url}</a>
    //     </p>
    //     <p>Followers: ${data.followers}</p>
    //     <p>Following: ${data.following}</p>
    //     <p>Bio: ${data.bio}</p>
    //   </div>
    // </div>
    // `;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
