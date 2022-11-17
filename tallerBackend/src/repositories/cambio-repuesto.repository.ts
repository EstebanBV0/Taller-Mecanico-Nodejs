import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CambioRepuesto, CambioRepuestoRelations, Repuestos} from '../models';
import {RepuestosRepository} from './repuestos.repository';

export class CambioRepuestoRepository extends DefaultCrudRepository<
  CambioRepuesto,
  typeof CambioRepuesto.prototype.idCambioRepuesto,
  CambioRepuestoRelations
> {

  public readonly repuestos: HasManyRepositoryFactory<Repuestos, typeof CambioRepuesto.prototype.idCambioRepuesto>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RepuestosRepository') protected repuestosRepositoryGetter: Getter<RepuestosRepository>,
  ) {
    super(CambioRepuesto, dataSource);
    this.repuestos = this.createHasManyRepositoryFactoryFor('repuestos', repuestosRepositoryGetter,);
    this.registerInclusionResolver('repuestos', this.repuestos.inclusionResolver);
  }
}
