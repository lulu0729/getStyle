/*获取设置*/
import sketch from 'sketch';//引入sketch 的新API（新旧混用，心情复杂

export function getSettings(){
  let Settings = sketch.Settings;//引入sketch 的Settings API
  let settings = { //初始化settings
    width: 'vw',
    height: 'vw',
    fontSize: 'px',
    lineHeight: 'px',
    border: 'px',
    boxShadow: 'px',
    textShadow: 'px',
    position: 'vw'
  };

  Object.keys(settings).forEach(function(key){
    let value = settings[key],
        unit = Settings.settingForKey(key);
    if(unit !== value){
      //判断是否已重新设置单位，如有则更新settings
      settings[key] = unit;
      log(key + ':' + unit);
    }else{
      //未重新设置，则保持默认的
      log(key + "未重新设置");
    }
     

  });

  return settings;

}
