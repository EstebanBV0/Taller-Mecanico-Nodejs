/* eslint-disable @typescript-eslint/no-unused-vars */
import {Entity, model, property, hasMany} from '@loopback/repository';
import {Revisiones} from './revisiones.model';
import {CambioRepuesto} from './cambio-repuesto.model';

@model()
export class Vehi extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
    jsonSchema: {
      maxLength: 6,
      minLength: 6,
      errorMessage: 'La placa debe tener 6 caracteres',
      transform: ['toUpperCase'],
      pattern: "([A-Z]{3}[0-9]{3})"

    },
  })
  Placa: string;

  @property({
    type: 'string',
    required: true,
  })
  Marca: string;

  @property({
    type: 'string',
    required: true,
  })
  Tipo: string;



  @property({
    type: 'number',
    required: true,
  })
  Modelo: number;

  @property({
    type: 'number',
    required: true,
  })
  Pasajeros: number;

  @property({
    type: 'number',
    required: true,
  })
  Cilindraje: number;

  @property({
    type: 'string',
    required: true,
  })
  PaisOrigen: string;

  @property({
    type: 'string',
    required: false,
    jsonSchema: {
      maxLength: 15,
      minLength: 5,
      errorMessage: 'Las caracteristicas deben tener entre 5 y 10 caracteres',
    },
  })
  Caracteristicas: string;

  @property({
    type: 'string',
    required: true,
    unique: true,
  })
  propietarioId: string;

  @hasMany(() => Revisiones)
  revisiones: Revisiones[];

  @property({
    type: 'string',
  })
  solicitudRevisionId?: string;

  @hasMany(() => CambioRepuesto)
  cambioRepuestos: CambioRepuesto[];

  constructor(data?: Partial<Vehi>) {
    super(data);
  }
}

export interface VehiRelations {
  // describe navigational properties here
}

export type VehiWithRelations = Vehi & VehiRelations;
