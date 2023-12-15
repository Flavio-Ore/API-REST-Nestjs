import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)

  // Do validations

  app.setGlobalPrefix('api/v1')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //if the request has a property that is not in the DTO, it will be ignored
      forbidNonWhitelisted: true, //if the request has a property that is not in the DTO, it will throw an error
      transform: true, //transform the request body to the DTO type
    }),
  )

  await app.listen(parseInt(process.env.PORT) || 3000)
}
bootstrap()
