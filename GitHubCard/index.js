/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

axios.get('https://api.github.com/users/johnkirtley')
  .then(response => {
    return cards.append(newCard(response.data));
  })
  .catch(error => {
    console.log('Cannot get info', error);
  })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

const cards = document.querySelector('.cards');

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

axios.get('https://api.github.com/users/johnkirtley/followers')
  .then(response => {
    response.data.map(item => {
      axios.get(`https://api.github.com/users/${item.login}`)
        .then(response => {
          return cards.append(newCard(response.data));
        })
        .catch(errors => {
          console.log('Cannot get followers data', error);
        })
    })
  })
  .catch(error => {
    console.log('Cannot get followers', error);
  })





/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

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

function newCard(data) {
  const card = document.createElement('div'),
    userImg = document.createElement('img'),
    cardInfo = document.createElement('div'),
    name = document.createElement('h3'),
    userName = document.createElement('p'),
    location = document.createElement('p'),
    profile = document.createElement('p'),
    profileLink = document.createElement('a'),
    followers = document.createElement('p'),
    following = document.createElement('p'),
    bio = document.createElement('p'),
    githubCalendar = document.createElement('div');

  card.classList.add('card');
  name.classList.add('name');
  userName.classList.add('username');
  githubCalendar.classList.add('calendar');

  userImg.src = data.avatar_url;
  location.textContent = data.location;
  profile.textContent = 'Profile: '
  name.textContent = data.name;
  userName.textContent = data.login;
  profileLink.textContent = data.html_url;
  profileLink.href = data.html_url;
  profileLink.target = '_blank';
  followers.textContent = 'Followers: ' + data.followers;
  following.textContent = 'Following: ' + data.following;
  bio.textContent = 'Bio: ' + checkIfNull(data.bio);

  function checkIfNull(input) {
    if (input === null) {
      return 'No Bio Available';
    } else {
      return data.bio;
    }
  }

  // githubCalendar.src = GitHubCalendar('.calendar', 'johnkirtley', {
  //   responsive: true,
  // });

  card.append(userImg);
  card.append(cardInfo);
  cardInfo.append(name);
  cardInfo.append(userName);
  cardInfo.append(location);
  profile.append(profileLink);
  cardInfo.append(profile);
  cardInfo.append(followers);
  cardInfo.append(following);
  cardInfo.append(bio);
  // cardInfo.append(githubCalendar);



  return card;

}

// console.log(new Date(1579218148 * 1000));