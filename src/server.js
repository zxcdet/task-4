import { config } from './common/config.js';
import { app } from './app.js';
import { connectDb } from './common/connect-db.js';

connectDb()
  .then(() => {
    console.log('Mysql connect!');
    app.listen(config.PORT, () =>
      console.log(`App is running on http://localhost:${config.PORT}`)
    );
  })
  .catch(err => {
    console.error('mysql error', err);
  });
