import { EnvironmentConfig } from './config';
import { AppExceptionsFilter, ExceptionInterceptor, NEST_CORE, NEST_SWAGGER } from "@core-api/nest-core";
import cookieParser from 'cookie-parser';
import { AppModule } from "./modules/app/app.module";

async function bootstrap() {
  const app = await NEST_CORE.NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new AppExceptionsFilter());
  app.useGlobalInterceptors(new ExceptionInterceptor(new NEST_CORE.Reflector()));
  const config = new NEST_SWAGGER.DocumentBuilder()
    .setTitle('Gateway API')
    .setDescription('Gateway API description')
    .setVersion('1.0')
    .addTag('Gateway')
    .build();
  const document = NEST_SWAGGER.SwaggerModule.createDocument(app, config);
  NEST_SWAGGER.SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.use(cookieParser());
  await app.listen(EnvironmentConfig.PORT);
}
bootstrap();
