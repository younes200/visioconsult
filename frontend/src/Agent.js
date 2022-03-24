/* eslint-disable */
import axios from 'axios'
import qs from 'qs'
let domain = ''
let instance = axios.create({
  withCredentials: true
})

export const setBaseURL = domain => {
  instance.defaults.baseURL = domain
}
export const getClient = () => {
  return instance
}
export const setAccessToken = $accessToken => {
  instance.defaults.headers.common['Authorization'] = $accessToken
}
export const clearAccessToken = () => {
  instance.defaults.headers.common['Authorization'] = null
}
export const ERROR_CODES = {
  SERVER_NOT_RESPONDING: "SERVER_NOT_RESPONDING",
  REQUEST_FAILED: "REQUEST_FAILED",
  OFFLINE: "OFFLINE"
};
export class ServerError extends Error {
  constructor(error, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }
    this.status = -1; // server not responding ot request error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      this.status = error.status;
      this.statusText = error.statusText;
      this.headers = error.response.headers;
      if (error.response.data) {
        if (error.response.data.error) {
          this.errorCode =
            error.response.data.error.errorCode ||
            error.response.data.error.code;
          this.message = error.response.data.error.message;
        }
        this.statusCode = error.response.data.statusCode;
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      this.request = error.request;
      this.message = "The request was made but no response was received";
      this.errorCode = ERROR_CODES.SERVER_NOT_RESPONDING;
      this.status = error.status;
      this.statusText = error.statusText;
    } else {
      // Something happened in setting up the request that triggered an Error
      this.message = error.message;
      this.errorCode = ERROR_CODES.REQUEST_FAILED;
    }
    this.date = new Date();
  }
  toString() {
    return this.message;
  }
  toJSON() {
    return {
      data: this.data,
      status: this.status,
      headers: this.headers,
      errorCode: this.errorCode,
      message: this.message,
      errors: this.errors
    };
  }
}
instance.interceptors.response.use(
  response => response,
  error => Promise.reject(new ServerError(error))
);
export const request = (method, url, body, queryParameters, form, config) => {
  method = method.toLowerCase()
  let keys = Object.keys(queryParameters)
  let queryUrl = url
  if (keys.length > 0) {
    queryUrl = url + '?' + qs.stringify(queryParameters)
  }
  if (body) {
    return instance[method](queryUrl, body, config)
  } else if (method === 'get') {
    return instance[method](queryUrl, {
      params: form
    }, config)
  } else {
    return instance[method](queryUrl, qs.stringify(form), config)
  }
}
/**
 * Authenticate with facebook token
 * request: userFindByIdRoles
 * URL: GET /auth/facebook-token-mobile?token
 * @param token - facebook user token
 */
