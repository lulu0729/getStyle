import BrowserWindow from 'sketch-module-web-view';//引入webview的model
//import {UI} from 'sketch/ui';
import {getStyle} from './style';
import { isWebviewPresent, sendToWebview } from 'sketch-module-web-view/remote';


////////////////////////////////////////////////////////////////////////////////

// Using JSTalk clipboard handling snippet from https://gist.github.com/uhunkler/5465857 by Urs Hunkler
const clipboard = {
  // store the pasetboard object
  pasteBoard : null,

  // save the pasteboard object
  init : function()
  {
    this.pasteBoard = NSPasteboard.generalPasteboard();
  },
  // set the clipboard to the given text
  set : function( text )
  {
    if( typeof text === 'undefined' ) return null;

    if( !this.pasteBoard )
      this.init();

    this.pasteBoard.declareTypes_owner( [ NSPasteboardTypeString ], null );
    this.pasteBoard.setString_forType( text, NSPasteboardTypeString );

    return true;
  },
  // get text from the clipbaoard
  get : function()
  {
    if( !this.pasteBoard )
      this.init();

    var text = this.pasteBoard.stringForType( NSPasteboardTypeString );

    return text.toString();
  }
};
////////////////////////////////////////////////////////////////////////////////
export function onSelectionChanged(context) {
	const selection = context.actionContext.document.selectedLayers().layers();
	log('onSelectionChanged');
	const options = {
	    	identifier: 'unique.id',
	    	width: 500,
	    	height: 600,
	    	show: false
	    };
  	if (isWebviewPresent('unique.id')) {
  		log('isWebviewPresent');
		
	  		
	  	//win.show();

		let style = getStyle(selection);
		log('style:' + style);
		sendToWebview("unique.id","updatePreview('" + style + "')");
		//UI.message("已复制CSS样式到剪贴板~");
    	clipboard.set(style);
		
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
			//UI.message("已复制CSS样式到剪贴板~");
    		clipboard.set(style);
		  	
		});
	}
	
};