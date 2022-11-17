import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vehi, VehiRelations, Revisiones, CambioRepuesto} from '../models';
import {RevisionesRepository} from './revisiones.repository';
import {CambioRepuestoRepository} from './cambio-repuesto.repository';

export class VehiRepository extends DefaultCrudRepository<
  Vehi,
  typeof Vehi.prototype.Placa,
  VehiRelations
> {

  public readonly revisiones: HasManyRepositoryFactory<Revisiones, typeof Vehi.prototype.Placa>;

  public readonly cambioRepuestos: HasManyRepositoryFactory<CambioRepuesto, typeof Vehi.prototype.Placa>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RevisionesRepository') protected revisionesRepositoryGetter: Getter<RevisionesRepository>, @repository.getter('CambioRepuestoRepository') protected cambioRepuestoRepositoryGetter: Getter<CambioRepuestoRepository>,
  ) {
    super(Vehi, dataSource);
    this.cambioRepuestos = this.createHasManyRepositoryFactoryFor('cambioRepuestos', cambioRepuestoRepositoryGetter,);
    this.registerInclusionResolver('cambioRepuestos', this.cambioRepuestos.inclusionResolver);
    this.revisiones = this.createHasManyRepositoryFactoryFor('revisiones', revisionesRepositoryGetter,);
    this.registerInclusionResolver('revisiones', this.revisiones.inclusionResolver);
  }
}
