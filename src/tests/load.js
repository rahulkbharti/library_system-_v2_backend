import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/users/student';
const TOTAL_REQUESTS = 5000;
const MAX_CONCURRENT = 5;

async function run() {
  let active = 0;
  let i = 0;

  return new Promise((resolve, reject) => {
    function next() {
      while (active < MAX_CONCURRENT && i < TOTAL_REQUESTS) {
        active++;
        const current = i++;
        fetch(BASE_URL)
          .then(res => res.text())
          .then(body => {
            console.log(`Request #${current+1} done`);
          })
          .catch(err => {
            console.error(`Request #${current+1} failed:`, err.message);
          })
          .finally(() => {
            active--;
            if (i < TOTAL_REQUESTS) {
              next();
            } else if (active === 0) {
              resolve();
            }
          });
      }
    }
    next();
  });
}

run().then(() => console.log('All requests done 🚀'));
