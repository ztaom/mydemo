﻿/*

By Dan Gries
www.flashandmath.com
dan@flashandmath.com

*/

package com.flashandmath.dg.GUI {
	
	import flash.display.Sprite;
	import flash.geom.Matrix;
	
	public class GradientSwatch extends Sprite {
		
		private var _color1:uint;
		private var _color2:uint;
		private var _red1:Number;
		private var _green1:Number;
		private var _blue1:Number;
		private var _red2:Number;
		private var _green2:Number;
		private var _blue2:Number;
		
		public var swatchWidth:Number;
		public var swatchHeight:Number;
		public var displayedColor:uint;
		
		public function GradientSwatch(swatchColor1, swatchColor2, w=16,h=16) {
			_color1 = swatchColor1;
			_color2 = swatchColor2;
			_red1 = (_color1 >> 16);
			_green1 = (_color1 >> 8) & 0xFF;
			_blue1 = _color1 & 0xFF;
			_red2 = (_color2 >> 16);
			_green2 = (_color2 >> 8) & 0xFF;
			_blue2 = _color2 & 0xFF;
			
			displayedColor = _color2; //change later
			
			swatchWidth = w;
			swatchHeight = h;
			drawSwatch();
			
			this.buttonMode = true;
			
		}
		
		public function set color1(c:uint):void {
			_color1 = c;
			_red1 = (_color1 >> 16);
			_green1 = (_color1 >> 8) & 0xFF;
			_blue1 = _color1 & 0xFF;
		}
		
		public function set color2(c:uint):void {
			_color2 = c;
			_red2 = (_color2 >> 16);
			_green2 = (_color2 >> 8) & 0xFF;
			_blue2 = _color2 & 0xFF;
		}
		
		public function get red1():Number {
			return _red1;
		}
		public function get green1():Number {
			return _green1;
		}
		public function get blue1():Number {
			return _blue1;
		}
		public function get red2():Number {
			return _red2;
		}
		public function get green2():Number {
			return _green2;
		}
		public function get blue2():Number {
			return _blue2;
		}
		
		
		public function drawSwatch():void {
			var gradMat:Matrix = new Matrix();
			gradMat.createGradientBox(swatchWidth,swatchHeight,-Math.PI/2,0,-swatchHeight/2);
			this.graphics.clear();
			this.graphics.beginGradientFill("linear",[_color1, _color2], [1,1], [1,255], gradMat);
			this.graphics.drawRect(0,-swatchHeight/2,swatchWidth,swatchHeight);
			this.graphics.endFill();
			
		}
	
	}
	
}
