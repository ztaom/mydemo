﻿/*

By Dan Gries
www.flashandmath.com
dan@flashandmath.com

This code makes use of the JPGEncoder and PNGEncoder classes made available as 
part of the as3corelib project:

http://code.google.com/p/as3corelib/

*/


package com.flashandmath.dg.bitmapUtilities {
	
	import flash.display.Sprite;
	import flash.text.*;
	import flash.events.*;
	import flash.geom.Point;
	import flash.display.BitmapData;
	import flash.net.FileReference;
	import flash.utils.ByteArray;
	import com.adobe.images.JPGEncoder;
	import com.adobe.images.PNGEncoder;
	
	public class BitmapSaver extends Sprite {
		
		public static const BUTTON_CLICKED:String = "exportButtonClicked";
				
		private var _jpegQuality:Number;
		private var jpgEncoder:JPGEncoder;
		private var pngEncoder:PNGEncoder;
		private var fileRef:FileReference;
		
		public var bitmapDataToSave:BitmapData;
		
		private var _panelWidth:Number;
		private var _panelHeight:Number;
		private var _edgeColor:uint;
		private var _edgeAlpha:Number;
		private var _bgColor:uint;
		private var _bgAlpha:Number;
		private var _buttonColor:uint;
		private var _buttonBgAlpha:Number;
		private var _buttonTextColor:uint;
		private var _buttonTextSize:Number;	
		private var _buttonWidth:Number;
		private var _buttonHeight:Number;
		private var _pngButtonPos:Point;
		private var _jpgButtonPos:Point;
		private var _labelTextSize:Number;
		private var _inputTextBgColor:Number;
		private var _cancelButtonPos:Point;
		
		public var btnSaveJPG:Sprite;
		public var btnSavePNG:Sprite;
		public var btnCancel:Sprite;
		public var txtJPGQuality:TextField;
		
		public function BitmapSaver(bmd:BitmapData) {
			_panelWidth = 350;
			_panelHeight = 60;
			_edgeColor = 0xFFFFFF;
			_edgeAlpha = 0.5;
			_bgColor = 0xCCEEFF;
			_bgAlpha = 0.95;
			_buttonColor = 0xFFFFFF;
			_buttonBgAlpha = 1;
			_buttonTextColor = 0x000000;
			_buttonTextSize = 10;
			_labelTextSize = 10;
			_inputTextBgColor = 0xFFFFFF;
			_buttonWidth = 80;
			_buttonHeight = 20;
			_pngButtonPos = new Point(5,5);
			_jpgButtonPos = new Point(105,5);
			_cancelButtonPos = new Point(_panelWidth - _buttonWidth - 5, _panelHeight - _buttonHeight - 5);
			
			bitmapDataToSave = bmd;
			
			btnSaveJPG = new Sprite();
			btnSaveJPG.buttonMode = true;
			btnSaveJPG.addEventListener(MouseEvent.CLICK,btnExportJPGHandler);
			btnSavePNG = new Sprite();
			btnSavePNG.addEventListener(MouseEvent.CLICK,btnExportPNGHandler);
			btnSavePNG.buttonMode = true;
			btnCancel = new Sprite();
			btnCancel.addEventListener(MouseEvent.CLICK,btnCancelHandler);
			btnCancel.buttonMode = true;
			_jpegQuality = 100;
			
			redraw();
		}
		
		private function redraw():void {
			
			//panel
			this.graphics.clear();
			this.graphics.lineStyle(2,_edgeColor,_edgeAlpha);
			this.graphics.beginFill(_bgColor, _bgAlpha);
			this.graphics.drawRect(0,0,_panelWidth,_panelHeight);
			this.graphics.endFill();
									
			//text for buttons
			var format:TextFormat = new TextFormat("arial",_buttonTextSize,_buttonTextColor);
			var tf1:TextField = new TextField();
			tf1.defaultTextFormat = format;
			tf1.autoSize = TextFieldAutoSize.CENTER;
			tf1.text = "Save JPG";
			var tf2:TextField = new TextField();
			tf2.defaultTextFormat = format;
			tf2.autoSize = TextFieldAutoSize.CENTER;
			tf2.text = "Save PNG";
			var tf3:TextField = new TextField();
			tf3.defaultTextFormat = format;
			tf3.autoSize = TextFieldAutoSize.CENTER;
			tf3.text = "Cancel";

			
			//buttons
			btnSaveJPG.graphics.clear();
			btnSaveJPG.graphics.beginFill(_buttonColor,_buttonBgAlpha);
			btnSaveJPG.graphics.drawRect(0,0,_buttonWidth,_buttonHeight);
			btnSaveJPG.graphics.endFill();
			btnSaveJPG.addChild(tf1);
			tf1.x = (btnSaveJPG.width - tf1.width)/2;
			tf1.y = (btnSaveJPG.height - tf1.height)/2;
			btnSaveJPG.x = _jpgButtonPos.x;
			btnSaveJPG.y = _jpgButtonPos.y;
			btnSaveJPG.mouseChildren = false;
			this.addChild(btnSaveJPG);
			
			btnSavePNG.graphics.clear();
			btnSavePNG.graphics.beginFill(_buttonColor,_buttonBgAlpha);
			btnSavePNG.graphics.drawRect(0,0,_buttonWidth,_buttonHeight);
			btnSavePNG.graphics.endFill();
			btnSavePNG.addChild(tf2);
			tf2.x = (btnSavePNG.width - tf2.width)/2;
			tf2.y = (btnSavePNG.height - tf2.height)/2;
			btnSavePNG.x = _pngButtonPos.x;
			btnSavePNG.y = _pngButtonPos.y;
			btnSavePNG.mouseChildren = false;
			this.addChild(btnSavePNG);
			
			btnCancel.graphics.clear();
			btnCancel.graphics.beginFill(_buttonColor,_buttonBgAlpha);
			btnCancel.graphics.drawRect(0,0,_buttonWidth,_buttonHeight);
			btnCancel.graphics.endFill();
			btnCancel.addChild(tf3);
			tf3.x = (btnCancel.width - tf3.width)/2;
			tf3.y = (btnCancel.height - tf3.height)/2;
			btnCancel.x = _cancelButtonPos.x;
			btnCancel.y = _cancelButtonPos.y;
			btnCancel.mouseChildren = false;
			this.addChild(btnCancel);
			
			//jpg quality label
			var labelFormat:TextFormat = new TextFormat("arial",_labelTextSize,_buttonTextColor);
			var labelText:TextField = new TextField();
			labelText.defaultTextFormat = labelFormat;
			labelText.autoSize = TextFieldAutoSize.LEFT;
			labelText.text = "JPG Quality (0 to 100) :";
			labelText.type = TextFieldType.DYNAMIC;
			labelText.x = btnSaveJPG.x + _buttonWidth + 10;
			labelText.y = btnSaveJPG.y  + 0.5*(btnSaveJPG.height - labelText.height);
			this.addChild(labelText);
						
			//jpg quality input text field
			var inputTextFormat:TextFormat = new TextFormat("arial",_buttonTextSize,_buttonTextColor);
			txtJPGQuality = new TextField();
			txtJPGQuality.defaultTextFormat = inputTextFormat;
			txtJPGQuality.background = true;
			txtJPGQuality.backgroundColor = _inputTextBgColor;
			txtJPGQuality.autoSize = TextFieldAutoSize.CENTER;
			txtJPGQuality.text = "100";
			txtJPGQuality.type = TextFieldType.INPUT;
			txtJPGQuality.restrict = "0123456789";
			txtJPGQuality.x = labelText.x + labelText.width + 5;
			txtJPGQuality.y = btnSaveJPG.y + 0.5*(btnSaveJPG.height - txtJPGQuality.height);
			this.addChild(txtJPGQuality);
			
		}
		
		public function set jpegQuality(n:Number):void {
			_jpegQuality = n;
			txtJPGQuality.text = n.toString();
		}
		
		private function btnExportPNGHandler(evt:MouseEvent):void {
			exportPNG("image.png");
			dispatchEvent(new Event(BitmapSaver.BUTTON_CLICKED));
		}
		
		private function btnExportJPGHandler(evt:MouseEvent):void {
			exportJPG("image.jpg");
			dispatchEvent(new Event(BitmapSaver.BUTTON_CLICKED));
		}
		
		private function btnCancelHandler(evt:MouseEvent):void {
			dispatchEvent(new Event(BitmapSaver.BUTTON_CLICKED));
		}
		
		private function exportJPG(defaultFileName:String = null):void {
			var _jpegQuality:Number;
			var _encoder:JPGEncoder;
			var _fileRef:FileReference;
			
			_jpegQuality = Number(txtJPGQuality.text);
			if ((_jpegQuality < 0) || (_jpegQuality > 100)) {
				_jpegQuality = 100;
				txtJPGQuality.text = "100";
			}
			_encoder = new JPGEncoder(_jpegQuality);
			_fileRef = new FileReference();
		
			var ba:ByteArray = _encoder.encode(bitmapDataToSave);
			_fileRef.save(ba, defaultFileName);
			ba.clear();
		}
		
		private function exportPNG(defaultFileName:String = null):void {
			var _encoder:PNGEncoder;
			var _fileRef:FileReference;
		
			//_encoder = new PNGEncoder();
			_fileRef = new FileReference();
		
			var ba:ByteArray = PNGEncoder.encode(bitmapDataToSave);
			_fileRef.save(ba, defaultFileName);
			ba.clear();
		}
	}

}