export const loginWithFacebook = function(parameters = {}) {
  const config = parameters.$config
  let path = '/auth/facebook-token-mobile?access_token={token}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{token}', `${parameters['token']}`)
  if (parameters['token'] === undefined) {
    return Promise.reject(new Error('Missing required parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    })
  }
  return request('get', path, body, queryParameters, form, config)
}
/*==========================================================
 *                    VisioConsult
 ==========================================================*/
/**
 * Fetches belongsTo relation user.
 * request: userIdentityGetUser
 * URL: GET /userIdentities/{id}/user
 * @param id - userIdentity id
 * @param refresh - 
 */
export const userIdentityGetUser = function(parameters = {}) {
  const config = parameters.$config
  let path = '/userIdentities/{id}/user'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['refresh'] !== undefined) {
    queryParameters['refresh'] = parameters['refresh']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Create a new instance of the model and persist it into the data source.
 * request: userIdentityCreate
 * URL: POST /userIdentities
 * @param data - Model instance data
 */
export const userIdentityCreate = function(parameters = {}) {
  const config = parameters.$config
  let path = '/userIdentities'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Patch an existing model instance or insert a new one into the data source.
 * request: userIdentityPatchOrCreate
 * URL: PATCH /userIdentities
 * @param data - Model instance data
 */
export const userIdentityPatchOrCreate = function(parameters = {}) {
  const config = parameters.$config
  let path = '/userIdentities'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', path, body, queryParameters, form, config)
}
/**
 * Replace an existing model instance or insert a new one into the data source.
 * request: userIdentityReplaceOrCreatePutUserIdentities
 * URL: PUT /userIdentities
 * @param data - Model instance data
 */
export const userIdentityReplaceOrCreatePutUserIdentities = function(parameters = {}) {
  const config = parameters.$config
  let path = '/userIdentities'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', path, body, queryParameters, form, config)
}
/**
 * Find all instances of the model matched by filter from the data source.
 * request: userIdentityFind
 * URL: GET /userIdentities
 * @param filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
 */
export const userIdentityFind = function(parameters = {}) {
  const config = parameters.$config
  let path = '/userIdentities'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['filter'] !== undefined) {
    queryParameters['filter'] = parameters['filter']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Replace an existing model instance or insert a new one into the data source.
 * request: userIdentityReplaceOrCreatePostUserIdentitiesReplaceOrCreate
 * URL: POST /userIdentities/replaceOrCreate
 * @param data - Model instance data
 */
export const userIdentityReplaceOrCreatePostUserIdentitiesReplaceOrCreate = function(parameters = {}) {
  const config = parameters.$config
  let path = '/userIdentities/replaceOrCreate'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Update an existing model instance or insert a new one into the data source based on the where criteria.
 * request: userIdentityUpsertWithWhere
 * URL: POST /userIdentities/upsertWithWhere
 * @param where - Criteria to match model instances
 * @param data - An object of model property name/value pairs
 */
export const userIdentityUpsertWithWhere = function(parameters = {}) {
  const config = parameters.$config
  let path = '/userIdentities/upsertWithWhere'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['where'] !== undefined) {
    queryParameters['where'] = parameters['where']
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Check whether a model instance exists in the data source.
 * request: userIdentityExistsGetUserIdentitiesIdExists
 * URL: GET /userIdentities/{id}/exists
 * @param id - Model id
 */
export const userIdentityExistsGetUserIdentitiesIdExists = function(parameters = {}) {
  const config = parameters.$config
  let path = '/userIdentities/{id}/exists'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Check whether a model instance exists in the data source.
 * request: userIdentityExistsHeadUserIdentitiesId
 * URL: HEAD /userIdentities/{id}
 * @param id - Model id
 */
export const userIdentityExistsHeadUserIdentitiesId = function(parameters = {}) {
  const config = parameters.$config
  let path = '/userIdentities/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('head', path, body, queryParameters, form, config)
}
/**
 * Find a model instance by {{id}} from the data source.
 * request: userIdentityFindById
 * URL: GET /userIdentities/{id}
 * @param id - Model id
 * @param filter - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
 */
export const userIdentityFindById = function(parameters = {}) {
  const config = parameters.$config
  let path = '/userIdentities/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['filter'] !== undefined) {
    queryParameters['filter'] = parameters['filter']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Replace attributes for a model instance and persist it into the data source.
 * request: userIdentityReplaceByIdPutUserIdentitiesId
 * URL: PUT /userIdentities/{id}
 * @param id - Model id
 * @param data - Model instance data
 */
export const userIdentityReplaceByIdPutUserIdentitiesId = function(parameters = {}) {
  const config = parameters.$config
  let path = '/userIdentities/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', path, body, queryParameters, form, config)
}
/**
 * Delete a model instance by {{id}} from the data source.
 * request: userIdentityDeleteById
 * URL: DELETE /userIdentities/{id}
 * @param id - Model id
 */
export const userIdentityDeleteById = function(parameters = {}) {
  const config = parameters.$config
  let path = '/userIdentities/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', path, body, queryParameters, form, config)
}
/**
 * Patch attributes for a model instance and persist it into the data source.
 * request: userIdentityPatchAttributes
 * URL: PATCH /userIdentities/{id}
 * @param id - userIdentity id
 * @param data - An object of model property name/value pairs
 */
export const userIdentityPatchAttributes = function(parameters = {}) {
  const config = parameters.$config
  let path = '/userIdentities/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', path, body, queryParameters, form, config)
}
/**
 * Replace attributes for a model instance and persist it into the data source.
 * request: userIdentityReplaceByIdPostUserIdentitiesIdReplace
 * URL: POST /userIdentities/{id}/replace
 * @param id - Model id
 * @param data - Model instance data
 */
export const userIdentityReplaceByIdPostUserIdentitiesIdReplace = function(parameters = {}) {
  const config = parameters.$config
  let path = '/userIdentities/{id}/replace'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Find first instance of the model matched by filter from the data source.
 * request: userIdentityFindOne
 * URL: GET /userIdentities/findOne
 * @param filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
 */
export const userIdentityFindOne = function(parameters = {}) {
  const config = parameters.$config
  let path = '/userIdentities/findOne'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['filter'] !== undefined) {
    queryParameters['filter'] = parameters['filter']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Update instances of the model matched by {{where}} from the data source.
 * request: userIdentityUpdateAll
 * URL: POST /userIdentities/update
 * @param where - Criteria to match model instances
 * @param data - An object of model property name/value pairs
 */
export const userIdentityUpdateAll = function(parameters = {}) {
  const config = parameters.$config
  let path = '/userIdentities/update'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['where'] !== undefined) {
    queryParameters['where'] = parameters['where']
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Count instances of the model matched by where from the data source.
 * request: userIdentityCount
 * URL: GET /userIdentities/count
 * @param where - Criteria to match model instances
 */
export const userIdentityCount = function(parameters = {}) {
  const config = parameters.$config
  let path = '/userIdentities/count'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['where'] !== undefined) {
    queryParameters['where'] = parameters['where']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Create a change stream.
 * request: userIdentityCreateChangeStreamPostUserIdentitiesChangeStream
 * URL: POST /userIdentities/change-stream
 * @param options - 
 */
export const userIdentityCreateChangeStreamPostUserIdentitiesChangeStream = function(parameters = {}) {
  const config = parameters.$config
  let path = '/userIdentities/change-stream'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['options'] !== undefined) {
    form['options'] = parameters['options']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Create a change stream.
 * request: userIdentityCreateChangeStreamGetUserIdentitiesChangeStream
 * URL: GET /userIdentities/change-stream
 * @param options - 
 */
export const userIdentityCreateChangeStreamGetUserIdentitiesChangeStream = function(parameters = {}) {
  const config = parameters.$config
  let path = '/userIdentities/change-stream'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['options'] !== undefined) {
    queryParameters['options'] = parameters['options']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Find a related item by id for roles.
 * request: userFindByIdRoles
 * URL: GET /users/{id}/roles/{fk}
 * @param id - user id
 * @param fk - Foreign key for roles
 */
export const userFindByIdRoles = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}/roles/{fk}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  path = path.replace('{fk}', `${parameters['fk']}`)
  if (parameters['fk'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: fk'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Add a related item by id for roles.
 * request: userLinkRoles
 * URL: PUT /users/{id}/roles/rel/{fk}
 * @param id - user id
 * @param fk - Foreign key for roles
 * @param data - 
 */
export const userLinkRoles = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}/roles/rel/{fk}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  path = path.replace('{fk}', `${parameters['fk']}`)
  if (parameters['fk'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: fk'))
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', path, body, queryParameters, form, config)
}
/**
 * Remove the roles relation to an item by id.
 * request: userUnlinkRoles
 * URL: DELETE /users/{id}/roles/rel/{fk}
 * @param id - user id
 * @param fk - Foreign key for roles
 */
export const userUnlinkRoles = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}/roles/rel/{fk}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  path = path.replace('{fk}', `${parameters['fk']}`)
  if (parameters['fk'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: fk'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', path, body, queryParameters, form, config)
}
/**
 * Check the existence of roles relation to an item by id.
 * request: userExistsRoles
 * URL: HEAD /users/{id}/roles/rel/{fk}
 * @param id - user id
 * @param fk - Foreign key for roles
 */
export const userExistsRoles = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}/roles/rel/{fk}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  path = path.replace('{fk}', `${parameters['fk']}`)
  if (parameters['fk'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: fk'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('head', path, body, queryParameters, form, config)
}
/**
 * Find a related item by id for devices.
 * request: userFindByIdDevices
 * URL: GET /users/{id}/devices/{fk}
 * @param id - user id
 * @param fk - Foreign key for devices
 */
export const userFindByIdDevices = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}/devices/{fk}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  path = path.replace('{fk}', `${parameters['fk']}`)
  if (parameters['fk'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: fk'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Fetches hasOne relation patientSheet.
 * request: userGetPatientSheet
 * URL: GET /users/{id}/patientSheet
 * @param id - user id
 * @param refresh - 
 */
export const userGetPatientSheet = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}/patientSheet'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['refresh'] !== undefined) {
    queryParameters['refresh'] = parameters['refresh']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Creates a new instance in patientSheet of this model.
 * request: userCreatePatientSheet
 * URL: POST /users/{id}/patientSheet
 * @param id - user id
 * @param data - 
 */
export const userCreatePatientSheet = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}/patientSheet'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Update patientSheet of this model.
 * request: userUpdatePatientSheet
 * URL: PUT /users/{id}/patientSheet
 * @param id - user id
 * @param data - 
 */
export const userUpdatePatientSheet = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}/patientSheet'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', path, body, queryParameters, form, config)
}
/**
 * Deletes patientSheet of this model.
 * request: userDestroyPatientSheet
 * URL: DELETE /users/{id}/patientSheet
 * @param id - user id
 */
export const userDestroyPatientSheet = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}/patientSheet'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', path, body, queryParameters, form, config)
}
/**
 * Queries roles of user.
 * request: userGetRoles
 * URL: GET /users/{id}/roles
 * @param id - user id
 * @param filter - 
 */
export const userGetRoles = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}/roles'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['filter'] !== undefined) {
    queryParameters['filter'] = parameters['filter']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Counts roles of user.
 * request: userCountRoles
 * URL: GET /users/{id}/roles/count
 * @param id - user id
 * @param where - Criteria to match model instances
 */
export const userCountRoles = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}/roles/count'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['where'] !== undefined) {
    queryParameters['where'] = parameters['where']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Queries devices of user.
 * request: userGetDevices
 * URL: GET /users/{id}/devices
 * @param id - user id
 * @param filter - 
 */
export const userGetDevices = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}/devices'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['filter'] !== undefined) {
    queryParameters['filter'] = parameters['filter']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Counts devices of user.
 * request: userCountDevices
 * URL: GET /users/{id}/devices/count
 * @param id - user id
 * @param where - Criteria to match model instances
 */
export const userCountDevices = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}/devices/count'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['where'] !== undefined) {
    queryParameters['where'] = parameters['where']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Create a new instance of the model and persist it into the data source.
 * request: userCreate
 * URL: POST /users
 * @param data - Model instance data
 */
