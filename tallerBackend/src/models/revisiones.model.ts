import {Entity, model, property} from '@loopback/repository';

@model()
export class Revisiones extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  idrevision?: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  nivelaceite: number;

  @property({
    type: 'string',
    required: true,
  })
  nivelliquidof: string;

  @property({
    type: 'string',
    required: true,
  })
  nivelRefrigerante: string;

  @property({
    type: 'string',
    required: true,
  })
  NivelLquidoDireccion: string;

  @property({
    type: 'string',
  })
  vehiId?: string;

  @property({
    type: 'string',
  })
  solicitudRevisionId?: string;

  @property({
    type: 'string',
  })
  mecanicoId?: string;

  constructor(data?: Partial<Revisiones>) {
    super(data);
  }
}

export interface RevisionesRelations {
  // describe navigational properties here
}

export type RevisionesWithRelations = Revisiones & RevisionesRelations;
