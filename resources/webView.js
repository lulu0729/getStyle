import pluginCall from 'sketch-module-web-view/client';


window.updatePreview = function (style) {
  pluginCall('nativeLog', 'Called from the webview');
  
  document.querySelector("#textCSS").innerHTML = style;
  //copyStyle(style);
};







