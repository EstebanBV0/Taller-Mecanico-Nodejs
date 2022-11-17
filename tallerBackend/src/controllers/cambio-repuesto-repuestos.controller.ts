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
  CambioRepuesto,
  Repuestos,
} from '../models';
import {CambioRepuestoRepository} from '../repositories';

export class CambioRepuestoRepuestosController {
  constructor(
    @repository(CambioRepuestoRepository) protected cambioRepuestoRepository: CambioRepuestoRepository,
  ) { }

  @get('/cambio-repuestos/{id}/repuestos', {
    responses: {
      '200': {
        description: 'Array of CambioRepuesto has many Repuestos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Repuestos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Repuestos>,
  ): Promise<Repuestos[]> {
    return this.cambioRepuestoRepository.repuestos(id).find(filter);
  }

  @post('/cambio-repuestos/{id}/repuestos', {
    responses: {
      '200': {
        description: 'CambioRepuesto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Repuestos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CambioRepuesto.prototype.idCambioRepuesto,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repuestos, {
            title: 'NewRepuestosInCambioRepuesto',
            exclude: ['idRepuesto'],
            optional: ['cambioRepuestoId']
          }),
        },
      },
    }) repuestos: Omit<Repuestos, 'idRepuesto'>,
  ): Promise<Repuestos> {
    return this.cambioRepuestoRepository.repuestos(id).create(repuestos);
  }

  @patch('/cambio-repuestos/{id}/repuestos', {
    responses: {
      '200': {
        description: 'CambioRepuesto.Repuestos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Repuestos, {partial: true}),
        },
      },
    })
    repuestos: Partial<Repuestos>,
    @param.query.object('where', getWhereSchemaFor(Repuestos)) where?: Where<Repuestos>,
  ): Promise<Count> {
    return this.cambioRepuestoRepository.repuestos(id).patch(repuestos, where);
  }

  @del('/cambio-repuestos/{id}/repuestos', {
    responses: {
      '200': {
        description: 'CambioRepuesto.Repuestos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Repuestos)) where?: Where<Repuestos>,
  ): Promise<Count> {
    return this.cambioRepuestoRepository.repuestos(id).delete(where);
  }
}
