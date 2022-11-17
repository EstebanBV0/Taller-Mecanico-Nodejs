import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Vehi,
  CambioRepuesto,
} from '../models';
import {VehiRepository} from '../repositories';

export class VehiCambioRepuestoController {
  constructor(
    @repository(VehiRepository) protected vehiRepository: VehiRepository,
  ) { }

  @get('/vehis/{id}/cambio-repuestos', {
    responses: {
      '200': {
        description: 'Array of Vehi has many CambioRepuesto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CambioRepuesto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CambioRepuesto>,
  ): Promise<CambioRepuesto[]> {
    return this.vehiRepository.cambioRepuestos(id).find(filter);
  }

  @post('/vehis/{id}/cambio-repuestos', {
    responses: {
      '200': {
        description: 'Vehi model instance',
        content: {'application/json': {schema: getModelSchemaRef(CambioRepuesto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehi.prototype.Placa,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CambioRepuesto, {
            title: 'NewCambioRepuestoInVehi',
            exclude: ['idCambioRepuesto'],
            optional: ['vehiId']
          }),
        },
      },
    }) cambioRepuesto: Omit<CambioRepuesto, 'idCambioRepuesto'>,
  ): Promise<CambioRepuesto> {
    return this.vehiRepository.cambioRepuestos(id).create(cambioRepuesto);
  }

  @patch('/vehis/{id}/cambio-repuestos', {
    responses: {
      '200': {
        description: 'Vehi.CambioRepuesto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CambioRepuesto, {partial: true}),
        },
      },
    })
    cambioRepuesto: Partial<CambioRepuesto>,
    @param.query.object('where', getWhereSchemaFor(CambioRepuesto)) where?: Where<CambioRepuesto>,
  ): Promise<Count> {
    return this.vehiRepository.cambioRepuestos(id).patch(cambioRepuesto, where);
  }

  @del('/vehis/{id}/cambio-repuestos', {
    responses: {
      '200': {
        description: 'Vehi.CambioRepuesto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CambioRepuesto)) where?: Where<CambioRepuesto>,
  ): Promise<Count> {
    return this.vehiRepository.cambioRepuestos(id).delete(where);
  }
}
