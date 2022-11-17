import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Mecanico, MecanicoRelations, SolicitudRevision, Revisiones} from '../models';
import {SolicitudRevisionRepository} from './solicitud-revision.repository';
import {RevisionesRepository} from './revisiones.repository';

export class MecanicoRepository extends DefaultCrudRepository<
  Mecanico,
  typeof Mecanico.prototype.id,
  MecanicoRelations
> {

  public readonly solicitudRevisions: HasManyRepositoryFactory<SolicitudRevision, typeof Mecanico.prototype.id>;

  public readonly revisiones: HasManyRepositoryFactory<Revisiones, typeof Mecanico.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudRevisionRepository') protected solicitudRevisionRepositoryGetter: Getter<SolicitudRevisionRepository>, @repository.getter('RevisionesRepository') protected revisionesRepositoryGetter: Getter<RevisionesRepository>,
  ) {
    super(Mecanico, dataSource);
    this.revisiones = this.createHasManyRepositoryFactoryFor('revisiones', revisionesRepositoryGetter,);
    this.registerInclusionResolver('revisiones', this.revisiones.inclusionResolver);
    this.solicitudRevisions = this.createHasManyRepositoryFactoryFor('solicitudRevisions', solicitudRevisionRepositoryGetter,);
    this.registerInclusionResolver('solicitudRevisions', this.solicitudRevisions.inclusionResolver);
  }
}
