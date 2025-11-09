import { PrismaClient } from '../generated/prisma/client';
import 'dotenv/config';

declare global {
    var prisma: PrismaClient;
}

var databaseUrl = process.env.DATABASE_URL;
databaseUrl = databaseUrl?.replace('#', '%23');

export const prisma =
    global.prisma ??
    new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
        datasources: {
            db: {
                url: databaseUrl,
            },
        },
    });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
