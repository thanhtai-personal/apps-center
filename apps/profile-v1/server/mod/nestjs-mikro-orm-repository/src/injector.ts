import { Provider } from "@nestjs/common";
import { ConfigService, registerAs } from "@nestjs/config";
import {
  BaseEntity,
  IMikroOrmConfig,
  IMikroOrmRepository,
  IRepository,
  IService,
} from "@ttt-module/infra";
import { AnyClass } from "@ttt/utils";

function mapValue<TMappedValue = AnyClass>(
  mapper: Record<string, TMappedValue>,
  key: string,
) {
  const mappedValue = mapper[key];
  if (!mappedValue) throw new Error(`Could not map value of ${key}`);
  return mappedValue;
}

export function defineConfig(
  configKey: string,
  config: Omit<IMikroOrmConfig, "entities"> & {
    entities: AnyClass<BaseEntity>[];
  },
) {
  return registerAs(
    configKey,
    (): IMikroOrmConfig => ({
      ...config,
      entities: config.entities.map((Entity) =>
        new Entity().fromtttToMikroOrm(),
      ),
    }),
  );
}

export function registerMikroOrmRepository(options: {
  ormRepository: AnyClass<IMikroOrmRepository>;
  ormConfigKey: string;
  serviceMapper: Record<string, AnyClass<IService>>;
  repositoryMapper: Record<string, AnyClass<IMikroOrmRepository>>;
  entityMapper: Record<string, AnyClass<BaseEntity>>;
}): Provider[] {
  const {
    ormRepository,
    serviceMapper,
    repositoryMapper,
    entityMapper,
    ormConfigKey,
  } = options;
  const ormRepoToken = `orm_repo_${ormConfigKey}`;
  const ormRepoProviders: Provider[] = [
    {
      provide: ormRepoToken,
      async useFactory(
        ormRepo: IMikroOrmRepository,
        configService: ConfigService,
      ) {
        const ormConfig =
          configService.getOrThrow<IMikroOrmConfig>(ormConfigKey);
        await ormRepo.init(ormConfig);
        return ormRepo;
      },
      inject: [ormRepository, ConfigService],
    },
    ormRepository,
  ];

  const mappedResources = Object.keys(entityMapper).map((key) =>
    key.replace("Entity", "").trim().toPascalCase(),
  );
  const serviceRepoProviders: Provider[] = mappedResources
    .map<Provider[]>((resource: string) => {
      const entity = mapValue(entityMapper, `${resource}Entity`);
      const service = mapValue(serviceMapper, `I${resource}Service`);
      const repo = mapValue(repositoryMapper, `${resource}Repository`);
      const serviceRepoToken = `repo_${service.name}`;
      const serviceToken = `service_${service.name}`;
      const entityName = entity && new entity().getName();
      return [
        {
          provide: serviceRepoToken,
          useFactory(
            serviceRepo: IMikroOrmRepository,
            ormRepo: IMikroOrmRepository,
          ) {
            serviceRepo.em = ormRepo.em.fork();
            entityName && (serviceRepo.entityName = entityName);
            return serviceRepo;
          },
          inject: [
            repo,
            {
              token: ormRepoToken,
              optional: false,
            },
          ],
        },
        repo,
        {
          provide: serviceToken,
          useFactory(service: IService, repo: IRepository) {
            service.repository = repo;
            return service;
          },
          inject: [service, { token: serviceRepoToken, optional: false }],
        },
      ];
    })
    .flat();
  return [...ormRepoProviders, ...serviceRepoProviders];
}