export const userCreate = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Find all instances of the model matched by filter from the data source.
 * request: userFind
 * URL: GET /users
 * @param filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
 */
export const userFind = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['filter'] !== undefined) {
    
    queryParameters['filter'] = parameters['filter']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Find a model instance by {{id}} from the data source.
 * request: userFindById
 * URL: GET /users/{id}
 * @param id - Model id
 * @param filter - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
 */
export const userFindById = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['filter'] !== undefined) {
    queryParameters['filter'] = parameters['filter']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Replace attributes for a model instance and persist it into the data source.
 * request: userReplaceByIdPutUsersId
 * URL: PUT /users/{id}
 * @param id - Model id
 * @param data - Model instance data
 */
export const userReplaceByIdPutUsersId = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', path, body, queryParameters, form, config)
}
/**
 * Delete a model instance by {{id}} from the data source.
 * request: userDeleteById
 * URL: DELETE /users/{id}
 * @param id - Model id
 */
export const userDeleteById = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', path, body, queryParameters, form, config)
}
/**
 * Patch attributes for a model instance and persist it into the data source.
 * request: userPatchAttributes
 * URL: PATCH /users/{id}
 * @param id - user id
 * @param data - An object of model property name/value pairs
 */
export const userPatchAttributes = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', path, body, queryParameters, form, config)
}
/**
 * Replace attributes for a model instance and persist it into the data source.
 * request: userReplaceByIdPostUsersIdReplace
 * URL: POST /users/{id}/replace
 * @param id - Model id
 * @param data - Model instance data
 */
