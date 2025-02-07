import { prisma } from './prisma-client.js';

export const connectDb = async () => {
  return await prisma.$connect();
};
