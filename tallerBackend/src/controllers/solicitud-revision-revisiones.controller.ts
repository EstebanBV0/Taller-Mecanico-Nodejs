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
  SolicitudRevision,
  Revisiones,
} from '../models';
import {SolicitudRevisionRepository} from '../repositories';

export class SolicitudRevisionRevisionesController {
  constructor(
    @repository(SolicitudRevisionRepository) protected solicitudRevisionRepository: SolicitudRevisionRepository,
  ) { }

  @get('/solicitud-revisions/{id}/revisiones', {
    responses: {
      '200': {
        description: 'SolicitudRevision has one Revisiones',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Revisiones),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Revisiones>,
  ): Promise<Revisiones> {
    return this.solicitudRevisionRepository.revisiones(id).get(filter);
  }

  @post('/solicitud-revisions/{id}/revisiones', {
    responses: {
      '200': {
        description: 'SolicitudRevision model instance',
        content: {'application/json': {schema: getModelSchemaRef(Revisiones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof SolicitudRevision.prototype.IdRevision,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Revisiones, {
            title: 'NewRevisionesInSolicitudRevision',
            exclude: ['idrevision'],
            optional: ['solicitudRevisionId']
          }),
        },
      },
    }) revisiones: Omit<Revisiones, 'idrevision'>,
  ): Promise<Revisiones> {
    return this.solicitudRevisionRepository.revisiones(id).create(revisiones);
  }

  @patch('/solicitud-revisions/{id}/revisiones', {
    responses: {
      '200': {
        description: 'SolicitudRevision.Revisiones PATCH success count',
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
    return this.solicitudRevisionRepository.revisiones(id).patch(revisiones, where);
  }

  @del('/solicitud-revisions/{id}/revisiones', {
    responses: {
      '200': {
        description: 'SolicitudRevision.Revisiones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Revisiones)) where?: Where<Revisiones>,
  ): Promise<Count> {
    return this.solicitudRevisionRepository.revisiones(id).delete(where);
  }
}
