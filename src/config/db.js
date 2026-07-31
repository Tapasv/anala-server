import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient(); // now instead of creating this in every service we have created a shared instance

export default prisma