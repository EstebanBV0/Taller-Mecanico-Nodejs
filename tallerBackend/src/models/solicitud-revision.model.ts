import {Entity, model, property, hasOne} from '@loopback/repository';
import {Revisiones} from './revisiones.model';
import {Vehi} from './vehi.model';

@model()
export class SolicitudRevision extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  IdRevision?: string;

  @property({
    type: 'string',
    required: true,
  })
  Estado: string;

  @hasOne(() => Revisiones)
  revisiones: Revisiones;

  @hasOne(() => Vehi)
  vehi: Vehi;

  @property({
    type: 'string',
  })
  mecanicoId?: string;

  constructor(data?: Partial<SolicitudRevision>) {
    super(data);
  }
}

export interface SolicitudRevisionRelations {
  // describe navigational properties here
}

export type SolicitudRevisionWithRelations = SolicitudRevision & SolicitudRevisionRelations;
