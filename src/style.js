import {getSettings} from './unit';

////////////////////////////////////////////////////////////////////////////////
//获取图层的宽高位置数据
const getRect = function(layer){
     let rect = layer.absoluteRect();
        return {
            x: Math.round(rect.x()),
            y: Math.round(rect.y()),
            width: Math.round(rect.width()),
            height: Math.round(rect.height()),
            maxX: Math.round(rect.x() + rect.width()),
            maxY: Math.round(rect.y() + rect.height()),
            setX: function(x){ rect.setX(x); this.x = x; this.maxX = this.x + this.width; },
            setY: function(y){ rect.setY(y); this.y = y; this.maxY = this.y + this.height; },
            setWidth: function(width){ rect.setWidth(width); this.width = width; this.maxX = this.x + this.width; },
            setHeight: function(height){ rect.setHeight(height); this.height = height; this.maxY = this.y + this.height; }
        };
    };
////////////////////////////////////////////////////////////////////////////////
//转换图层的宽高单位
const convertUnit = function(rect,settings){
        //log("width:"+rect.width * 100/750+ "vw;");
        //log("height:"+rect.height * 100/750+ "vw;");
        let widthUnit = settings.width,
            heightUnit = settings.height;
        let textCSS = "";
        switch(widthUnit){
          case "px@0.5x":
            textCSS +=  "width:" + (rect.width / 2) + "px;<br>";
            break;
          case "px":
            textCSS +=  "width:" + rect.width  + "px;<br>";
            break;
          case "vw":
            textCSS +=  "width:" + (rect.width * 100/750).toFixed(6) + "vw;<br>";
            break;
          case "rpx":
            textCSS +=  "width:" + rect.width  + "rpx;<br>";
            break;
          default:
            log("无法识别这个单位");
            break;
        }
        switch(heightUnit){
          case "px@0.5x":
            textCSS +=  "height:" + (rect.height / 2) + "px;<br>";
            break;
          case "px":
            textCSS +=  "height:" + rect.height  + "px;<br>";
            break;
          case "vw":
            textCSS +=  "height:" + (rect.height * 100/750).toFixed(6) + "vw;<br>";
            break;
          case "rpx":
            textCSS +=  "height:" + rect.height  + "rpx;<br>";
            break;
          default:
            log("无法识别这个单位");
            break;
        }
        log('react style:' + textCSS);
        return textCSS;
    };
