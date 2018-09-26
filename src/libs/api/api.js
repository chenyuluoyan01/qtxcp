﻿let Api = {
  login:Host+'platform/gatPlatform.do?method=sunny.fix.platform.user.login',
  quit: Host+'platform/gatPlatform.do?method=sunny.fix.platform.user.quit',
  upload:Host+'common/gateway.do?method=sunny.fix.common.upload.picture',
  promise:Host+'platform/gatPlatform.do?method=sunny.fix.platform.role.by.user',
  updatePass:Host+'platform/gatPlatform.do?method=sunny.fix.platform.update.password',
  //职位
  role:{
    get:Host+'platform/gatPlatform.do?method=sunny.fix.platform.role.fand',
    insert:Host+'platform/gatPlatform.do?method=sunny.fix.platform.role.insert',
    update:Host+'platform/gatPlatform.do?method=sunny.fix.platform.role.update',
    freeze:Host+'platform/gatPlatform.do?method=sunny.fix.platform.role.freeze',
    getP:Host+'platform/gatPlatform.do?method=sunny.fix.platform.role.fandRolePermission'
  },
  //管理员
  userB:{
    get:Host+'platform/gatPlatform.do?method=sunny.fix.platform.user.fand',
    insert:Host+'platform/gatPlatform.do?method=sunny.fix.platform.user.insert',
    update:Host+'platform/gatPlatform.do?method=sunny.fix.platform.user.update',
    freeze:Host+'platform/gatPlatform.do?method=sunny.fix.platform.user.freeze'
  },
  //banner
  banner:{
    get:Host+'platform/gatPlatform.do?method=sunny.fix.platform.banner.fand',
    insert:Host+'platform/gatPlatform.do?method=sunny.fix.platform.banner.insert',
    hidden:Host+'platform/gatPlatform.do?method=sunny.fix.platform.banner.hiddn',
    update:Host+'platform/gatPlatform.do?method=sunny.fix.platform.banner.update',
    sorts:Host+'platform/gatPlatform.do?method=sunny.fix.platform.banner.sort',
    delete:Host+'platform/gatPlatform.do?method=sunny.fix.platform.banner.delete',
  },
  //版本
  version:{
    get:Host+'platform/gatPlatform.do?method=sunny.fix.platform.version.fand',
    insert:Host+'platform/gatPlatform.do?method=sunny.fix.platform.version.insert',
    update:Host+'platform/gatPlatform.do?method=sunny.fix.platform.version.update',
    delete:Host+'platform/gatPlatform.do?method=sunny.fix.platform.version.delete',
  },
  //字典
  dictionary:{
    get:Host+'platform/gatPlatform.do?method=sunny.fix.platform.dictionary.fand',
    insert:Host+'platform/gatPlatform.do?method=sunny.fix.platform.dictionary.insert',
    update:Host+'platform/gatPlatform.do?method=sunny.fix.platform.dictionary.update',
    delete:Host+'platform/gatPlatform.do?method=sunny.fix.platform.dictionary.delete',
  },
  //服务
  server:{
    get:Host+'platformServiceItem/gatPlatformServiceItem.do?method=sunny.fix.platform.service.item.selectByPropery',
    getSingle:Host+'platformServiceItem/gatPlatformServiceItem.do?method=sunny.fix.platform.service.item.selectByPrimaryKey&itemCat=SOS',
    update:Host+'platformServiceItem/gatPlatformServiceItem.do?method=sunny.fix.platform.service.item.update&itemCat=SOS'
  },
  //汽车
  car:{
    brand:{
      get:Host+'platformCardBrand/gatPlatformCardBrand.do?method=sunny.fix.platform.car.brand.selectByPropery',
      insert:Host+'platformCardBrand/gatPlatformCardBrand.do?method=sunny.fix.platform.car.brand.insert',
      update:Host+'platformCardBrand/gatPlatformCardBrand.do?method=sunny.fix.platform.car.brand.update',
      delete:Host+'platformCardBrand/gatPlatformCardBrand.do?method=sunny.fix.platform.car.brand.delete',
    },
    cars:{
      delete:Host+'platformCardBrand/gatPlatformCardBrand.do?method=sunny.fix.platform.car.brand.deleteCarsId',
    },
    manual:{
      get:Host+'platformManual/gatPlatformManual.do?method=sunny.fix.platform.manual.selectByItemCat'
    },
    type:{
      get:Host+'platformCardType/gatPlatformCardType.do?method=sunny.fix.platform.car.type.selectByPropery',
      insert:Host+'platformCardType/gatPlatformCardType.do?method=sunny.fix.platform.car.type.insert',
      update:Host+'platformCardType/gatPlatformCardType.do?method=sunny.fix.platform.car.type.update',
      delete:Host+'platformCardType/gatPlatformCardType.do?method=sunny.fix.platform.car.type.delete',
      getByBrand:Host+'platformCardType/gatPlatformCardType.do?method=sunny.fix.platform.car.type.queryCardTypeByBrand',
      getByPrice:Host+'platformCardType/gatPlatformCardType.do?method=sunny.fix.platform.car.type.queryCardTypeByConsumptionLevel',
    }
  },
  //商品
  goods:{
    brand:{
      get:Host+'goods/gatGoods.do?method=sunny.fix.goods.brand.fand',
      insert:Host+'goods/gatGoods.do?method=sunny.fix.goods.brand.insert',
      update:Host+'goods/gatGoods.do?method=sunny.fix.goods.brand.update',
      delete:Host+'goods/gatGoods.do?method=sunny.fix.goods.brand.delete'
    },
    get:Host+'goods/gatGoods.do?method=sunny.fix.goods.fand',
    insert:Host+'goods/gatGoods.do?method=sunny.fix.goods.insert',
    update:Host+'goods/gatGoods.do?method=sunny.fix.goods.update',
    delete:Host+'goods/gatGoods.do?method=sunny.fix.goods.delete',
    putaway:Host+'goods/gatGoods.do?method=sunny.fix.goods.putaway'
  },
  //订单
  order:{
    get: Host + 'platform/gatPlatform.do?method=sunny.fix.order.platformorder.fand',
    detele: Host + 'order/gatOrder.do?method=sunny.fix.order.userorder.delete',
    carOwner: Host + 'platform/gatPlatform.do?method=sunny.fix.platform.user.userCard.fand',
    getAfterSale: Host+'factory/gatFactory.do?method=sunny.fix.factory.order.after.fand',
    platformDo: Host+'platform/gatPlatform.do?method=sunny.fix.platform.order.after.insert',
  },
  user:{
    carUser:{
      get:Host+'platform/gatPlatform.do?method=sunny.fix.platform.carowner.selectByExample',
      freeze:Host+'platform/gatPlatform.do?method=sunny.fix.platform.user.freeze',
      thaw:Host+'platform/gatPlatform.do?method=sunny.fix.platform.user.freeze',
      getById:Host+'platform/gatPlatform.do?method=sunny.fix.platform.carowner.selectByUserId'
    },
    factory:{
      get:Host+'factory/gatFactory.do?method=sunny.fix.factory.fand',
      insert:Host+'factory/gatFactory.do?method=sunny.fix.factory.insert',
      freeze:Host+'factory/gatFactory.do?method=sunny.fix.factory.freeze',
      getById:Host+'platform/gatPlatform.do?method=sunny.fix.platform.get.factory.by.id',
      getFactory:Host+'factory/gatFactory.do?method=sunny.fix.factory.fandFactory',
    }
  },
  msg:{
    mechanicsScience:{
      get: Host+'platform/gatPlatform.do?method=sunny.fix.platform.msg.selectByPropery',
      insert: Host+'platform/gatPlatform.do?method=sunny.fix.platform.msg.insert',
      update: Host+'platform/gatPlatform.do?method=sunny.fix.platform.msg.update',
      delete: Host+'platform/gatPlatform.do?method=sunny.fix.platform.msg.delete',
    },
    suggestion: {
      get: Host+'platform/gatPlatform.do?method=sunny.fix.platform.suggestion.selectByExample',
      view: Host+'platform/gatPlatform.do?method=sunny.fix.platform.suggestion.details',
      delete: Host+'platform/gatPlatform.do?method=sunny.fix.platform.suggestion.delete',
    },
    league: {
      get: Host+'platform/gatPlatform.do?method=sunny.fix.platform.user.league.list',
      keyWord: Host+'platform/gatPlatform.do?method=sunny.fix.platform.user.league.list'
    },
    pushmsg: {
      insert: Host+'platform/gatPlatform.do?method=sunny.fix.platform.pushmsg.insert',
      get: Host+'platform/gatPlatform.do?method=sunny.fix.platform.pushmsg.selectByPropery'
    },
    push: {
      get: Host+'platform/gatPlatform.do?method=sunny.fix.platform.msg.push.selectByPropery',
      insert: Host+'platform/gatPlatform.do?method=sunny.fix.platform.msg.push.insert'
    }
  },
  fee:{
    get:Host+'platform/gatPlatform.do?method=sunny.fix.platform.trade.record.list',
  },
  appraise:{
    get:Host+'platform/gatPlatform.do?method=sunny.fix.order.userorder.appraise',
    getById:Host+'platform/gatPlatform.do?method=sunny.fix.order.userorder.appraise.details',
    admin:Host+'platform/gatPlatform.do?method=sunny.fix.order.userorder.appraise.examine',
    delete:Host+'userCar/gatUserCar.do?method=sunny.fix.order.userorder.appraise.delete'
  }
};

export default Api
