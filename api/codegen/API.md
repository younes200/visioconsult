# VisioConsult
## Fetches belongsTo relation user.
### GET /userIdentities/{id}/user


```javascript
import { userIdentityGetUser } from 'Agent'

// Fetches belongsTo relation user.
let query = {
  id: null // userIdentity id required
  refresh: null //  optional
}

try {
  let {data} = await userIdentityGetUser(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Create a new instance of the model and persist it into the data source.
### POST /userIdentities


```javascript
import { userIdentityCreate } from 'Agent'

// Create a new instance of the model and persist it into the data source.
let query = {
  data: null // Model instance data optional
}

try {
  let {data} = await userIdentityCreate(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Patch an existing model instance or insert a new one into the data source.
### PATCH /userIdentities


```javascript
import { userIdentityPatchOrCreate } from 'Agent'

// Patch an existing model instance or insert a new one into the data source.
let query = {
  data: null // Model instance data optional
}

try {
  let {data} = await userIdentityPatchOrCreate(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Replace an existing model instance or insert a new one into the data source.
### PUT /userIdentities


```javascript
import { userIdentityReplaceOrCreatePutUserIdentities } from 'Agent'

// Replace an existing model instance or insert a new one into the data source.
let query = {
  data: null // Model instance data optional
}

try {
  let {data} = await userIdentityReplaceOrCreatePutUserIdentities(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Find all instances of the model matched by filter from the data source.
### GET /userIdentities


```javascript
import { userIdentityFind } from 'Agent'

// Find all instances of the model matched by filter from the data source.
let query = {
  filter: null // Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"}) optional
}

try {
  let {data} = await userIdentityFind(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Replace an existing model instance or insert a new one into the data source.
### POST /userIdentities/replaceOrCreate


```javascript
import { userIdentityReplaceOrCreatePostUserIdentitiesReplaceOrCreate } from 'Agent'

// Replace an existing model instance or insert a new one into the data source.
let query = {
  data: null // Model instance data optional
}

try {
  let {data} = await userIdentityReplaceOrCreatePostUserIdentitiesReplaceOrCreate(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Update an existing model instance or insert a new one into the data source based on the where criteria.
### POST /userIdentities/upsertWithWhere


```javascript
import { userIdentityUpsertWithWhere } from 'Agent'

// Update an existing model instance or insert a new one into the data source based on the where criteria.
let query = {
  where: null // Criteria to match model instances optional
  data: null // An object of model property name/value pairs optional
}

try {
  let {data} = await userIdentityUpsertWithWhere(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Check whether a model instance exists in the data source.
### GET /userIdentities/{id}/exists


```javascript
import { userIdentityExistsGetUserIdentitiesIdExists } from 'Agent'

// Check whether a model instance exists in the data source.
let query = {
  id: null // Model id required
}

try {
  let {data} = await userIdentityExistsGetUserIdentitiesIdExists(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Check whether a model instance exists in the data source.
### HEAD /userIdentities/{id}


```javascript
import { userIdentityExistsHeadUserIdentitiesId } from 'Agent'

// Check whether a model instance exists in the data source.
let query = {
  id: null // Model id required
}

try {
  let {data} = await userIdentityExistsHeadUserIdentitiesId(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Find a model instance by {{id}} from the data source.
### GET /userIdentities/{id}


```javascript
import { userIdentityFindById } from 'Agent'

// Find a model instance by {{id}} from the data source.
let query = {
  id: null // Model id required
  filter: null // Filter defining fields and include - must be a JSON-encoded string ({"something":"value"}) optional
}

try {
  let {data} = await userIdentityFindById(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Replace attributes for a model instance and persist it into the data source.
### PUT /userIdentities/{id}


```javascript
import { userIdentityReplaceByIdPutUserIdentitiesId } from 'Agent'

// Replace attributes for a model instance and persist it into the data source.
let query = {
  id: null // Model id required
  data: null // Model instance data optional
}

try {
  let {data} = await userIdentityReplaceByIdPutUserIdentitiesId(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Delete a model instance by {{id}} from the data source.
### DELETE /userIdentities/{id}


```javascript
import { userIdentityDeleteById } from 'Agent'

// Delete a model instance by {{id}} from the data source.
let query = {
  id: null // Model id required
}

try {
  let {data} = await userIdentityDeleteById(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Patch attributes for a model instance and persist it into the data source.
### PATCH /userIdentities/{id}


```javascript
import { userIdentityPatchAttributes } from 'Agent'

// Patch attributes for a model instance and persist it into the data source.
let query = {
  id: null // userIdentity id required
  data: null // An object of model property name/value pairs optional
}

try {
  let {data} = await userIdentityPatchAttributes(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Replace attributes for a model instance and persist it into the data source.
### POST /userIdentities/{id}/replace


```javascript
import { userIdentityReplaceByIdPostUserIdentitiesIdReplace } from 'Agent'

// Replace attributes for a model instance and persist it into the data source.
let query = {
  id: null // Model id required
  data: null // Model instance data optional
}

try {
  let {data} = await userIdentityReplaceByIdPostUserIdentitiesIdReplace(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Find first instance of the model matched by filter from the data source.
### GET /userIdentities/findOne


```javascript
import { userIdentityFindOne } from 'Agent'

// Find first instance of the model matched by filter from the data source.
let query = {
  filter: null // Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"}) optional
}

try {
  let {data} = await userIdentityFindOne(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Update instances of the model matched by {{where}} from the data source.
### POST /userIdentities/update


```javascript
import { userIdentityUpdateAll } from 'Agent'

// Update instances of the model matched by {{where}} from the data source.
let query = {
  where: null // Criteria to match model instances optional
  data: null // An object of model property name/value pairs optional
}

try {
  let {data} = await userIdentityUpdateAll(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Count instances of the model matched by where from the data source.
### GET /userIdentities/count


```javascript
import { userIdentityCount } from 'Agent'

// Count instances of the model matched by where from the data source.
let query = {
  where: null // Criteria to match model instances optional
}

try {
  let {data} = await userIdentityCount(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Create a change stream.
### POST /userIdentities/change-stream


```javascript
import { userIdentityCreateChangeStreamPostUserIdentitiesChangeStream } from 'Agent'

// Create a change stream.
let query = {
  options: null //  optional
}

try {
  let {data} = await userIdentityCreateChangeStreamPostUserIdentitiesChangeStream(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Create a change stream.
### GET /userIdentities/change-stream


```javascript
import { userIdentityCreateChangeStreamGetUserIdentitiesChangeStream } from 'Agent'

// Create a change stream.
let query = {
  options: null //  optional
}

try {
  let {data} = await userIdentityCreateChangeStreamGetUserIdentitiesChangeStream(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Find a related item by id for roles.
### GET /users/{id}/roles/{fk}


```javascript
import { userFindByIdRoles } from 'Agent'

// Find a related item by id for roles.
let query = {
  id: null // user id required
  fk: null // Foreign key for roles required
}

try {
  let {data} = await userFindByIdRoles(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Add a related item by id for roles.
### PUT /users/{id}/roles/rel/{fk}


```javascript
import { userLinkRoles } from 'Agent'

// Add a related item by id for roles.
let query = {
  id: null // user id required
  fk: null // Foreign key for roles required
  data: null //  optional
}

try {
  let {data} = await userLinkRoles(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Remove the roles relation to an item by id.
### DELETE /users/{id}/roles/rel/{fk}


```javascript
import { userUnlinkRoles } from 'Agent'

// Remove the roles relation to an item by id.
let query = {
  id: null // user id required
  fk: null // Foreign key for roles required
}

try {
  let {data} = await userUnlinkRoles(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Check the existence of roles relation to an item by id.
### HEAD /users/{id}/roles/rel/{fk}


```javascript
import { userExistsRoles } from 'Agent'

// Check the existence of roles relation to an item by id.
let query = {
  id: null // user id required
  fk: null // Foreign key for roles required
}

try {
  let {data} = await userExistsRoles(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Find a related item by id for devices.
### GET /users/{id}/devices/{fk}


```javascript
import { userFindByIdDevices } from 'Agent'

// Find a related item by id for devices.
let query = {
  id: null // user id required
  fk: null // Foreign key for devices required
}

try {
  let {data} = await userFindByIdDevices(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Fetches hasOne relation patientSheet.
### GET /users/{id}/patientSheet


```javascript
import { userGetPatientSheet } from 'Agent'

// Fetches hasOne relation patientSheet.
let query = {
  id: null // user id required
  refresh: null //  optional
}

try {
  let {data} = await userGetPatientSheet(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Creates a new instance in patientSheet of this model.
### POST /users/{id}/patientSheet


```javascript
import { userCreatePatientSheet } from 'Agent'

// Creates a new instance in patientSheet of this model.
let query = {
  id: null // user id required
  data: null //  optional
}

try {
  let {data} = await userCreatePatientSheet(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Update patientSheet of this model.
### PUT /users/{id}/patientSheet


```javascript
import { userUpdatePatientSheet } from 'Agent'

// Update patientSheet of this model.
let query = {
  id: null // user id required
  data: null //  optional
}

try {
  let {data} = await userUpdatePatientSheet(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Deletes patientSheet of this model.
### DELETE /users/{id}/patientSheet


```javascript
import { userDestroyPatientSheet } from 'Agent'

// Deletes patientSheet of this model.
let query = {
  id: null // user id required
}

try {
  let {data} = await userDestroyPatientSheet(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Queries roles of user.
### GET /users/{id}/roles


```javascript
import { userGetRoles } from 'Agent'

// Queries roles of user.
let query = {
  id: null // user id required
  filter: null //  optional
}

try {
  let {data} = await userGetRoles(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Counts roles of user.
### GET /users/{id}/roles/count


```javascript
import { userCountRoles } from 'Agent'

// Counts roles of user.
let query = {
  id: null // user id required
  where: null // Criteria to match model instances optional
}

try {
  let {data} = await userCountRoles(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Queries devices of user.
### GET /users/{id}/devices


```javascript
import { userGetDevices } from 'Agent'

// Queries devices of user.
let query = {
  id: null // user id required
  filter: null //  optional
}

try {
  let {data} = await userGetDevices(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Counts devices of user.
### GET /users/{id}/devices/count


```javascript
import { userCountDevices } from 'Agent'

// Counts devices of user.
let query = {
  id: null // user id required
  where: null // Criteria to match model instances optional
}

try {
  let {data} = await userCountDevices(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Create a new instance of the model and persist it into the data source.
### POST /users


```javascript
import { userCreate } from 'Agent'

// Create a new instance of the model and persist it into the data source.
let query = {
  data: null // Model instance data optional
}

try {
  let {data} = await userCreate(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Find all instances of the model matched by filter from the data source.
### GET /users


```javascript
import { userFind } from 'Agent'

// Find all instances of the model matched by filter from the data source.
let query = {
  filter: null // Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"}) optional
}

try {
  let {data} = await userFind(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Find a model instance by {{id}} from the data source.
### GET /users/{id}


```javascript
import { userFindById } from 'Agent'

// Find a model instance by {{id}} from the data source.
let query = {
  id: null // Model id required
  filter: null // Filter defining fields and include - must be a JSON-encoded string ({"something":"value"}) optional
}

try {
  let {data} = await userFindById(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Replace attributes for a model instance and persist it into the data source.
### PUT /users/{id}


```javascript
import { userReplaceByIdPutUsersId } from 'Agent'

// Replace attributes for a model instance and persist it into the data source.
let query = {
  id: null // Model id required
  data: null // Model instance data optional
}

try {
  let {data} = await userReplaceByIdPutUsersId(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Delete a model instance by {{id}} from the data source.
### DELETE /users/{id}


```javascript
import { userDeleteById } from 'Agent'

// Delete a model instance by {{id}} from the data source.
let query = {
  id: null // Model id required
}

try {
  let {data} = await userDeleteById(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Patch attributes for a model instance and persist it into the data source.
### PATCH /users/{id}


```javascript
import { userPatchAttributes } from 'Agent'

// Patch attributes for a model instance and persist it into the data source.
let query = {
  id: null // user id required
  data: null // An object of model property name/value pairs optional
}

try {
  let {data} = await userPatchAttributes(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Replace attributes for a model instance and persist it into the data source.
### POST /users/{id}/replace


```javascript
import { userReplaceByIdPostUsersIdReplace } from 'Agent'

// Replace attributes for a model instance and persist it into the data source.
let query = {
  id: null // Model id required
  data: null // Model instance data optional
}

try {
  let {data} = await userReplaceByIdPostUsersIdReplace(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Find first instance of the model matched by filter from the data source.
### GET /users/findOne


```javascript
import { userFindOne } from 'Agent'

// Find first instance of the model matched by filter from the data source.
let query = {
  filter: null // Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"}) optional
}

try {
  let {data} = await userFindOne(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Count instances of the model matched by where from the data source.
### GET /users/count


```javascript
import { userCount } from 'Agent'

// Count instances of the model matched by where from the data source.
let query = {
  where: null // Criteria to match model instances optional
}

try {
  let {data} = await userCount(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Login a user with username/email and password.
### POST /users/login


```javascript
import { userLogin } from 'Agent'

// Login a user with username/email and password.
let query = {
  credentials: null //  required
  include: null // Related objects to include in the response. See the description of return value for more details. optional
}

try {
  let {data} = await userLogin(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Logout a user with access token.
### POST /users/logout


```javascript
import { userLogout } from 'Agent'

// Logout a user with access token.
let query = {
}

try {
  let {data} = await userLogout(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Trigger user's identity verification with configured verifyOptions
### POST /users/{id}/verify


```javascript
import { userVerifyPostUsersIdVerify } from 'Agent'

// Trigger user's identity verification with configured verifyOptions
let query = {
  id: null // user id required
}

try {
  let {data} = await userVerifyPostUsersIdVerify(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## 
### GET /users/{id}/verify


```javascript
import { userVerifyGetUsersIdVerify } from 'Agent'

// 
let query = {
  id: null // user id required
}

try {
  let {data} = await userVerifyGetUsersIdVerify(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Confirm a user registration with identity verification token.
### GET /users/confirm


```javascript
import { userConfirm } from 'Agent'

// Confirm a user registration with identity verification token.
let query = {
  uid: null //  required
  token: null //  required
  redirect: null //  optional
}

try {
  let {data} = await userConfirm(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Reset password for a user with email.
### POST /users/reset


```javascript
import { userResetPassword } from 'Agent'

// Reset password for a user with email.
let query = {
  options: null //  required
}

try {
  let {data} = await userResetPassword(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Change user password
### PUT /users/reset


```javascript
import { userChangePasswordPutUsersReset } from 'Agent'

// Change user password
let query = {
  credentials: null // new password required
}

try {
  let {data} = await userChangePasswordPutUsersReset(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Change a user's password.
### POST /users/change-password


```javascript
import { userChangePasswordPostUsersChangePassword } from 'Agent'

// Change a user's password.
let query = {
  oldPassword: null //  required
  newPassword: null //  required
}

try {
  let {data} = await userChangePasswordPostUsersChangePassword(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Reset user's password via a password-reset token.
### POST /users/reset-password


```javascript
import { userSetPassword } from 'Agent'

// Reset user's password via a password-reset token.
let query = {
  newPassword: null //  required
}

try {
  let {data} = await userSetPassword(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## 
### POST /users/{id}/upload


```javascript
import { userUploadSignature } from 'Agent'

// 
let query = {
  id: null // user id required
  body: null // Upload details required
}

try {
  let {data} = await userUploadSignature(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## 
### GET /users/me


```javascript
import { userMe } from 'Agent'

// 
let query = {
  accessToken: null //  optional
}

try {
  let {data} = await userMe(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## 
### POST /users/register


```javascript
import { userRegister } from 'Agent'

// 
let query = {
  user: null //  required
}

try {
  let {data} = await userRegister(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## 
### POST /users/{id}/device


```javascript
import { userDeviceUpsert } from 'Agent'

// 
let query = {
  id: null // user id required
  uid: null //  optional
  data: null //  required
}

try {
  let {data} = await userDeviceUpsert(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Fetches belongsTo relation user.
### GET /accessToken/{id}/user


```javascript
import { accessTokenGetUser } from 'Agent'

// Fetches belongsTo relation user.
let query = {
  id: null // accessToken id required
  refresh: null //  optional
}

try {
  let {data} = await accessTokenGetUser(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Create a new instance of the model and persist it into the data source.
### POST /accessToken


```javascript
import { accessTokenCreate } from 'Agent'

// Create a new instance of the model and persist it into the data source.
let query = {
  data: null // Model instance data optional
}

try {
  let {data} = await accessTokenCreate(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Patch an existing model instance or insert a new one into the data source.
### PATCH /accessToken


```javascript
import { accessTokenPatchOrCreate } from 'Agent'

// Patch an existing model instance or insert a new one into the data source.
let query = {
  data: null // Model instance data optional
}

try {
  let {data} = await accessTokenPatchOrCreate(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Replace an existing model instance or insert a new one into the data source.
### PUT /accessToken


```javascript
import { accessTokenReplaceOrCreatePutAccessToken } from 'Agent'

// Replace an existing model instance or insert a new one into the data source.
let query = {
  data: null // Model instance data optional
}

try {
  let {data} = await accessTokenReplaceOrCreatePutAccessToken(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Find all instances of the model matched by filter from the data source.
### GET /accessToken


```javascript
import { accessTokenFind } from 'Agent'

// Find all instances of the model matched by filter from the data source.
let query = {
  filter: null // Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"}) optional
}

try {
  let {data} = await accessTokenFind(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Replace an existing model instance or insert a new one into the data source.
### POST /accessToken/replaceOrCreate


```javascript
import { accessTokenReplaceOrCreatePostAccessTokenReplaceOrCreate } from 'Agent'

// Replace an existing model instance or insert a new one into the data source.
let query = {
  data: null // Model instance data optional
}

try {
  let {data} = await accessTokenReplaceOrCreatePostAccessTokenReplaceOrCreate(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Update an existing model instance or insert a new one into the data source based on the where criteria.
### POST /accessToken/upsertWithWhere


```javascript
import { accessTokenUpsertWithWhere } from 'Agent'

// Update an existing model instance or insert a new one into the data source based on the where criteria.
let query = {
  where: null // Criteria to match model instances optional
  data: null // An object of model property name/value pairs optional
}

try {
  let {data} = await accessTokenUpsertWithWhere(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Check whether a model instance exists in the data source.
### GET /accessToken/{id}/exists


```javascript
import { accessTokenExistsGetAccessTokenIdExists } from 'Agent'

// Check whether a model instance exists in the data source.
let query = {
  id: null // Model id required
}

try {
  let {data} = await accessTokenExistsGetAccessTokenIdExists(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Check whether a model instance exists in the data source.
### HEAD /accessToken/{id}


```javascript
import { accessTokenExistsHeadAccessTokenId } from 'Agent'

// Check whether a model instance exists in the data source.
let query = {
  id: null // Model id required
}

try {
  let {data} = await accessTokenExistsHeadAccessTokenId(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Find a model instance by {{id}} from the data source.
### GET /accessToken/{id}


```javascript
import { accessTokenFindById } from 'Agent'

// Find a model instance by {{id}} from the data source.
let query = {
  id: null // Model id required
  filter: null // Filter defining fields and include - must be a JSON-encoded string ({"something":"value"}) optional
}

try {
  let {data} = await accessTokenFindById(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Replace attributes for a model instance and persist it into the data source.
### PUT /accessToken/{id}


```javascript
import { accessTokenReplaceByIdPutAccessTokenId } from 'Agent'

// Replace attributes for a model instance and persist it into the data source.
let query = {
  id: null // Model id required
  data: null // Model instance data optional
}

try {
  let {data} = await accessTokenReplaceByIdPutAccessTokenId(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Delete a model instance by {{id}} from the data source.
### DELETE /accessToken/{id}


```javascript
import { accessTokenDeleteById } from 'Agent'

// Delete a model instance by {{id}} from the data source.
let query = {
  id: null // Model id required
}

try {
  let {data} = await accessTokenDeleteById(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Patch attributes for a model instance and persist it into the data source.
### PATCH /accessToken/{id}


```javascript
import { accessTokenPatchAttributes } from 'Agent'

// Patch attributes for a model instance and persist it into the data source.
let query = {
  id: null // accessToken id required
  data: null // An object of model property name/value pairs optional
}

try {
  let {data} = await accessTokenPatchAttributes(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Replace attributes for a model instance and persist it into the data source.
### POST /accessToken/{id}/replace


```javascript
import { accessTokenReplaceByIdPostAccessTokenIdReplace } from 'Agent'

// Replace attributes for a model instance and persist it into the data source.
let query = {
  id: null // Model id required
  data: null // Model instance data optional
}

try {
  let {data} = await accessTokenReplaceByIdPostAccessTokenIdReplace(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Find first instance of the model matched by filter from the data source.
### GET /accessToken/findOne


```javascript
import { accessTokenFindOne } from 'Agent'

// Find first instance of the model matched by filter from the data source.
let query = {
  filter: null // Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"}) optional
}

try {
  let {data} = await accessTokenFindOne(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Update instances of the model matched by {{where}} from the data source.
### POST /accessToken/update


```javascript
import { accessTokenUpdateAll } from 'Agent'

// Update instances of the model matched by {{where}} from the data source.
let query = {
  where: null // Criteria to match model instances optional
  data: null // An object of model property name/value pairs optional
}

try {
  let {data} = await accessTokenUpdateAll(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Count instances of the model matched by where from the data source.
### GET /accessToken/count


```javascript
import { accessTokenCount } from 'Agent'

// Count instances of the model matched by where from the data source.
let query = {
  where: null // Criteria to match model instances optional
}

try {
  let {data} = await accessTokenCount(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Create a change stream.
### POST /accessToken/change-stream


```javascript
import { accessTokenCreateChangeStreamPostAccessTokenChangeStream } from 'Agent'

// Create a change stream.
let query = {
  options: null //  optional
}

try {
  let {data} = await accessTokenCreateChangeStreamPostAccessTokenChangeStream(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Create a change stream.
### GET /accessToken/change-stream


```javascript
import { accessTokenCreateChangeStreamGetAccessTokenChangeStream } from 'Agent'

// Create a change stream.
let query = {
  options: null //  optional
}

try {
  let {data} = await accessTokenCreateChangeStreamGetAccessTokenChangeStream(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Find a related item by id for principals.
### GET /Roles/{id}/principals/{fk}


```javascript
import { roleFindByIdPrincipals } from 'Agent'

// Find a related item by id for principals.
let query = {
  id: null // Role id required
  fk: null // Foreign key for principals required
}

try {
  let {data} = await roleFindByIdPrincipals(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Delete a related item by id for principals.
### DELETE /Roles/{id}/principals/{fk}


```javascript
import { roleDestroyByIdPrincipals } from 'Agent'

// Delete a related item by id for principals.
let query = {
  id: null // Role id required
  fk: null // Foreign key for principals required
}

try {
  let {data} = await roleDestroyByIdPrincipals(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Update a related item by id for principals.
### PUT /Roles/{id}/principals/{fk}


```javascript
import { roleUpdateByIdPrincipals } from 'Agent'

// Update a related item by id for principals.
let query = {
  id: null // Role id required
  fk: null // Foreign key for principals required
  data: null //  optional
}

try {
  let {data} = await roleUpdateByIdPrincipals(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Queries principals of Role.
### GET /Roles/{id}/principals


```javascript
import { roleGetPrincipals } from 'Agent'

// Queries principals of Role.
let query = {
  id: null // Role id required
  filter: null //  optional
}

try {
  let {data} = await roleGetPrincipals(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Creates a new instance in principals of this model.
### POST /Roles/{id}/principals


```javascript
import { roleCreatePrincipals } from 'Agent'

// Creates a new instance in principals of this model.
let query = {
  id: null // Role id required
  data: null //  optional
}

try {
  let {data} = await roleCreatePrincipals(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Deletes all principals of this model.
### DELETE /Roles/{id}/principals


```javascript
import { roleDeletePrincipals } from 'Agent'

// Deletes all principals of this model.
let query = {
  id: null // Role id required
}

try {
  let {data} = await roleDeletePrincipals(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Counts principals of Role.
### GET /Roles/{id}/principals/count


```javascript
import { roleCountPrincipals } from 'Agent'

// Counts principals of Role.
let query = {
  id: null // Role id required
  where: null // Criteria to match model instances optional
}

try {
  let {data} = await roleCountPrincipals(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Create a new instance of the model and persist it into the data source.
### POST /Roles


```javascript
import { roleCreate } from 'Agent'

// Create a new instance of the model and persist it into the data source.
let query = {
  data: null // Model instance data optional
}

try {
  let {data} = await roleCreate(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Patch an existing model instance or insert a new one into the data source.
### PATCH /Roles


```javascript
import { rolePatchOrCreate } from 'Agent'

// Patch an existing model instance or insert a new one into the data source.
let query = {
  data: null // Model instance data optional
}

try {
  let {data} = await rolePatchOrCreate(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Replace an existing model instance or insert a new one into the data source.
### PUT /Roles


```javascript
import { roleReplaceOrCreatePutRoles } from 'Agent'

// Replace an existing model instance or insert a new one into the data source.
let query = {
  data: null // Model instance data optional
}

try {
  let {data} = await roleReplaceOrCreatePutRoles(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Find all instances of the model matched by filter from the data source.
### GET /Roles


```javascript
import { roleFind } from 'Agent'

// Find all instances of the model matched by filter from the data source.
let query = {
  filter: null // Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"}) optional
}

try {
  let {data} = await roleFind(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Replace an existing model instance or insert a new one into the data source.
### POST /Roles/replaceOrCreate


```javascript
import { roleReplaceOrCreatePostRolesReplaceOrCreate } from 'Agent'

// Replace an existing model instance or insert a new one into the data source.
let query = {
  data: null // Model instance data optional
}

try {
  let {data} = await roleReplaceOrCreatePostRolesReplaceOrCreate(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Update an existing model instance or insert a new one into the data source based on the where criteria.
### POST /Roles/upsertWithWhere


```javascript
import { roleUpsertWithWhere } from 'Agent'

// Update an existing model instance or insert a new one into the data source based on the where criteria.
let query = {
  where: null // Criteria to match model instances optional
  data: null // An object of model property name/value pairs optional
}

try {
  let {data} = await roleUpsertWithWhere(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Check whether a model instance exists in the data source.
### GET /Roles/{id}/exists


```javascript
import { roleExistsGetRolesIdExists } from 'Agent'

// Check whether a model instance exists in the data source.
let query = {
  id: null // Model id required
}

try {
  let {data} = await roleExistsGetRolesIdExists(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Check whether a model instance exists in the data source.
### HEAD /Roles/{id}


```javascript
import { roleExistsHeadRolesId } from 'Agent'

// Check whether a model instance exists in the data source.
let query = {
  id: null // Model id required
}

try {
  let {data} = await roleExistsHeadRolesId(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Find a model instance by {{id}} from the data source.
### GET /Roles/{id}


```javascript
import { roleFindById } from 'Agent'

// Find a model instance by {{id}} from the data source.
let query = {
  id: null // Model id required
  filter: null // Filter defining fields and include - must be a JSON-encoded string ({"something":"value"}) optional
}

try {
  let {data} = await roleFindById(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Replace attributes for a model instance and persist it into the data source.
### PUT /Roles/{id}


```javascript
import { roleReplaceByIdPutRolesId } from 'Agent'

// Replace attributes for a model instance and persist it into the data source.
let query = {
  id: null // Model id required
  data: null // Model instance data optional
}

try {
  let {data} = await roleReplaceByIdPutRolesId(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Delete a model instance by {{id}} from the data source.
### DELETE /Roles/{id}


```javascript
import { roleDeleteById } from 'Agent'

// Delete a model instance by {{id}} from the data source.
let query = {
  id: null // Model id required
}

try {
  let {data} = await roleDeleteById(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Patch attributes for a model instance and persist it into the data source.
### PATCH /Roles/{id}


```javascript
import { rolePatchAttributes } from 'Agent'

// Patch attributes for a model instance and persist it into the data source.
let query = {
  id: null // Role id required
  data: null // An object of model property name/value pairs optional
}

try {
  let {data} = await rolePatchAttributes(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Replace attributes for a model instance and persist it into the data source.
### POST /Roles/{id}/replace


```javascript
import { roleReplaceByIdPostRolesIdReplace } from 'Agent'

// Replace attributes for a model instance and persist it into the data source.
let query = {
  id: null // Model id required
  data: null // Model instance data optional
}

try {
  let {data} = await roleReplaceByIdPostRolesIdReplace(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Find first instance of the model matched by filter from the data source.
### GET /Roles/findOne


```javascript
import { roleFindOne } from 'Agent'

// Find first instance of the model matched by filter from the data source.
let query = {
  filter: null // Filter defining fields, where, include, order, offset, and limit - must be a JSON-encoded string ({"something":"value"}) optional
}

try {
  let {data} = await roleFindOne(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Update instances of the model matched by {{where}} from the data source.
### POST /Roles/update


```javascript
import { roleUpdateAll } from 'Agent'

// Update instances of the model matched by {{where}} from the data source.
let query = {
  where: null // Criteria to match model instances optional
  data: null // An object of model property name/value pairs optional
}

try {
  let {data} = await roleUpdateAll(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Count instances of the model matched by where from the data source.
### GET /Roles/count


```javascript
import { roleCount } from 'Agent'

// Count instances of the model matched by where from the data source.
let query = {
  where: null // Criteria to match model instances optional
}

try {
  let {data} = await roleCount(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Create a change stream.
### POST /Roles/change-stream


```javascript
import { roleCreateChangeStreamPostRolesChangeStream } from 'Agent'

// Create a change stream.
let query = {
  options: null //  optional
}

try {
  let {data} = await roleCreateChangeStreamPostRolesChangeStream(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
## Create a change stream.
### GET /Roles/change-stream


```javascript
import { roleCreateChangeStreamGetRolesChangeStream } from 'Agent'

// Create a change stream.
let query = {
  options: null //  optional
}

try {
  let {data} = await roleCreateChangeStreamGetRolesChangeStream(query)
  if (data) {
    // TODO
  }  
}catch(e){
  console.error(e)
}

```
