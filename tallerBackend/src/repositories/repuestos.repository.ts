import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Repuestos, RepuestosRelations} from '../models';

export class RepuestosRepository extends DefaultCrudRepository<
  Repuestos,
  typeof Repuestos.prototype.idRepuesto,
  RepuestosRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Repuestos, dataSource);
  }
}
