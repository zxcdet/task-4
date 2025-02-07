import { config } from './common/config.js';
import { app } from './app.js';
import { connectDb } from './common/connect-db.js';
import { prisma } from './common/prisma-client.js';

async function main() {
  try {
    await connectDb();
    await prisma.user.create({
      data: {
        name: 'admin',
        login: 'admin',
        password: 'admin'
      }
    });
    console.log('MySQL connected!');

    app.listen(config.PORT, () => {
      console.log(`App is running on http://localhost:${config.PORT}`);
    });
  } catch (err) {
    console.error('MySQL connection error:', err);
    console.error('mysql error', err);
  }
}

main();