export const userReplaceByIdPostUsersIdReplace = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}/replace'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Find first instance of the model matched by filter from the data source.
 * request: userFindOne
 * URL: GET /users/findOne
 * @param filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
 */
export const userFindOne = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/findOne'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['filter'] !== undefined) {
    queryParameters['filter'] = parameters['filter']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Count instances of the model matched by where from the data source.
 * request: userCount
 * URL: GET /users/count
 * @param where - Criteria to match model instances
 */
export const userCount = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/count'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['where'] !== undefined) {
    queryParameters['where'] = parameters['where']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Login a user with username/email and password.
 * request: userLogin
 * URL: POST /users/login
 * @param credentials - 
 * @param include - Related objects to include in the response. See the description of return value for more details.
 */
export const userLogin = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/login'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['credentials'] !== undefined) {
    body = parameters['credentials']
  }
  if (parameters['credentials'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: credentials'))
  }
  if (parameters['include'] !== undefined) {
    queryParameters['include'] = parameters['include']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Logout a user with access token.
 * request: userLogout
 * URL: POST /users/logout
 */
export const userLogout = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/logout'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Trigger user's identity verification with configured verifyOptions
 * request: userVerifyPostUsersIdVerify
 * URL: POST /users/{id}/verify
 * @param id - user id
 */
export const userVerifyPostUsersIdVerify = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}/verify'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * 
 * request: userVerifyGetUsersIdVerify
 * URL: GET /users/{id}/verify
 * @param id - user id
 */
export const userVerifyGetUsersIdVerify = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}/verify'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Confirm a user registration with identity verification token.
 * request: userConfirm
 * URL: GET /users/confirm
 * @param uid - 
 * @param token - 
 * @param redirect - 
 */