////////////////////////////////////////////////////////////////////////////////
//转换图层的位置单位
const convertPosition = function(rect1,rect2,settings){
    let left = Math.round(rect1.x - rect2.x),
        top = Math.round(rect1.y - rect2.y),
        right = Math.round(rect1.maxX - rect2.maxX),
        bottom = Math.round(rect1.maxY - rect2.maxY);
    let textCSS = "";
    let positionUnit = settings.position;
        switch(positionUnit){
          case "px@0.5x":
            textCSS +=  "left:" + (left/2) + "px;<br>" + "top:" + (top/2)+ "px;<br>" + "right:" + (right/2)+ "px;<br>"+ "bottom:" + (bottom/2)+ "px;<br>";
            break;
          case "px":
            textCSS +=  "left:" + left + "px;<br>" + "top:" + top+ "px;<br>" + "right:" + right+ "px;<br>"+ "bottom:" + bottom+ "px;<br>";
            break;
          case "vw":
            textCSS = "left:" + (left * 100/750).toFixed(6) + "vw;<br>" + "top:" + (top * 100/750).toFixed(6)+ "vw;<br>" + "right:" + (right * 100/750).toFixed(6)+ "vw;<br>"+ "bottom:" + (bottom * 100/750).toFixed(6)+ "vw;<br>";
            break;
          case "rpx":
            textCSS +=  "left:" + left + "rpx;<br>" + "top:" + top+ "rpx;<br>" + "right:" + right+ "rpx;<br>"+ "bottom:" + bottom+ "rpx;<br>";
            break;
          default:
            log("无法识别这个单位");
            break;
        }
    return textCSS;
}
////////////////////////////////////////////////////////////////////////////////
//获取text类型图层的样式
const getTextStyle = function(text,settings){
    let textCSS = '';
    //let attributes = text.attributedString().treeAsDictionary().value.attributes;
    let fontSize = text.fontSize(),//获取font-size
        lineHeight = text.lineHeight(),//获取line-height
        textColor = text.textColor();//获取color
    let fontSizeUnit = settings.fontSize,
        lineHeightUnit = settings.lineHeight;
    log('fontSize:' + fontSize);
    log('lineHeight:' + lineHeight);
    log('textColor:' + textColor);
    
        if(fontSize){
          log('fontSizeUnit:' + fontSizeUnit);
            switch(fontSizeUnit){
              case "px@0.5x":
                textCSS += "font-size:" + Math.round(fontSize/2) + "px;<br>";
                break;
              case "px":
                textCSS += "font-size:" + Math.round(fontSize) + "px;<br>";
                break;
              case "vw":
                textCSS += "font-size:" + (fontSize * 100/750).toFixed(6) + "vw;<br>";
                break;
              case "rpx":
                textCSS += "font-size:" + Math.round(fontSize) + "rpx;<br>";
                break;
              default:
                log("无法识别这个单位");
                break;
            }
        }
        if(lineHeight){
          log('lineHeightUnit:' + lineHeightUnit);
          switch(lineHeightUnit){
              case "px@0.5x":
                textCSS += "line-height:" + Math.round(lineHeight/2) + "px;<br>";
                break;
              case "px":
                textCSS += "line-height:" + Math.round(lineHeight) + "px;<br>";
                break;
              case "vw":
                textCSS += "line-height:" + (lineHeight * 100/750).toFixed(6) + "vw;<br>";
                break;
              case "rpx":
                textCSS += "line-height:" + Math.round(lineHeight) + "rpx;<br>";
                break;
              default:
                log("无法识别这个单位");
                break;
          }
            
        }
    textCSS += "color:" + rgbaCode(textColor) +";<br>";
    let shadow = topShadow(text.style());
    let shadowUnit = settings.textShadow;
    if (shadow) {
    switch(shadowUnit){
      case "px@0.5x":
        textCSS += "box-shadow:" + rgbaCode(shadow.color())  + ' ' + Math.ceil(shadow.offsetX()/2) + "px " + Math.ceil(shadow.offsetY()/2) + "px " + Math.ceil(shadow.blurRadius()/2) + "px;<br>";
      break;
      case "px":
        textCSS += "box-shadow:" + rgbaCode(shadow.color())  + ' ' + Math.ceil(shadow.offsetX()) + "px " + Math.ceil(shadow.offsetY()) + "px " + Math.ceil(shadow.blurRadius()) + "px;<br>";
      break;
      case "vw":
        textCSS += "box-shadow:" + rgbaCode(shadow.color())  + ' ' + (shadow.offsetX() * 100/750).toFixed(6) + "vw " + (shadow.offsetY() * 100/750).toFixed(6) + "vw " + (shadow.blurRadius() * 100/750).toFixed(6) + "vw;<br>";
      break;
      case "rpx":
        textCSS += "box-shadow:" + rgbaCode(shadow.color())  + ' ' + Math.ceil(shadow.offsetX()) + "rpx " + Math.ceil(shadow.offsetY()) + "rpx " + Math.ceil(shadow.blurRadius()) + "rpx;<br>";
      break;
        default:
          log("无法识别这个单位");
        break;
     }
  }

    return textCSS
}
////////////////////////////////////////////////////////////////////////////////
//获取非文字图层的样式
const getLayerStyle = function(layer,settings) {

  let textCSS = '';

  let fill = topFill(layer.style());
  log(fill.type);
  if (fill.type == 0) {
    textCSS += "background-color:" + rgbaCode(fill.bg.color()) + ";<br>";
  }else if(fill.type == 1){  
    if(fill.bg.indexOf('deg') != -1){//判断是不是linear-gradient
      log(fill.bg.indexOf('deg'));
      textCSS += "background-image:" + "linear-gradient(" + fill.bg + ");<br>";
    }else{//判断是不是radial-gradient
      textCSS += "background-image:" + "radial-gradient(" + fill.bg + ");<br>";
    }
  }
  //let borderRadius = layer.layers().firstObject().cornerRadiusFloat();
  /*if (isCircle(layer)) {
    textCSS += "border-radius:" + framerObject.width / 2 + "px;<br>";
  } else {
  if(borderRadius){
    textCSS += "border-radius:" + Math.ceil(borderRadius/2) + "px;<br>";
  }
  */
  let border = topBorder(layer.style());
  let borderUnit = settings.border;
  if (border) {
    //log("borderColor:" + border.color());
    //log("borderRgbaColor:" + rgbaCode(border.color()));
    switch(borderUnit){
              case "px@0.5x":
                textCSS += "border:" + Math.ceil(border.thickness()/2) + "px " + " solid " + rgbaCode(border.color()) + ";<br>";
                break;
              case "px":
                textCSS += "border:" + Math.ceil(border.thickness()) + "px " + " solid " + rgbaCode(border.color()) + ";<br>";
                break;
              case "vw":
                textCSS += "border:" + (border.thickness() * 100/750).toFixed(6) + "px " + " solid " + rgbaCode(border.color()) + ";<br>";
                break;
              case "rpx":
                textCSS += "border:" + Math.ceil(border.thickness()) + "rpx " + " solid " + rgbaCode(border.color()) + ";<br>";
                break;
              default:
                log("无法识别这个单位");
                break;
     }
  }else{
    log("没有border样式");
    log("border" + border);
  }

  let shadow = topShadow(layer.style());
  let shadowUnit = settings.boxShadow;
  if (shadow) {
    switch(shadowUnit){
      case "px@0.5x":
        textCSS += "box-shadow:" + rgbaCode(shadow.color())  + ' ' + Math.ceil(shadow.offsetX()/2) + "px " + Math.ceil(shadow.offsetY()/2) + "px " + Math.ceil(shadow.blurRadius()/2) + "px;<br>";
      break;
      case "px":
        textCSS += "box-shadow:" + rgbaCode(shadow.color())  + ' ' + Math.ceil(shadow.offsetX()) + "px " + Math.ceil(shadow.offsetY()) + "px " + Math.ceil(shadow.blurRadius()) + "px;<br>";
      break;
      case "vw":
        textCSS += "box-shadow:" + rgbaCode(shadow.color())  + ' ' + (shadow.offsetX() * 100/750).toFixed(6) + "vw " + (shadow.offsetY() * 100/750).toFixed(6) + "vw " + (shadow.blurRadius() * 100/750).toFixed(6) + "vw;<br>";
      break;
      case "rpx":
        textCSS += "box-shadow:" + rgbaCode(shadow.color())  + ' ' + Math.ceil(shadow.offsetX()) + "rpx " + Math.ceil(shadow.offsetY()) + "rpx " + Math.ceil(shadow.blurRadius()) + "rpx;<br>";
      break;
        default:
          log("无法识别这个单位");
        break;
     }
  }

  let opacity = layer.style().contextSettings().opacity();
  if (opacity != 1) {
    textCSS += "opacity:" + opacity + ";<br>";
  }

  return textCSS;
}
////////////////////////////////////////////////////////////////////////////////
//颜色转为rgba形式
const rgbaCode = function(colour) {
  let red = Math.round(colour.red() * 255);
  let green = Math.round(colour.green() * 255);
  let blue = Math.round(colour.blue() * 255);

  return 'rgba(' + red + ',' + green + ',' + blue + ',' + colour.alpha().toFixed(2) + ')';
}
////////////////////////////////////////////////////////////////////////////////
//获取填充的颜色、渐变
const topFill = function(style) {
  var fills = style.enabledFills(),
      fill = {
        type: null,
        bg: null
      };

  var i, len = null;
  for (i = 0, len = fills.length; i < len; i++) {
    var fillType = fills[i].fillType();
    log(fillType);
    if (fillType == 0) {
      fill.bg = fills[i];
      log('fillBg:' + fill.bg);
      log('filleType:' + fill.type);
    }else{
      fill.type = fillType;
      fill.bg = fills[i].gradient().gradientStringWithMasterAlpha(5);
      log('fillBg:' + fill.bg);
      log('filleType:' + fill.type);
    }

  }

  return fill;
}
////////////////////////////////////////////////////////////////////////////////
//获取border样式
const  topBorder = function(style) {
  var borders = style.enabledBorders();

  var i, len, border = null;
  for (i = 0, len = borders.length; i < len; i++) {
    var fillType = borders[i].fillType();
    if (fillType == 0) {
      border = borders[i];
    }
  }

  return border;
}
////////////////////////////////////////////////////////////////////////////////
//获取shadow样式
const topShadow = function(style) {
  let shadows = style.enabledShadows();
  let len = shadows.length;

  if (len == 0) {
    return null;
  } else {
    return shadows[len - 1];
  }
}
////////////////////////////////////////////////////////////////////////////////
export function getStyle(selection){
  let style = '';
  //let sketchObject = selection.sketchObject;
  let layerCount = selection.count();
  log(layerCount);

  if( !(layerCount > 0 && layerCount < 3) ){
    log("Select 1 or 2 layers to get style!");
            style = "Select 1 or 2 layers to get style!"
            return style;
 }else if(layerCount == 1){
            let settings = getSettings();
            log("Select 1!");
            log(settings);
            let targetRect = getRect(selection[0]);
            //转换宽高单位
            style = convertUnit(targetRect,settings);
            let layerClass = selection[0].class();
            //判断是否为group
            if((layerClass == MSShapeGroup) || (layerClass == MSRectangleShape)){
              log('is group or rectangle');
              style += getLayerStyle(selection[0],settings);
            }
            else if(layerClass == MSTextLayer){
              //判断是否为text
              log('is text');
              style += getTextStyle(selection[0],settings);
            }else{
              log(layerClass);
            }
                    //log(selection[0].CSSAttributes());
            return style;
        }else if(layerCount == 2){

           let target = (selection.count() == 1)? selection[0]: selection[1],
                layer = (selection.count() == 1)? this.current: selection[0];
            let targetRect = getRect(target),
                layerRect = getRect(layer);
            style = convertPosition(targetRect,layerRect,settings);
            log(style);
            
            return style;
        }
}