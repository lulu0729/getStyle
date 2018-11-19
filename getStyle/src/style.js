import {getSettings} from './unit';
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
const convertUnit = function(rect,settings){
        //log("width:"+rect.width * 100/750+ "vw;");
        //log("height:"+rect.height * 100/750+ "vw;");
        let widthUnit = settings.width,
            heightUnit = settings.height;
        let style = "";
        if(widthUnit == "px"){
          style +=  "width:" + (rect.width / 2) + "px;<br>";
        }else if(widthUnit == "vw"){
          style +=  "width:" + (rect.width * 100/750).toFixed(6) + "vw;<br>";
        }
        if(heightUnit == "px"){
          style +=  "height:" + (rect.height / 2) + "px;<br>";
        }else if(heightUnit == "vw"){
          style +=  "height:" + (rect.height * 100/750).toFixed(6) + "vw;<br>";
        }
        log('react style:' + style);
        return style;
    };
const convertPosition = function(rect1,rect2){
    let left = Math.round(rect1.x - rect2.x),
        top = Math.round(rect1.y - rect2.y),
        right = Math.round(rect1.maxX - rect2.maxX),
        bottom = Math.round(rect1.maxY - rect2.maxY);
    let textCSS = "left:" + (left * 100/750).toFixed(6) + "vw;<br>" + "top:" + (top * 100/750).toFixed(6)+ "vw;<br>" + "right:" + (right * 100/750).toFixed(6)+ "vw;<br>"+ "bottom:" + (bottom * 100/750).toFixed(6)+ "vw;<br>"
    //log(textCSS);
    return textCSS;
}
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
            if(fontSizeUnit == "px"){
              
              textCSS += "font-size:" + Math.round(fontSize/2) + "px;<br>";
            }else if(fontSizeUnit == "vw"){
              textCSS += "font-size:" + (fontSize * 100/750).toFixed(6) + "vw;<br>";
            }
        }
        if(lineHeight){
          log('lineHeightUnit:' + lineHeightUnit);
            if(lineHeightUnit == "px"){
              textCSS += "line-height:" + Math.round(lineHeight/2) + "px;<br>";
            }else if(lineHeightUnit == "vw"){
              textCSS += "line-height:" + (lineHeight * 100/750).toFixed(6) + "vw;<br>";
            }
            
        }
    textCSS += "color:" + rgbaCode(textColor);
    let shadow = topShadow(text.style());
    if (shadow) {
      textCSS += "text-shadow:" + rgbaCode(shadow.color())  + ' ' + shadow.offsetX()/2 + "px " + shadow.offsetY()/2 + "px " + shadow.blurRadius()/2 + "px;<br>";
    }

    return textCSS
}
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
  if (border) {
    textCSS += "border:" + Math.ceil(border.thickness()/2) + "px " + " solid " + rgbaCode(border.color()) + ";<br>";
    
  }

  let shadow = topShadow(layer.style());
  if (shadow) {
    textCSS += "box-shadow:" + rgbaCode(shadow.color())  + ' ' + Math.ceil(shadow.offsetX()/2) + "px " + Math.ceil(shadow.offsetY()/2) + "px " + Math.ceil(shadow.blurRadius()/2) + "px;<br>";
  }

  let opacity = layer.style().contextSettings().opacity();
  if (opacity != 1) {
    textCSS += "opacity:" + opacity + ";<br>";
  }

  return textCSS;
}
const rgbaCode = function(colour) {
  let red = Math.round(colour.red() * 255);
  let green = Math.round(colour.green() * 255);
  let blue = Math.round(colour.blue() * 255);

  return 'rgba(' + red + ',' + green + ',' + blue + ',' + colour.alpha().toFixed(2) + ')';
}
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

const topShadow = function(style) {
  let shadows = style.enabledShadows();
  let len = shadows.length;

  if (len == 0) {
    return null;
  } else {
    return shadows[len - 1];
  }
}



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

            /*var target = (selection.count() == 1)? selection[0]: selection[1],
                layer = (selection.count() == 1)? this.current: selection[0];
            var targetRect = this.getRect(target),
                layerRect = this.getRect(layer);
            style = this.convertPosition(targetRect,layerRect);*/
            log(style);
            
            return style;
        }
}