/* eslint-disable */
import axios from "axios";
import qs from "qs";
let domain = "";
let instance = axios.create({
  withCredentials: true
});
export const setBaseURL = domain => {
  instance.defaults.baseURL = domain;
};
export const getClient = () => {
  return instance;
};
export const setAccessToken = $accessToken => {
  instance.defaults.headers.common["Authorization"] = $accessToken;
};
export const clearAccessToken = () => {
  instance.defaults.headers.common["Authorization"] = null;
};
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
  method = method.toLowerCase();
  let keys = Object.keys(queryParameters);
  let queryUrl = url;
  if (keys.length > 0) {
    queryUrl = url + "?" + qs.stringify(queryParameters);
  }
  if (body) {
    return instance[method](queryUrl, body, config);
  } else if (method === "get") {
    return instance[method](
      queryUrl,
      {
        params: form
      },
      config
    );
  } else {
    return instance[method](queryUrl, qs.stringify(form), config);
  }
};
/**
 * Authenticate with facebook token
 * request: userFindByIdRoles
 * URL: GET /auth/facebook-token-mobile?token
 * @param token - facebook user token
 */
export const loginWithFacebook = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/auth/facebook-token-mobile?access_token={token}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{token}", `${parameters["token"]}`);
  if (parameters["token"] === undefined) {
    return Promise.reject(new Error("Missing required parameter: id"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/*==========================================================
 *                    Social conversations
 ==========================================================*/
/**
 * Find a related item by id for friends.
 * request: userFindByIdFriends
 * URL: GET /users/{id}/friends/{fk}
 * @param id - user id
 * @param fk - Foreign key for friends
 */
export const userFindByIdFriends = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/friends/{fk}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  path = path.replace("{fk}", `${parameters["fk"]}`);
  if (parameters["fk"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: fk"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Delete a related item by id for friends.
 * request: userDestroyByIdFriends
 * URL: DELETE /users/{id}/friends/{fk}
 * @param id - user id
 * @param fk - Foreign key for friends
 */
export const userDestroyByIdFriends = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/friends/{fk}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  path = path.replace("{fk}", `${parameters["fk"]}`);
  if (parameters["fk"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: fk"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("delete", path, body, queryParameters, form, config);
};
/**
 * Update a related item by id for friends.
 * request: userUpdateByIdFriends
 * URL: PUT /users/{id}/friends/{fk}
 * @param id - user id
 * @param fk - Foreign key for friends
 * @param data -
 */
export const userUpdateByIdFriends = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/friends/{fk}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  path = path.replace("{fk}", `${parameters["fk"]}`);
  if (parameters["fk"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: fk"));
  }
  if (parameters["data"] !== undefined) {
    body = parameters["data"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("put", path, body, queryParameters, form, config);
};
/**
 * Add a related item by id for friends.
 * request: userLinkFriends
 * URL: PUT /users/{id}/friends/rel/{fk}
 * @param id - user id
 * @param fk - Foreign key for friends
 * @param data -
 */
export const userLinkFriends = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/friends/rel/{fk}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  path = path.replace("{fk}", `${parameters["fk"]}`);
  if (parameters["fk"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: fk"));
  }
  if (parameters["data"] !== undefined) {
    body = parameters["data"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("put", path, body, queryParameters, form, config);
};
/**
 * Remove the friends relation to an item by id.
 * request: userUnlinkFriends
 * URL: DELETE /users/{id}/friends/rel/{fk}
 * @param id - user id
 * @param fk - Foreign key for friends
 */
export const userUnlinkFriends = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/friends/rel/{fk}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  path = path.replace("{fk}", `${parameters["fk"]}`);
  if (parameters["fk"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: fk"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("delete", path, body, queryParameters, form, config);
};
/**
 * Check the existence of friends relation to an item by id.
 * request: userExistsFriends
 * URL: HEAD /users/{id}/friends/rel/{fk}
 * @param id - user id
 * @param fk - Foreign key for friends
 */
export const userExistsFriends = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/friends/rel/{fk}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  path = path.replace("{fk}", `${parameters["fk"]}`);
  if (parameters["fk"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: fk"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("head", path, body, queryParameters, form, config);
};
/**
 * Fetches hasOne relation picture.
 * request: userGetPicture
 * URL: GET /users/{id}/picture
 * @param id - user id
 * @param refresh -
 */
export const userGetPicture = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/picture";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["refresh"] !== undefined) {
    queryParameters["refresh"] = parameters["refresh"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Creates a new instance in picture of this model.
 * request: userCreatePicture
 * URL: POST /users/{id}/picture
 * @param id - user id
 * @param data -
 */
export const userCreatePicture = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/picture";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["data"] !== undefined) {
    body = parameters["data"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("post", path, body, queryParameters, form, config);
};
/**
 * Update picture of this model.
 * request: userUpdatePicture
 * URL: PUT /users/{id}/picture
 * @param id - user id
 * @param data -
 */
export const userUpdatePicture = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/picture";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["data"] !== undefined) {
    body = parameters["data"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("put", path, body, queryParameters, form, config);
};
/**
 * Deletes picture of this model.
 * request: userDestroyPicture
 * URL: DELETE /users/{id}/picture
 * @param id - user id
 */
export const userDestroyPicture = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/picture";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("delete", path, body, queryParameters, form, config);
};
/**
 * Find a related item by id for pictures.
 * request: userFindByIdPictures
 * URL: GET /users/{id}/pictures/{fk}
 * @param id - user id
 * @param fk - Foreign key for pictures
 */
export const userFindByIdPictures = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/pictures/{fk}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  path = path.replace("{fk}", `${parameters["fk"]}`);
  if (parameters["fk"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: fk"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Delete a related item by id for pictures.
 * request: userDestroyByIdPictures
 * URL: DELETE /users/{id}/pictures/{fk}
 * @param id - user id
 * @param fk - Foreign key for pictures
 */
export const userDestroyByIdPictures = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/pictures/{fk}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  path = path.replace("{fk}", `${parameters["fk"]}`);
  if (parameters["fk"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: fk"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("delete", path, body, queryParameters, form, config);
};
/**
 * Update a related item by id for pictures.
 * request: userUpdateByIdPictures
 * URL: PUT /users/{id}/pictures/{fk}
 * @param id - user id
 * @param fk - Foreign key for pictures
 * @param data -
 */
export const userUpdateByIdPictures = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/pictures/{fk}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  path = path.replace("{fk}", `${parameters["fk"]}`);
  if (parameters["fk"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: fk"));
  }
  if (parameters["data"] !== undefined) {
    body = parameters["data"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("put", path, body, queryParameters, form, config);
};
/**
 * Find a related item by id for roles.
 * request: userFindByIdRoles
 * URL: GET /users/{id}/roles/{fk}
 * @param id - user id
 * @param fk - Foreign key for roles
 */
export const userFindByIdRoles = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/roles/{fk}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  path = path.replace("{fk}", `${parameters["fk"]}`);
  if (parameters["fk"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: fk"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Add a related item by id for roles.
 * request: userLinkRoles
 * URL: PUT /users/{id}/roles/rel/{fk}
 * @param id - user id
 * @param fk - Foreign key for roles
 * @param data -
 */
export const userLinkRoles = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/roles/rel/{fk}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  path = path.replace("{fk}", `${parameters["fk"]}`);
  if (parameters["fk"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: fk"));
  }
  if (parameters["data"] !== undefined) {
    body = parameters["data"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("put", path, body, queryParameters, form, config);
};
/**
 * Remove the roles relation to an item by id.
 * request: userUnlinkRoles
 * URL: DELETE /users/{id}/roles/rel/{fk}
 * @param id - user id
 * @param fk - Foreign key for roles
 */
export const userUnlinkRoles = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/roles/rel/{fk}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  path = path.replace("{fk}", `${parameters["fk"]}`);
  if (parameters["fk"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: fk"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("delete", path, body, queryParameters, form, config);
};
/**
 * Check the existence of roles relation to an item by id.
 * request: userExistsRoles
 * URL: HEAD /users/{id}/roles/rel/{fk}
 * @param id - user id
 * @param fk - Foreign key for roles
 */
export const userExistsRoles = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/roles/rel/{fk}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  path = path.replace("{fk}", `${parameters["fk"]}`);
  if (parameters["fk"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: fk"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("head", path, body, queryParameters, form, config);
};
/**
 * Find a related item by id for support.
 * request: userFindByIdSupport
 * URL: GET /users/{id}/support/{fk}
 * @param id - user id
 * @param fk - Foreign key for support
 */
export const userFindByIdSupport = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/support/{fk}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  path = path.replace("{fk}", `${parameters["fk"]}`);
  if (parameters["fk"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: fk"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Find a related item by id for devices.
 * request: userFindByIdDevices
 * URL: GET /users/{id}/devices/{fk}
 * @param id - user id
 * @param fk - Foreign key for devices
 */
export const userFindByIdDevices = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/devices/{fk}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  path = path.replace("{fk}", `${parameters["fk"]}`);
  if (parameters["fk"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: fk"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Queries friends of user.
 * request: userGetFriends
 * URL: GET /users/{id}/friends
 * @param id - user id
 * @param filter -
 */
export const userGetFriends = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/friends";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["filter"] !== undefined) {
    queryParameters["filter"] = parameters["filter"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Creates a new instance in friends of this model.
 * request: userCreateFriends
 * URL: POST /users/{id}/friends
 * @param id - user id
 * @param data -
 */
export const userCreateFriends = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/friends";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["data"] !== undefined) {
    body = parameters["data"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("post", path, body, queryParameters, form, config);
};
/**
 * Deletes all friends of this model.
 * request: userDeleteFriends
 * URL: DELETE /users/{id}/friends
 * @param id - user id
 */
export const userDeleteFriends = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/friends";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("delete", path, body, queryParameters, form, config);
};
/**
 * Counts friends of user.
 * request: userCountFriends
 * URL: GET /users/{id}/friends/count
 * @param id - user id
 * @param where - Criteria to match model instances
 */
export const userCountFriends = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/friends/count";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["where"] !== undefined) {
    queryParameters["where"] = parameters["where"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Queries pictures of user.
 * request: userGetPictures
 * URL: GET /users/{id}/pictures
 * @param id - user id
 * @param filter -
 */
export const userGetPictures = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/pictures";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["filter"] !== undefined) {
    queryParameters["filter"] = parameters["filter"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Creates a new instance in pictures of this model.
 * request: userCreatePictures
 * URL: POST /users/{id}/pictures
 * @param id - user id
 * @param data -
 */
export const userCreatePictures = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/pictures";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["data"] !== undefined) {
    body = parameters["data"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("post", path, body, queryParameters, form, config);
};
/**
 * Deletes all pictures of this model.
 * request: userDeletePictures
 * URL: DELETE /users/{id}/pictures
 * @param id - user id
 */
export const userDeletePictures = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/pictures";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("delete", path, body, queryParameters, form, config);
};
/**
 * Counts pictures of user.
 * request: userCountPictures
 * URL: GET /users/{id}/pictures/count
 * @param id - user id
 * @param where - Criteria to match model instances
 */
export const userCountPictures = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/pictures/count";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["where"] !== undefined) {
    queryParameters["where"] = parameters["where"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Queries roles of user.
 * request: userGetRoles
 * URL: GET /users/{id}/roles
 * @param id - user id
 * @param filter -
 */
export const userGetRoles = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/roles";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["filter"] !== undefined) {
    queryParameters["filter"] = parameters["filter"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Counts roles of user.
 * request: userCountRoles
 * URL: GET /users/{id}/roles/count
 * @param id - user id
 * @param where - Criteria to match model instances
 */
export const userCountRoles = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/roles/count";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["where"] !== undefined) {
    queryParameters["where"] = parameters["where"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Queries support of user.
 * request: userGetSupport
 * URL: GET /users/{id}/support
 * @param id - user id
 * @param filter -
 */
export const userGetSupport = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/support";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["filter"] !== undefined) {
    queryParameters["filter"] = parameters["filter"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Creates a new instance in support of this model.
 * request: userCreateSupport
 * URL: POST /users/{id}/support
 * @param id - user id
 * @param data -
 */
export const userCreateSupport = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/support";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["data"] !== undefined) {
    body = parameters["data"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("post", path, body, queryParameters, form, config);
};
/**
 * Counts support of user.
 * request: userCountSupport
 * URL: GET /users/{id}/support/count
 * @param id - user id
 * @param where - Criteria to match model instances
 */
export const userCountSupport = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/support/count";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["where"] !== undefined) {
    queryParameters["where"] = parameters["where"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Queries devices of user.
 * request: userGetDevices
 * URL: GET /users/{id}/devices
 * @param id - user id
 * @param filter -
 */
export const userGetDevices = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/devices";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["filter"] !== undefined) {
    queryParameters["filter"] = parameters["filter"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Counts devices of user.
 * request: userCountDevices
 * URL: GET /users/{id}/devices/count
 * @param id - user id
 * @param where - Criteria to match model instances
 */
export const userCountDevices = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/devices/count";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["where"] !== undefined) {
    queryParameters["where"] = parameters["where"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Find a model instance by {{id}} from the data source.
 * request: userFindById
 * URL: GET /users/{id}
 * @param id - Model id
 * @param filter - Filter defining fields and include - must be a JSON-encoded string ({"something":"value"})
 */
export const userFindById = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["filter"] !== undefined) {
    queryParameters["filter"] = parameters["filter"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Replace attributes for a model instance and persist it into the data source.
 * request: userReplaceByIdPutUsersId
 * URL: PUT /users/{id}
 * @param id - Model id
 * @param data - Model instance data
 */
export const userReplaceByIdPutUsersId = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["data"] !== undefined) {
    body = parameters["data"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("put", path, body, queryParameters, form, config);
};
/**
 * Patch attributes for a model instance and persist it into the data source.
 * request: userPatchAttributes
 * URL: PATCH /users/{id}
 * @param id - user id
 * @param data - An object of model property name/value pairs
 */
export const userPatchAttributes = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["data"] !== undefined) {
    body = parameters["data"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("patch", path, body, queryParameters, form, config);
};
/**
 * Replace attributes for a model instance and persist it into the data source.
 * request: userReplaceByIdPostUsersIdReplace
 * URL: POST /users/{id}/replace
 * @param id - Model id
 * @param data - Model instance data
 */
export const userReplaceByIdPostUsersIdReplace = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/replace";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["data"] !== undefined) {
    body = parameters["data"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("post", path, body, queryParameters, form, config);
};
/**
 * Find all instances of the model matched by filter from the data source.
 * request: userFind
 * URL: GET /users
 * @param filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
 */
export const userFind = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users";
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters["filter"] !== undefined) {
    queryParameters["filter"] = parameters["filter"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Find first instance of the model matched by filter from the data source.
 * request: userFindOne
 * URL: GET /users/findOne
 * @param filter - Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"})
 */
export const userFindOne = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/findOne";
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters["filter"] !== undefined) {
    queryParameters["filter"] = parameters["filter"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Count instances of the model matched by where from the data source.
 * request: userCount
 * URL: GET /users/count
 * @param where - Criteria to match model instances
 */
export const userCount = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/count";
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters["where"] !== undefined) {
    queryParameters["where"] = parameters["where"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Login a user with username/email and password.
 * request: userLogin
 * URL: POST /users/login
 * @param credentials -
 * @param include - Related objects to include in the response. See the description of return value for more details.
 */
export const userLogin = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/login";
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters["credentials"] !== undefined) {
    body = parameters["credentials"];
  }
  if (parameters["credentials"] === undefined) {
    return Promise.reject(
      new Error("Missing required  parameter: credentials")
    );
  }
  if (parameters["include"] !== undefined) {
    queryParameters["include"] = parameters["include"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("post", path, body, queryParameters, form, config);
};
/**
 * Logout a user with access token.
 * request: userLogout
 * URL: POST /users/logout
 */
export const userLogout = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/logout";
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("post", path, body, queryParameters, form, config);
};
/**
 * Trigger user's identity verification with configured verifyOptions
 * request: userVerifyPostUsersIdVerify
 * URL: POST /users/{id}/verify
 * @param id - user id
 */
export const userVerifyPostUsersIdVerify = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/verify";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("post", path, body, queryParameters, form, config);
};
/**
 *
 * request: userVerifyGetUsersIdVerify
 * URL: GET /users/{id}/verify
 * @param id - user id
 */
export const userVerifyGetUsersIdVerify = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/verify";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Confirm a user registration with identity verification token.
 * request: userConfirm
 * URL: GET /users/confirm
 * @param uid -
 * @param token -
 * @param redirect -
 */
export const userConfirm = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/confirm";
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters["uid"] !== undefined) {
    queryParameters["uid"] = parameters["uid"];
  }
  if (parameters["uid"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: uid"));
  }
  if (parameters["token"] !== undefined) {
    queryParameters["token"] = parameters["token"];
  }
  if (parameters["token"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: token"));
  }
  if (parameters["redirect"] !== undefined) {
    queryParameters["redirect"] = parameters["redirect"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 * Reset password for a user with email.
 * request: userResetPassword
 * URL: POST /users/reset
 * @param options -
 */
export const userResetPassword = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/reset";
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters["options"] !== undefined) {
    body = parameters["options"];
  }
  if (parameters["options"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: options"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("post", path, body, queryParameters, form, config);
};
/**
 * Change user password
 * request: userChangePasswordPutUsersReset
 * URL: PUT /users/reset
 * @param credentials - new password
 */
export const userChangePasswordPutUsersReset = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/reset";
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters["credentials"] !== undefined) {
    body = parameters["credentials"];
  }
  if (parameters["credentials"] === undefined) {
    return Promise.reject(
      new Error("Missing required  parameter: credentials")
    );
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("put", path, body, queryParameters, form, config);
};
/**
 * Change a user's password.
 * request: userChangePasswordPostUsersChangePassword
 * URL: POST /users/change-password
 * @param oldPassword -
 * @param newPassword -
 */
export const userChangePasswordPostUsersChangePassword = function(
  parameters = {}
) {
  const config = parameters.$config;
  let path = "/users/change-password";
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters["oldPassword"] !== undefined) {
    form["oldPassword"] = parameters["oldPassword"];
  }
  if (parameters["oldPassword"] === undefined) {
    return Promise.reject(
      new Error("Missing required  parameter: oldPassword")
    );
  }
  if (parameters["newPassword"] !== undefined) {
    form["newPassword"] = parameters["newPassword"];
  }
  if (parameters["newPassword"] === undefined) {
    return Promise.reject(
      new Error("Missing required  parameter: newPassword")
    );
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("post", path, body, queryParameters, form, config);
};
/**
 * Reset user's password via a password-reset token.
 * request: userSetPassword
 * URL: POST /users/reset-password
 * @param newPassword -
 */
export const userSetPassword = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/reset-password";
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters["newPassword"] !== undefined) {
    form["newPassword"] = parameters["newPassword"];
  }
  if (parameters["newPassword"] === undefined) {
    return Promise.reject(
      new Error("Missing required  parameter: newPassword")
    );
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("post", path, body, queryParameters, form, config);
};
/**
 *
 * request: userUploadSignature
 * URL: POST /users/{id}/upload
 * @param id - user id
 * @param body - Upload details
 */
export const userUploadSignature = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/upload";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["body"] !== undefined) {
    body = parameters["body"];
  }
  if (parameters["body"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: body"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("post", path, body, queryParameters, form, config);
};
/**
 *
 * request: userVerifyPhone
 * URL: POST /users/{id}/verifyPhone
 * @param id - user id
 * @param body -
 */
export const userVerifyPhone = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/verifyPhone";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["body"] !== undefined) {
    queryParameters["body"] = parameters["body"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("post", path, body, queryParameters, form, config);
};
/**
 *
 * request: userMatch
 * URL: GET /users/{id}/match
 * @param id - user id
 * @param req -
 */
export const userMatch = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/match";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["req"] !== undefined) {
    body = parameters["req"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 *
 * request: userMe
 * URL: GET /users/me
 * @param accessToken -
 */
export const userMe = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/me";
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters["accessToken"] !== undefined) {
    queryParameters["accessToken"] = parameters["accessToken"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 *
 * request: userLocate
 * URL: GET /users/{id}/locate
 * @param id - user id
 */
export const userLocate = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/locate";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 *
 * request: userSupportSeen
 * URL: PUT /users/{id}/support/seen
 * @param id - user id
 */
export const userSupportSeen = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/support/seen";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("put", path, body, queryParameters, form, config);
};
/**
 *
 * request: userRegister
 * URL: POST /users/register
 * @param user -
 */
export const userRegister = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/register";
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters["user"] !== undefined) {
    body = parameters["user"];
  }
  if (parameters["user"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: user"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("post", path, body, queryParameters, form, config);
};
/**
 *
 * request: userDeviceUpsert
 * URL: POST /users/{id}/device
 * @param id - user id
 * @param uid -
 * @param data -
 */
export const userDeviceUpsert = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/device";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters["uid"] !== undefined) {
    queryParameters["uid"] = parameters["uid"];
  }
  if (parameters["data"] !== undefined) {
    body = parameters["data"];
  }
  if (parameters["data"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: data"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("post", path, body, queryParameters, form, config);
};
/**
 *
 * request: userGetSupports
 * URL: GET /users/support
 * @param id -
 * @param filter -
 */
export const userGetSupports = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/support";
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters["id"] !== undefined) {
    queryParameters["id"] = parameters["id"];
  }
  if (parameters["filter"] !== undefined) {
    queryParameters["filter"] = parameters["filter"];
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 *
 * request: userPostSupports
 * URL: POST /users/support
 * @param data -
 */
export const userPostSupports = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/support";
  let body;
  let queryParameters = {};
  let form = {};
  if (parameters["data"] !== undefined) {
    body = parameters["data"];
  }
  if (parameters["data"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: data"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("post", path, body, queryParameters, form, config);
};
/**
 *
 * request: userGetSupportById
 * URL: GET /users/support/{id}
 * @param id -
 */
export const userGetSupportById = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/support/{id}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
/**
 *
 * request: userSeenByAdmin
 * URL: PUT /users/support/{id}/seenByAdmin
 * @param id -
 */
export const userSeenByAdmin = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/support/{id}/seenByAdmin";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("put", path, body, queryParameters, form, config);
};
/**
 * Find a related item by id for accessTokens.
 * request: userFindByIdAceessTokens
 * URL: GET /users/{id}/accessTokens/{fk}
 * @param id - user id
 * @param fk - Foreign key for accessTokens
 */
export const userFindByIdAceessTokens = function(parameters = {}) {
  const config = parameters.$config;
  let path = "/users/{id}/accessTokens/{fk}";
  let body;
  let queryParameters = {};
  let form = {};
  path = path.replace("{id}", `${parameters["id"]}`);
  if (parameters["id"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: id"));
  }
  path = path.replace("{fk}", `${parameters["fk"]}`);
  if (parameters["fk"] === undefined) {
    return Promise.reject(new Error("Missing required  parameter: fk"));
  }
  if (parameters.$queryParameters) {
    Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
      queryParameters[parameterName] =
        parameters.$queryParameters[parameterName];
    });
  }
  return request("get", path, body, queryParameters, form, config);
};
