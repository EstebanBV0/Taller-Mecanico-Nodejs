import {Entity,  model, property} from '@loopback/repository';

@model()
export class Propietario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
    jsonSchema: {
      maxLength: 10,
      minLength: 10,
      errorMessage: 'La cedula debe ser de 10 digitos',
      pattern: "[0-9]"

    },

  })
  Cedula?: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 10,
      minLength: 3,
      errorMessage: 'El nombre debe tener un máximo de 10 caracteres',
      pattern: "^[A-Za-z\\s]*$"

    },
  })
  Nombre: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 20,
      minLength: 3,
      errorMessage: 'El apellido debe tener un máximo de 10 caracteres',
      pattern: "^[A-Za-z\\s]*$"

    },
  })
  Apellidos: string;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      maxLength: 10,
      minLength: 10,
      errorMessage: 'El telefono debe teenr 10 digitos',
      pattern: "[0-9]"

    },
  })
  NumeroTelefono: number;

  @property({
    type: 'date',
    default: 1950,
    jsonSchema: {
      format: 'date'
     },

  })
  FechaNacimiento?: string;

  @property({
    type: 'string',
    required: true,
  })
  CiudadResidencia: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
     format: 'email'
    },
  })
  Correo: string;


}

export interface PropietarioRelations {
  // describe navigational properties here
}

export type PropietarioWithRelations = Propietario & PropietarioRelations;
