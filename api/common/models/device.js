// Copyright Interactive Object. 2016. All Rights Reserved.

module.exports = function(Device) {
  Device.disableRemoteMethodByName('delete')
  Device.disableRemoteMethodByName('deleteById')
  Device.disableRemoteMethodByName('replaceById')

  Device.disableRemoteMethodByName('updateAttributes')
  Device.disableRemoteMethodByName('createChangeStream')
  Device.disableRemoteMethodByName('updateAll')

  Device.disableRemoteMethodByName('upsertWithWhere')
  Device.disableRemoteMethodByName('replaceOrCreate')
  Device.disableRemoteMethodByName('findOne')
  
  
}