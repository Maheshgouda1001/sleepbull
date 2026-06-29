type FindManyInput = {
  where?: Record<string, unknown>;
  include?: Record<string, unknown>;
  orderBy?: Record<string, unknown> | Array<Record<string, unknown>>;
  skip?: number;
  take?: number;
};

export class BaseRepository<TCreate = Record<string, unknown>, TUpdate = Record<string, unknown>> {
  constructor(private readonly delegate: any) {}

  findMany(input: FindManyInput = {}) {
    return this.delegate.findMany(input);
  }

  count(where: Record<string, unknown> = {}) {
    return this.delegate.count({ where });
  }

  findUnique(where: Record<string, unknown>, include?: Record<string, unknown>) {
    return this.delegate.findFirst({
      where,
      include
    });
  }

  create(data: TCreate, include?: Record<string, unknown>) {
    return this.delegate.create({ data, include });
  }

  update(where: Record<string, unknown>, data: TUpdate, include?: Record<string, unknown>) {
    return this.delegate.update({ where, data, include });
  }

  delete(where: Record<string, unknown>) {
    return this.delegate.delete({ where });
  }
}
