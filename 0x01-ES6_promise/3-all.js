import uploadPhoto from './utils.js';
import createUser from './utils.js';

function handleProfileSignup() {
  const uploadPromise = uploadPhoto('photo-profile-1');
  const createUserPromise = createUser('Guillaume', 'Salva');

  Promise.all([uploadPromise, createUserPromise])
    .then((values) => {
      const body = values[0];
      const firstName = values[1].firstName;
      const lastName = values[1].lastName;

      console.log(`${body} ${firstName} ${lastName}`);
    })
    .catch((error) => {
      console.log('Signup system offline');
    });
}

export default handleProfileSignup;
