import {
  EntityManager,
  EntityName,
  EntitySchema,
  EntityData as MikroEntityData,
  FilterQuery as MikroFilterQuery,
  FindOptions as MikroFindOptions,
  Loaded as MikroLoaded,
  MikroORM,
  RequiredEntityData as MikroRequiredEntityData,
  Primary,
  QueryOrderMap,
  SerializeOptions,
  defineConfig,
  serialize,
  wrap,
} from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import {
  EntityData,
  FilterQuery,
  IFindOneOptions,
  IFindOptions,
  IMikroOrmConfig,
  IMikroOrmRepository,
  Loaded,
  RequiredEntityData,
  SortField,
} from "@ttt-module/infra";

export class MikroOrmRepository<T extends { id: number } = any>
  implements
    IMikroOrmRepository<
      T,
      EntityName<T>,
      EntityManager,
      MikroORM<PostgreSqlDriver>
    >
{
  orm: MikroORM<PostgreSqlDriver>;
  entityName: EntityName<T>;

  private _em!: EntityManager;

  get em(): EntityManager {
    if (!this._em) {
      throw new Error("Entity Manager must be initiated");
    }
    return this._em;
  }

  set em(em: EntityManager) {
    this._em = em;
  }

  get repo() {
    return this.em.getRepository(this.entityName);
  }

  async init(ormConfig: IMikroOrmConfig): Promise<void> {
    this.orm = await MikroORM.init({
      ...defineConfig({
        dbName: ormConfig.dbName,
        user: ormConfig.user,
        password: ormConfig.password,
        host: ormConfig.host,
        port: ormConfig.port,
        entities: ormConfig.entities.map((e) => new EntitySchema(e as never)),
      }),
      type: "postgresql",
      driver: PostgreSqlDriver,
    });

    const schemaGenerator = this.orm.getSchemaGenerator();
    if (!(await schemaGenerator.ensureDatabase())) {
      throw new Error("Database was not created");
    }
    await schemaGenerator.updateSchema();
    this._em = this.orm.em;
  }

  create(data: RequiredEntityData<T>): T {
    return this.repo.create(data as unknown as MikroRequiredEntityData<T>);
  }

  private mapLoaded(
    item: MikroLoaded<T> | null,
    options?: SerializeOptions<T>,
  ): Loaded<T> | null {
    if (!item) {
      return null;
    }
    const dto = serialize(item, { ...options, skipNull: true });
    const wrappedItem = wrap(item)
      .toReference()
      .getEntity() as unknown as Loaded<T>;
    wrappedItem.toJSON = () => dto;
    return wrappedItem;
  }

  async findOne(
    filter: FilterQuery<T>,
    options?: IFindOneOptions,
  ): Promise<Loaded<T> | null> {
    const populate = options?.populate as never[];
    const entityData = await this.repo.findOne(
      filter as unknown as MikroFilterQuery<T>,
      { populate },
    );
    return this.mapLoaded(entityData, { populate });
  }

  private mapLoadedArray(
    items: (MikroLoaded<T> | null)[],
    options?: SerializeOptions<T>,
  ): Loaded<T>[] {
    return items
      .map((item) => this.mapLoaded(item, options))
      .filter(Boolean) as Loaded<T>[];
  }

  async find(
    filter: FilterQuery<T>,
    options?: IFindOptions,
  ): Promise<Loaded<T>[]> {
    const populate = options?.populate as never[];
    const items = await this.repo.find(
      filter as unknown as MikroFilterQuery<T>,
      {
        populate,
        orderBy: options?.sortBy && this.getOrderBy(options.sortBy),
      },
    );
    return this.mapLoadedArray(items, { populate });
  }

  private getOrderBy(sort: SortField[]): QueryOrderMap<T> {
    const orderBy: QueryOrderMap<T> = {};
    for (const item of sort) {
      const [sortBy, sortDirection] = item.split(":");
      if (sortBy && sortDirection) {
        orderBy[sortBy] = sortDirection;
      }
    }
    return orderBy;
  }

  async findAndCount(
    filter: FilterQuery<T>,
    options?: IFindOptions,
  ): Promise<[Loaded<T>[], number]> {
    const populate = options?.populate as never[];
    const [items, total] = await this.repo.findAndCount(
      filter as unknown as MikroFilterQuery<T>,
      {
        populate: populate,
        offset: options?.offset,
        limit: options?.limit,
        orderBy: options?.sortBy && this.getOrderBy(options.sortBy),
      },
    );
    return [this.mapLoadedArray(items, { populate }), total];
  }

  async findAll(options: IFindOptions): Promise<Loaded<T>[]> {
    const populate = options?.populate as never[];
    const items = await this.repo.findAll({
      ...(options as MikroFindOptions<T>),
      populate,
      orderBy: options.sortBy && this.getOrderBy(options.sortBy),
    });
    return this.mapLoadedArray(items, { populate });
  }

  private getEntityRef(entity: T) {
    return this.em.getReference(this.entityName, entity.id as Primary<T>);
  }

  update(entity: T, data: EntityData<T>): T {
    const entityRef = this.getEntityRef(entity);
    wrap(entityRef).assign(data as unknown as MikroEntityData<T>);
    return entityRef;
  }

  remove(entity: T): void {
    const entityRef = this.getEntityRef(entity);
    this.repo.remove(entityRef);
  }

  save(...entities: T[]): Promise<void> {
    return this.repo.persistAndFlush(entities);
  }
}
