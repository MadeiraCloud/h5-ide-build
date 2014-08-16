/*
#**********************************************************
#* Filename: UI.tour
#* Creator: Song
#* Description: UI.tour
#* Date: 20140415
# **********************************************************
# (c) Copyright 2014 Madeiracloud  All Rights Reserved
# **********************************************************
*/

define(["jquery"],function(e){e.fn.showTour=function(t){$target=e(this),$tourBox=e('<div class="user-tour">				<span class="user-tour-title">This is title</span>				<div class="user-tour-pointer"></div>				<div class="user-tour-pointer animation"></div>			</div>').appendTo("body"),$tourPointer=$tourBox.children(".user-tour-pointer");var n={},r={};targetOffset=$target.offset(),targetWidth=$target.innerWidth(),targetHeight=$target.innerHeight(),tourWidth=$tourBox.width(),tourHeight=$tourBox.height(),targetOffset.left+targetWidth+tourWidth-document.documentElement.scrollLeft>window.innerWidth?(n.left=targetOffset.left-tourWidth-15,r["margin-left"]=tourWidth+5):(n.left=targetOffset.left+targetWidth+15,r["margin-left"]=-15),n.top=targetOffset.top-(tourHeight-targetHeight)/2,r["margin-top"]=tourHeight/2-5,$tourPointer.css(r),$tourBox.css(n).show()}});