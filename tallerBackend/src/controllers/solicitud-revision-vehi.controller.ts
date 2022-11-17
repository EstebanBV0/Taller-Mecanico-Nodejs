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
  Vehi,
} from '../models';
import {SolicitudRevisionRepository} from '../repositories';

export class SolicitudRevisionVehiController {
  constructor(
    @repository(SolicitudRevisionRepository) protected solicitudRevisionRepository: SolicitudRevisionRepository,
  ) { }

  @get('/solicitud-revisions/{id}/vehi', {
    responses: {
      '200': {
        description: 'SolicitudRevision has one Vehi',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vehi),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehi>,
  ): Promise<Vehi> {
    return this.solicitudRevisionRepository.vehi(id).get(filter);
  }

  @post('/solicitud-revisions/{id}/vehi', {
    responses: {
      '200': {
        description: 'SolicitudRevision model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehi)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof SolicitudRevision.prototype.IdRevision,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehi, {
            title: 'NewVehiInSolicitudRevision',
            exclude: ['Placa'],
            optional: ['solicitudRevisionId']
          }),
        },
      },
    }) vehi: Omit<Vehi, 'Placa'>,
  ): Promise<Vehi> {
    return this.solicitudRevisionRepository.vehi(id).create(vehi);
  }

  @patch('/solicitud-revisions/{id}/vehi', {
    responses: {
      '200': {
        description: 'SolicitudRevision.Vehi PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehi, {partial: true}),
        },
      },
    })
    vehi: Partial<Vehi>,
    @param.query.object('where', getWhereSchemaFor(Vehi)) where?: Where<Vehi>,
  ): Promise<Count> {
    return this.solicitudRevisionRepository.vehi(id).patch(vehi, where);
  }

  @del('/solicitud-revisions/{id}/vehi', {
    responses: {
      '200': {
        description: 'SolicitudRevision.Vehi DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehi)) where?: Where<Vehi>,
  ): Promise<Count> {
    return this.solicitudRevisionRepository.vehi(id).delete(where);
  }
}
