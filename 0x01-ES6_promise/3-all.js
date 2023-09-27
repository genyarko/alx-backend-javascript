import { uploadPhoto, createUser } from './utils.js';

function handleProfileSignup() {
  const promises = [uploadPhoto(), createUser()];

  Promise.all(promises)
    .then((responses) => {
      const [photoResponse, userResponse] = responses;
      console.log(`${photoResponse.body.firstName} ${userResponse.body.lastName}`);
    })
    .catch(() => {
      console.log('Signup system offline');
    });
}

handleProfileSignup();
