import pluginCall from 'sketch-module-web-view/client';

const copyStyle = function(style){
	let input = document.getElementById('copyInput');
	input.setAttribute('value', style);
	input.select();
	if (document.execCommand('copy')) {
		document.execCommand('copy');
		console.log('复制样式成功');
	}
}

window.updatePreview = function (style) {
  pluginCall('nativeLog', 'Called from the webview');
  document.querySelector("#textCSS").innerHTML = style;
  //copyStyle(style);
};






