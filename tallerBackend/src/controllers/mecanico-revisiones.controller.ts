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
  Mecanico,
  Revisiones,
} from '../models';
import {MecanicoRepository} from '../repositories';

export class MecanicoRevisionesController {
  constructor(
    @repository(MecanicoRepository) protected mecanicoRepository: MecanicoRepository,
  ) { }

  @get('/mecanicos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Array of Mecanico has many Revisiones',
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
    return this.mecanicoRepository.revisiones(id).find(filter);
  }

  @post('/mecanicos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Mecanico model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revisiones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mecanico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {
            title: 'NewRevisionesInMecanico',
            exclude: ['idrevision'],
            optional: ['mecanicoId']
          }),
        },
      },
    }) revisiones: Omit<Revisiones, 'idrevision'>,
  ): Promise<Revisiones> {
    return this.mecanicoRepository.revisiones(id).create(revisiones);
  }

  @patch('/mecanicos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Mecanico.Revisiones PATCH success count',
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
    return this.mecanicoRepository.revisiones(id).patch(revisiones, where);
  }

  @del('/mecanicos/{id}/revisiones', {
    responses: {
      '200': {
        description: 'Mecanico.Revisiones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Revisiones)) where?: Where<Revisiones>,
  ): Promise<Count> {
    return this.mecanicoRepository.revisiones(id).delete(where);
  }
}
