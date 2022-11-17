import {Entity, hasMany, model, property} from '@loopback/repository';
import {Repuestos} from './repuestos.model';

@model()
export class CambioRepuesto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  idCambioRepuesto: string;

  @property({
    type: 'date',
    required: true,
  })
  FechaHora: string;

  @hasMany(() => Repuestos)
  repuestos: Repuestos[];

  @property({
    type: 'string',
  })
  vehiId?: string;

  constructor(data?: Partial<CambioRepuesto>) {
    super(data);
  }
}

export interface CambioRepuestoRelations {
  // describe navigational properties here
}

export type CambioRepuestoWithRelations = CambioRepuesto & CambioRepuestoRelations;
