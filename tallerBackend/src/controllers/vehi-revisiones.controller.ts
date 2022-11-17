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
  Revisiones,
} from '../models';
import {VehiRepository} from '../repositories';

export class VehiRevisionesController {
  constructor(
    @repository(VehiRepository) protected vehiRepository: VehiRepository,
  ) { }

  @get('/vehis/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Array of Vehi has many Revisiones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Revisiones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Revisiones>,
  ): Promise<Revisiones[]> {
    return this.vehiRepository.revisiones(id).find(filter);
  }

  @post('/vehis/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Vehi model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revisiones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehi.prototype.Placa,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {
            title: 'NewRevisionesInVehi',
            exclude: ['idrevision'],
            optional: ['vehiId']
          }),
        },
      },
    }) revisiones: Omit<Revisiones, 'idrevision'>,
  ): Promise<Revisiones> {
    return this.vehiRepository.revisiones(id).create(revisiones);
  }

  @patch('/vehis/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Vehi.Revisiones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {partial: true}),
        },
      },
    })
    revisiones: Partial<Revisiones>,
    @param.query.object('where', getWhereSchemaFor(Revisiones)) where?: Where<Revisiones>,
  ): Promise<Count> {
    return this.vehiRepository.revisiones(id).patch(revisiones, where);
  }

  @del('/vehis/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Vehi.Revisiones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Revisiones)) where?: Where<Revisiones>,
  ): Promise<Count> {
    return this.vehiRepository.revisiones(id).delete(where);
  }
}
