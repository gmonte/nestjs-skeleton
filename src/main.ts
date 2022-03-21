import {
  Logger,
  NestApplicationOptions,
  ValidationPipe
} from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import {
  SwaggerModule,
  DocumentBuilder
} from '@nestjs/swagger'
import * as compression from 'compression'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'

import { version } from '../package.json'
import { AppModule } from './app.module'

async function bootstrap () {
  const logger = new Logger('Bootstrap Logger')

  const nestAppOptions: NestApplicationOptions = { logger }

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    nestAppOptions
  )

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      disableErrorMessages: false
    })
  )

  app.setGlobalPrefix('api')
  app.enableCors({ origin: '*' })
  // secure app by setting various HTTP headers.
  app.use(helmet())

  // enable gzip compression.
  app.use(compression())

  // protect app from brute-force attacks
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minute (in milliseconds)
      max: 100 // limit each IP to 100 requests per windowMs
    })
  )

  const options = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion(version)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header'
    })
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  // listen on port
  const port = process.env.PORT || 3030

  await app.listen(port, () =>
    logger.log(`Application listening on port ${ port }`)
  )
}

void bootstrap()
