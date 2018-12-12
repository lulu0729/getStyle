import BrowserWindow from 'sketch-module-web-view';//引入webview的model
//import { isWebviewPresent, sendToWebview } from 'sketch-module-web-view/remote';
import sketch from 'sketch';//引入sketch 的新API（新旧混用，心情复杂）
import {getSettings} from './unit';

export default function(){
	let Settings = sketch.Settings;//Settings API
	
	
	const options = {
	    	identifier: 'unique.id.setting',
	    	width: 400,
	    	height: 600,
	    	show: false
	};
	const win = new BrowserWindow(options);
	
	win.once('ready-to-show', () => {
		let settings = getSettings();//获取已设置的settings
		log("settings" + settings);
		for(let key in settings){
			win.webContents.executeJavaScript(
	  				"innerSettings('" + key + "','" + settings[key] + "')"
			);
		}
		
	  		win.show();


	});
	win.webContents.on('nativeLog', (key, value) => {
    	log('set key:' + key);
    	log('set value:' + value);
		Settings.setSettingForKey(key,value);
		win.close();
  	});
	//log('sendMessage');
	win.loadURL('../Resources/settings-panel.html');
	
}