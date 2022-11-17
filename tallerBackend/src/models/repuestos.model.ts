import {Entity, model, property} from '@loopback/repository';

@model()
export class Repuestos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  idRepuesto: string;

  @property({
    type: 'string',
    required: true,
  })
  NombreRepuesto: string;

  @property({
    type: 'number',
    required: true,
  })
  Precio: number;

  @property({
    type: 'string',
  })
  cambioRepuestoId?: string;

  constructor(data?: Partial<Repuestos>) {
    super(data);
  }
}

export interface RepuestosRelations {
  // describe navigational properties here
}

export type RepuestosWithRelations = Repuestos & RepuestosRelations;
