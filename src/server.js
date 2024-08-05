import { config } from './common/config.js';
import { app } from './app.js';

app.listen(config.PORT, () =>
  console.log(`App is running on http://localhost:${config.PORT}`)
);
