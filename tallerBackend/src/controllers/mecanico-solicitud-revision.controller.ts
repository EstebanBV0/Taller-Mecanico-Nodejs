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
  SolicitudRevision,
} from '../models';
import {MecanicoRepository} from '../repositories';

export class MecanicoSolicitudRevisionController {
  constructor(
    @repository(MecanicoRepository) protected mecanicoRepository: MecanicoRepository,
  ) { }

  @get('/mecanicos/{id}/solicitud-revisions', {
    responses: {
      '200': {
        description: 'Array of Mecanico has many SolicitudRevision',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudRevision)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudRevision>,
  ): Promise<SolicitudRevision[]> {
    return this.mecanicoRepository.solicitudRevisions(id).find(filter);
  }

  @post('/mecanicos/{id}/solicitud-revisions', {
    responses: {
      '200': {
        description: 'Mecanico model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudRevision)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mecanico.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudRevision, {
            title: 'NewSolicitudRevisionInMecanico',
            exclude: ['IdRevision'],
            optional: ['mecanicoId']
          }),
        },
      },
    }) solicitudRevision: Omit<SolicitudRevision, 'IdRevision'>,
  ): Promise<SolicitudRevision> {
    return this.mecanicoRepository.solicitudRevisions(id).create(solicitudRevision);
  }

  @patch('/mecanicos/{id}/solicitud-revisions', {
    responses: {
      '200': {
        description: 'Mecanico.SolicitudRevision PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudRevision, {partial: true}),
        },
      },
    })
    solicitudRevision: Partial<SolicitudRevision>,
    @param.query.object('where', getWhereSchemaFor(SolicitudRevision)) where?: Where<SolicitudRevision>,
  ): Promise<Count> {
    return this.mecanicoRepository.solicitudRevisions(id).patch(solicitudRevision, where);
  }

  @del('/mecanicos/{id}/solicitud-revisions', {
    responses: {
      '200': {
        description: 'Mecanico.SolicitudRevision DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudRevision)) where?: Where<SolicitudRevision>,
  ): Promise<Count> {
    return this.mecanicoRepository.solicitudRevisions(id).delete(where);
  }
}
