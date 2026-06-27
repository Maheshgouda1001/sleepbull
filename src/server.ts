import fs from 'fs/promises';
import path from 'path';
import { app } from './app';
import { env } from './config/env';
import { logger } from './config/logger';

async function bootstrap() {
  await fs.mkdir(path.resolve(process.cwd(), env.UPLOAD_DIR), { recursive: true });

  app.listen(env.PORT, () => {
    logger.info(`Sleepbull API listening on port ${env.PORT}`);
  });
}

void bootstrap();
