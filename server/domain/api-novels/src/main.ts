import { AppModule } from './modules/app/app.module';
import { EnvironmentConfig } from './config';
import { AppExceptionsFilter, ExceptionInterceptor, NEST_COMMON, NEST_CORE, NEST_SWAGGER } from "@core-api/nest-core";

async function bootstrap() {
  const app = await NEST_CORE.NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(new AppExceptionsFilter());
  app.useGlobalInterceptors(new ExceptionInterceptor(new NEST_CORE.Reflector()));
  const config = new NEST_SWAGGER.DocumentBuilder()
    .setTitle('Goat tap API')
    .setDescription('Goat Tap API description')
    .setVersion('1.0')
    .addTag('goatTap')
    .build();
  const document = NEST_SWAGGER.SwaggerModule.createDocument(app, config);
  NEST_SWAGGER.SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(EnvironmentConfig.PORT);
}
bootstrap();
