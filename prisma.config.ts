import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

var databaseUrl = process.env.DATABASE_URL;
databaseUrl = databaseUrl?.replace('#', '%23');

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
    },
    engine: 'classic',
    datasource: {
        url: databaseUrl || '',
    },
});
