import { prisma } from '../common/prisma-client.js';
import bcrypt from 'bcrypt';

export const prismaSaveMiddleware = () => {
  prisma.$use(async (params, next) => {
    if (
      params.model === 'User' &&
      (params.action === 'create' || params.action === 'update')
    ) {
      if (params.args.data.password) {
        // eslint-disable-next-line require-atomic-updates
        params.args.data.password = await bcrypt.hash(
          params.args.data.password,
          10
        );
      }
    }

    return next(params);
  });
};
