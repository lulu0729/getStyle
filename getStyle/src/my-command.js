import BrowserWindow from 'sketch-module-web-view';//引入webview的model
import {getStyle} from './style';
import { isWebviewPresent, sendToWebview } from 'sketch-module-web-view/remote';




export function onSelectionChanged(context) {
	const selection = context.actionContext.document.selectedLayers().layers();
	log('onSelectionChanged');
	const options = {
	    	identifier: 'unique.id',
	    	width: 400,
	    	height: 600,
	    	show: false
	    };
  	if (isWebviewPresent('unique.id')) {
  		log('isWebviewPresent');
		
	  		
	  	//win.show();

		let style = getStyle(selection);
		log('style:' + style);
		sendToWebview("unique.id","updatePreview('" + style + "')");
		
	}else{
		log('not isWebviewPresent');
		const win = new BrowserWindow(options);
		win.loadURL('../Resources/panel.html');
		win.once('ready-to-show', () => {
	  		let style;
	  		
	  		win.show();

			style = getStyle(selection);
			  	log('style:' + style);
			win.webContents.executeJavaScript(
	  				"updatePreview('" + style + "')"
			);
		  	
		});
	}
	
};