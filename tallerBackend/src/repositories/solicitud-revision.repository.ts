import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {SolicitudRevision, SolicitudRevisionRelations, Revisiones, Vehi} from '../models';
import {RevisionesRepository} from './revisiones.repository';
import {VehiRepository} from './vehi.repository';

export class SolicitudRevisionRepository extends DefaultCrudRepository<
  SolicitudRevision,
  typeof SolicitudRevision.prototype.IdRevision,
  SolicitudRevisionRelations
> {

  public readonly revisiones: HasOneRepositoryFactory<Revisiones, typeof SolicitudRevision.prototype.IdRevision>;

  public readonly vehi: HasOneRepositoryFactory<Vehi, typeof SolicitudRevision.prototype.IdRevision>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RevisionesRepository') protected revisionesRepositoryGetter: Getter<RevisionesRepository>, @repository.getter('VehiRepository') protected vehiRepositoryGetter: Getter<VehiRepository>,
  ) {
    super(SolicitudRevision, dataSource);
    this.vehi = this.createHasOneRepositoryFactoryFor('vehi', vehiRepositoryGetter);
    this.registerInclusionResolver('vehi', this.vehi.inclusionResolver);
    this.revisiones = this.createHasOneRepositoryFactoryFor('revisiones', revisionesRepositoryGetter);
    this.registerInclusionResolver('revisiones', this.revisiones.inclusionResolver);
  }
}