export const userConfirm = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/confirm'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['uid'] !== undefined) {
    queryParameters['uid'] = parameters['uid']
  }
  if (parameters['uid'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: uid'))
  }
  if (parameters['token'] !== undefined) {
    queryParameters['token'] = parameters['token']
  }
  if (parameters['token'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: token'))
  }
  if (parameters['redirect'] !== undefined) {
    queryParameters['redirect'] = parameters['redirect']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Reset password for a user with email.
 * request: userResetPassword
 * URL: POST /users/reset
 * @param options - 
 */
export const userResetPassword = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/reset'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['options'] !== undefined) {
    body = parameters['options']
  }
  if (parameters['options'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: options'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Change user password
 * request: userChangePasswordPutUsersReset
 * URL: PUT /users/reset
 * @param credentials - new password
 */
export const userChangePasswordPutUsersReset = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/reset'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['credentials'] !== undefined) {
    body = parameters['credentials']
  }
  if (parameters['credentials'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: credentials'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', path, body, queryParameters, form, config)
}
/**
 * Change a user's password.
 * request: userChangePasswordPostUsersChangePassword
 * URL: POST /users/change-password
 * @param oldPassword - 
 * @param newPassword - 
 */
export const userChangePasswordPostUsersChangePassword = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/change-password'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['oldPassword'] !== undefined) {
    form['oldPassword'] = parameters['oldPassword']
  }
  if (parameters['oldPassword'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: oldPassword'))
  }
  if (parameters['newPassword'] !== undefined) {
    form['newPassword'] = parameters['newPassword']
  }
  if (parameters['newPassword'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: newPassword'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Reset user's password via a password-reset token.
 * request: userSetPassword
 * URL: POST /users/reset-password
 * @param newPassword - 
 */
export const userSetPassword = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/reset-password'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['newPassword'] !== undefined) {
    form['newPassword'] = parameters['newPassword']
  }
  if (parameters['newPassword'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: newPassword'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * 
 * request: userUploadSignature
 * URL: POST /users/{id}/upload
 * @param id - user id
 * @param body - Upload details
 */
export const userUploadSignature = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}/upload'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['body'] !== undefined) {
    body = parameters['body']
  }
  if (parameters['body'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: body'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * 
 * request: userMe
 * URL: GET /users/me
 * @param accessToken - 
 */
export const userMe = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/me'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['accessToken'] !== undefined) {
    queryParameters['accessToken'] = parameters['accessToken']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * 
 * request: userRegister
 * URL: POST /users/register
 * @param user - 
 */
export const userRegister = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/register'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['user'] !== undefined) {
    body = parameters['user']
  }
  if (parameters['user'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: user'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * 
 * request: userDeviceUpsert
 * URL: POST /users/{id}/device
 * @param id - user id
 * @param uid - 
 * @param data - 
 */
export const userDeviceUpsert = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}/device'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['uid'] !== undefined) {
    queryParameters['uid'] = parameters['uid']
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters['data'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: data'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Fetches belongsTo relation user.
 * request: accessTokenGetUser
 * URL: GET /accessToken/{id}/user
 * @param id - accessToken id
 * @param refresh - 
 */
export const accessTokenGetUser = function(parameters = {}) {
  const config = parameters.$config
  let path = '/accessToken/{id}/user'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['refresh'] !== undefined) {
    queryParameters['refresh'] = parameters['refresh']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Create a new instance of the model and persist it into the data source.
 * request: accessTokenCreate
 * URL: POST /accessToken
 * @param data - Model instance data
 */
export const accessTokenCreate = function(parameters = {}) {
  const config = parameters.$config
  let path = '/accessToken'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Patch an existing model instance or insert a new one into the data source.
 * request: accessTokenPatchOrCreate
 * URL: PATCH /accessToken
 * @param data - Model instance data
 */
export const accessTokenPatchOrCreate = function(parameters = {}) {
  const config = parameters.$config
  let path = '/accessToken'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', path, body, queryParameters, form, config)
}
/**
 * Replace an existing model instance or insert a new one into the data source.
 * request: accessTokenReplaceOrCreatePutAccessToken
 * URL: PUT /accessToken
 * @param data - Model instance data
 */
export const accessTokenReplaceOrCreatePutAccessToken = function(parameters = {}) {
  const config = parameters.$config
  let path = '/accessToken'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', path, body, queryParameters, form, config)
}
/**
 * Find all instances of the model matched by filter from the data source.
 * request: accessTokenFind
 * URL: GET /accessToken
 * @param filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
 */
export const accessTokenFind = function(parameters = {}) {
  const config = parameters.$config
  let path = '/accessToken'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['filter'] !== undefined) {
    queryParameters['filter'] = parameters['filter']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Replace an existing model instance or insert a new one into the data source.
 * request: accessTokenReplaceOrCreatePostAccessTokenReplaceOrCreate
 * URL: POST /accessToken/replaceOrCreate
 * @param data - Model instance data
 */
export const accessTokenReplaceOrCreatePostAccessTokenReplaceOrCreate = function(parameters = {}) {
  const config = parameters.$config
  let path = '/accessToken/replaceOrCreate'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Update an existing model instance or insert a new one into the data source based on the where criteria.
 * request: accessTokenUpsertWithWhere
 * URL: POST /accessToken/upsertWithWhere
 * @param where - Criteria to match model instances
 * @param data - An object of model property name/value pairs
 */
export const accessTokenUpsertWithWhere = function(parameters = {}) {
  const config = parameters.$config
  let path = '/accessToken/upsertWithWhere'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['where'] !== undefined) {
    queryParameters['where'] = parameters['where']
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Check whether a model instance exists in the data source.
 * request: accessTokenExistsGetAccessTokenIdExists
 * URL: GET /accessToken/{id}/exists
 * @param id - Model id
 */
export const accessTokenExistsGetAccessTokenIdExists = function(parameters = {}) {
  const config = parameters.$config
  let path = '/accessToken/{id}/exists'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Check whether a model instance exists in the data source.
 * request: accessTokenExistsHeadAccessTokenId
 * URL: HEAD /accessToken/{id}
 * @param id - Model id
 */
export const accessTokenExistsHeadAccessTokenId = function(parameters = {}) {
  const config = parameters.$config
  let path = '/accessToken/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('head', path, body, queryParameters, form, config)
}
/**
 * Find a model instance by {{id}} from the data source.
 * request: accessTokenFindById
 * URL: GET /accessToken/{id}
 * @param id - Model id
 * @param filter - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
 */
export const accessTokenFindById = function(parameters = {}) {
  const config = parameters.$config
  let path = '/accessToken/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['filter'] !== undefined) {
    queryParameters['filter'] = parameters['filter']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Replace attributes for a model instance and persist it into the data source.
 * request: accessTokenReplaceByIdPutAccessTokenId
 * URL: PUT /accessToken/{id}
 * @param id - Model id
 * @param data - Model instance data
 */
export const accessTokenReplaceByIdPutAccessTokenId = function(parameters = {}) {
  const config = parameters.$config
  let path = '/accessToken/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', path, body, queryParameters, form, config)
}
/**
 * Delete a model instance by {{id}} from the data source.
 * request: accessTokenDeleteById
 * URL: DELETE /accessToken/{id}
 * @param id - Model id
 */
export const accessTokenDeleteById = function(parameters = {}) {
  const config = parameters.$config
  let path = '/accessToken/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', path, body, queryParameters, form, config)
}
/**
 * Patch attributes for a model instance and persist it into the data source.
 * request: accessTokenPatchAttributes
 * URL: PATCH /accessToken/{id}
 * @param id - accessToken id
 * @param data - An object of model property name/value pairs
 */
export const accessTokenPatchAttributes = function(parameters = {}) {
  const config = parameters.$config
  let path = '/accessToken/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', path, body, queryParameters, form, config)
}
/**
 * Replace attributes for a model instance and persist it into the data source.
 * request: accessTokenReplaceByIdPostAccessTokenIdReplace
 * URL: POST /accessToken/{id}/replace
 * @param id - Model id
 * @param data - Model instance data
 */
export const accessTokenReplaceByIdPostAccessTokenIdReplace = function(parameters = {}) {
  const config = parameters.$config
  let path = '/accessToken/{id}/replace'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Find first instance of the model matched by filter from the data source.
 * request: accessTokenFindOne
 * URL: GET /accessToken/findOne
 * @param filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
 */
export const accessTokenFindOne = function(parameters = {}) {
  const config = parameters.$config
  let path = '/accessToken/findOne'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['filter'] !== undefined) {
    queryParameters['filter'] = parameters['filter']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Update instances of the model matched by {{where}} from the data source.
 * request: accessTokenUpdateAll
 * URL: POST /accessToken/update
 * @param where - Criteria to match model instances
 * @param data - An object of model property name/value pairs
 */
export const accessTokenUpdateAll = function(parameters = {}) {
  const config = parameters.$config
  let path = '/accessToken/update'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['where'] !== undefined) {
    queryParameters['where'] = parameters['where']
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Count instances of the model matched by where from the data source.
 * request: accessTokenCount
 * URL: GET /accessToken/count
 * @param where - Criteria to match model instances
 */
export const accessTokenCount = function(parameters = {}) {
  const config = parameters.$config
  let path = '/accessToken/count'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['where'] !== undefined) {
    queryParameters['where'] = parameters['where']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Create a change stream.
 * request: accessTokenCreateChangeStreamPostAccessTokenChangeStream
 * URL: POST /accessToken/change-stream
 * @param options - 
 */
export const accessTokenCreateChangeStreamPostAccessTokenChangeStream = function(parameters = {}) {
  const config = parameters.$config
  let path = '/accessToken/change-stream'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['options'] !== undefined) {
    form['options'] = parameters['options']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Create a change stream.
 * request: accessTokenCreateChangeStreamGetAccessTokenChangeStream
 * URL: GET /accessToken/change-stream
 * @param options - 
 */
export const accessTokenCreateChangeStreamGetAccessTokenChangeStream = function(parameters = {}) {
  const config = parameters.$config
  let path = '/accessToken/change-stream'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['options'] !== undefined) {
    queryParameters['options'] = parameters['options']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Find a related item by id for principals.
 * request: roleFindByIdPrincipals
 * URL: GET /Roles/{id}/principals/{fk}
 * @param id - Role id
 * @param fk - Foreign key for principals
 */
export const roleFindByIdPrincipals = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/{id}/principals/{fk}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  path = path.replace('{fk}', `${parameters['fk']}`)
  if (parameters['fk'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: fk'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Delete a related item by id for principals.
 * request: roleDestroyByIdPrincipals
 * URL: DELETE /Roles/{id}/principals/{fk}
 * @param id - Role id
 * @param fk - Foreign key for principals
 */
export const roleDestroyByIdPrincipals = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/{id}/principals/{fk}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  path = path.replace('{fk}', `${parameters['fk']}`)
  if (parameters['fk'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: fk'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', path, body, queryParameters, form, config)
}
/**
 * Update a related item by id for principals.
 * request: roleUpdateByIdPrincipals
 * URL: PUT /Roles/{id}/principals/{fk}
 * @param id - Role id
 * @param fk - Foreign key for principals
 * @param data - 
 */
export const roleUpdateByIdPrincipals = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/{id}/principals/{fk}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  path = path.replace('{fk}', `${parameters['fk']}`)
  if (parameters['fk'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: fk'))
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', path, body, queryParameters, form, config)
}
/**
 * Queries principals of Role.
 * request: roleGetPrincipals
 * URL: GET /Roles/{id}/principals
 * @param id - Role id
 * @param filter - 
 */
export const roleGetPrincipals = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/{id}/principals'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['filter'] !== undefined) {
    queryParameters['filter'] = parameters['filter']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Creates a new instance in principals of this model.
 * request: roleCreatePrincipals
 * URL: POST /Roles/{id}/principals
 * @param id - Role id
 * @param data - 
 */
export const roleCreatePrincipals = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/{id}/principals'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Deletes all principals of this model.
 * request: roleDeletePrincipals
 * URL: DELETE /Roles/{id}/principals
 * @param id - Role id
 */
export const roleDeletePrincipals = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/{id}/principals'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', path, body, queryParameters, form, config)
}
/**
 * Counts principals of Role.
 * request: roleCountPrincipals
 * URL: GET /Roles/{id}/principals/count
 * @param id - Role id
 * @param where - Criteria to match model instances
 */
export const roleCountPrincipals = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/{id}/principals/count'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['where'] !== undefined) {
    queryParameters['where'] = parameters['where']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Create a new instance of the model and persist it into the data source.
 * request: roleCreate
 * URL: POST /Roles
 * @param data - Model instance data
 */
export const roleCreate = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Patch an existing model instance or insert a new one into the data source.
 * request: rolePatchOrCreate
 * URL: PATCH /Roles
 * @param data - Model instance data
 */
export const rolePatchOrCreate = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', path, body, queryParameters, form, config)
}
/**
 * Replace an existing model instance or insert a new one into the data source.
 * request: roleReplaceOrCreatePutRoles
 * URL: PUT /Roles
 * @param data - Model instance data
 */
export const roleReplaceOrCreatePutRoles = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', path, body, queryParameters, form, config)
}
/**
 * Find all instances of the model matched by filter from the data source.
 * request: roleFind
 * URL: GET /Roles
 * @param filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
 */
export const roleFind = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['filter'] !== undefined) {
    queryParameters['filter'] = parameters['filter']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Replace an existing model instance or insert a new one into the data source.
 * request: roleReplaceOrCreatePostRolesReplaceOrCreate
 * URL: POST /Roles/replaceOrCreate
 * @param data - Model instance data
 */
export const roleReplaceOrCreatePostRolesReplaceOrCreate = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/replaceOrCreate'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Update an existing model instance or insert a new one into the data source based on the where criteria.
 * request: roleUpsertWithWhere
 * URL: POST /Roles/upsertWithWhere
 * @param where - Criteria to match model instances
 * @param data - An object of model property name/value pairs
 */
export const roleUpsertWithWhere = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/upsertWithWhere'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['where'] !== undefined) {
    queryParameters['where'] = parameters['where']
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Check whether a model instance exists in the data source.
 * request: roleExistsGetRolesIdExists
 * URL: GET /Roles/{id}/exists
 * @param id - Model id
 */
export const roleExistsGetRolesIdExists = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/{id}/exists'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Check whether a model instance exists in the data source.
 * request: roleExistsHeadRolesId
 * URL: HEAD /Roles/{id}
 * @param id - Model id
 */
export const roleExistsHeadRolesId = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('head', path, body, queryParameters, form, config)
}
/**
 * Find a model instance by {{id}} from the data source.
 * request: roleFindById
 * URL: GET /Roles/{id}
 * @param id - Model id
 * @param filter - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
 */
export const roleFindById = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['filter'] !== undefined) {
    queryParameters['filter'] = parameters['filter']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Replace attributes for a model instance and persist it into the data source.
 * request: roleReplaceByIdPutRolesId
 * URL: PUT /Roles/{id}
 * @param id - Model id
 * @param data - Model instance data
 */
export const roleReplaceByIdPutRolesId = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('put', path, body, queryParameters, form, config)
}
/**
 * Delete a model instance by {{id}} from the data source.
 * request: roleDeleteById
 * URL: DELETE /Roles/{id}
 * @param id - Model id
 */
export const roleDeleteById = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('delete', path, body, queryParameters, form, config)
}
/**
 * Patch attributes for a model instance and persist it into the data source.
 * request: rolePatchAttributes
 * URL: PATCH /Roles/{id}
 * @param id - Role id
 * @param data - An object of model property name/value pairs
 */
export const rolePatchAttributes = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/{id}'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('patch', path, body, queryParameters, form, config)
}
/**
 * Replace attributes for a model instance and persist it into the data source.
 * request: roleReplaceByIdPostRolesIdReplace
 * URL: POST /Roles/{id}/replace
 * @param id - Model id
 * @param data - Model instance data
 */
export const roleReplaceByIdPostRolesIdReplace = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/{id}/replace'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Find first instance of the model matched by filter from the data source.
 * request: roleFindOne
 * URL: GET /Roles/findOne
 * @param filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
 */
export const roleFindOne = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/findOne'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['filter'] !== undefined) {
    queryParameters['filter'] = parameters['filter']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Update instances of the model matched by {{where}} from the data source.
 * request: roleUpdateAll
 * URL: POST /Roles/update
 * @param where - Criteria to match model instances
 * @param data - An object of model property name/value pairs
 */
export const roleUpdateAll = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/update'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['where'] !== undefined) {
    queryParameters['where'] = parameters['where']
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Count instances of the model matched by where from the data source.
 * request: roleCount
 * URL: GET /Roles/count
 * @param where - Criteria to match model instances
 */
export const roleCount = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/count'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['where'] !== undefined) {
    queryParameters['where'] = parameters['where']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Create a change stream.
 * request: roleCreateChangeStreamPostRolesChangeStream
 * URL: POST /Roles/change-stream
 * @param options - 
 */
export const roleCreateChangeStreamPostRolesChangeStream = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/change-stream'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['options'] !== undefined) {
    form['options'] = parameters['options']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}
/**
 * Create a change stream.
 * request: roleCreateChangeStreamGetRolesChangeStream
 * URL: GET /Roles/change-stream
 * @param options - 
 */
export const roleCreateChangeStreamGetRolesChangeStream = function(parameters = {}) {
  const config = parameters.$config
  let path = '/Roles/change-stream'
  let body
  let queryParameters = {}
  let form = {}
  if (parameters['options'] !== undefined) {
    queryParameters['options'] = parameters['options']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('get', path, body, queryParameters, form, config)
}
/**
 * Creates a new instance in Comment of this model.
 * request: userCreateComment
 * URL: POST /users/{id}/comments
 * @param id - user id
 * @param data - 
 */
export const userCreateComment = function(parameters = {}) {
  const config = parameters.$config
  let path = '/users/{id}/comments'
  let body
  let queryParameters = {}
  let form = {}
  path = path.replace('{id}', `${parameters['id']}`)
  if (parameters['id'] === undefined) {
    return Promise.reject(new Error('Missing required  parameter: id'))
  }
  if (parameters['data'] !== undefined) {
    body = parameters['data']
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] = parameters.$queryParameters[parameterName]
    });
  }
  return request('post', path, body, queryParameters, form, config)
}

 
