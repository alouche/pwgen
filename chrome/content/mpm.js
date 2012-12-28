/*
* Reused by Ali Abbas | alouche07@gmail.com
* GPL v.3 License - 2010 
* Based on the MD5 Javascript code of Paul Johnston
* See http://pajhome.org.uk/crypt/md5
*
*/


var pwgenMPM = 
{
	genPass: "",
	usernameField : "",
	siteField : "",
	masterPasswordField : "",
	resultField : "",

	init : function()
	{
    pwgenMPM.siteField = document.getElementById( 'siteField' );
    pwgenMPM.masterPasswordField = document.getElementById ( 'masterPasswordField' );
    pwgenMPM.resultField = document.getElementById ( 'resultField' );
		pwgenMPM.usernameField = document.getElementById ( 'usernameField' );
		var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator);
  	var recentWindow = wm.getMostRecentWindow("navigator:browser");
    var url = recentWindow ? recentWindow.content.document.location : null;
		url = url.toString();
		var urlBreak = url.split('/');
		pwgenMPM.siteField.setAttribute( 'value', urlBreak['2']);
	},

	liveGenMPM : function ()
	{
		pwgenMPM.genPass = "";
		if (pwgenMPM.masterPasswordField.value != "" &&  pwgenMPM.siteField.value != "")
		{
		  pwgenMPM.genPass = pwgenMPM.hex_md5(pwgenMPM.masterPasswordField.value + ':' + pwgenMPM.usernameField.value + ':' + pwgenMPM.siteField.value).substr(0,8);
		}
      pwgenMPM.resultField.setAttribute( 'value', pwgenMPM.genPass);
	},

	copyClip : function ()
	{
		const copy = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
    copy.copyString(pwgenMPM.genPass);
	},

	hex_md5 : function (s)
	{
		return pwgenMPM.binl2hex(pwgenMPM.core_md5(pwgenMPM.str2binl(s), s.length * 8));
	},

	core_md5 : function (x, len)
	{
		x[len >> 5] |= 0x80 << ((len) % 32);
        	x[(((len + 64) >>> 9) << 4) + 14] = len;

		var a =  1732584193;
        	var b = -271733879;
        	var c = -1732584194;
		var d =  271733878;

    for(var i = 0; i < x.length; i += 16)
	  {
	        	var olda = a;
		        var oldb = b;
			var c = -1732584194;
			var d =  271733878;

			for(var i = 0; i < x.length; i += 16)
			{
				var olda = a;
				var oldb = b;
				var oldc = c;
				var oldd = d;
			
				a = pwgenMPM.md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
				d = pwgenMPM.md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
				c = pwgenMPM.md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
				b = pwgenMPM.md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
				a = pwgenMPM.md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
				d = pwgenMPM.md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
				c = pwgenMPM.md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
				b = pwgenMPM.md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
				a = pwgenMPM.md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
				d = pwgenMPM.md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
				c = pwgenMPM.md5_ff(c, d, a, b, x[i+10], 17, -42063);
				b = pwgenMPM.md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
				a = pwgenMPM.md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
				d = pwgenMPM.md5_ff(d, a, b, c, x[i+13], 12, -40341101);
				c = pwgenMPM.md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
				b = pwgenMPM.md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
			
				a = pwgenMPM.md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
				d = pwgenMPM.md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
				c = pwgenMPM.md5_gg(c, d, a, b, x[i+11], 14,  643717713);
				b = pwgenMPM.md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
				a = pwgenMPM.md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
				d = pwgenMPM.md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
				c = pwgenMPM.md5_gg(c, d, a, b, x[i+15], 14, -660478335);
				b = pwgenMPM.md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
				a = pwgenMPM.md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
				d = pwgenMPM.md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
				c = pwgenMPM.md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
				b = pwgenMPM.md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
				a = pwgenMPM.md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
				d = pwgenMPM.md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
				c = pwgenMPM.md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
				b = pwgenMPM.md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
			
				a = pwgenMPM.md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
				d = pwgenMPM.md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
				c = pwgenMPM.md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
				b = pwgenMPM.md5_hh(b, c, d, a, x[i+14], 23, -35309556);
				a = pwgenMPM.md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
				d = pwgenMPM.md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
				c = pwgenMPM.md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
				b = pwgenMPM.md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
				a = pwgenMPM.md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
				d = pwgenMPM.md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
				c = pwgenMPM.md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
				b = pwgenMPM.md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
				a = pwgenMPM.md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
				d = pwgenMPM.md5_hh(d, a, b, c, x[i+12], 11, -421815835);
				c = pwgenMPM.md5_hh(c, d, a, b, x[i+15], 16,  530742520);
				b = pwgenMPM.md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
			
				a = pwgenMPM.md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
				d = pwgenMPM.md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
				c = pwgenMPM.md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
				b = pwgenMPM.md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
				a = pwgenMPM.md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
				d = pwgenMPM.md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
				c = pwgenMPM.md5_ii(c, d, a, b, x[i+10], 15, -1051523);
				b = pwgenMPM.md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
				a = pwgenMPM.md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
				d = pwgenMPM.md5_ii(d, a, b, c, x[i+15], 10, -30611744);
				c = pwgenMPM.md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
				b = pwgenMPM.md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
				a = pwgenMPM.md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
				d = pwgenMPM.md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
				c = pwgenMPM.md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
				b = pwgenMPM.md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
		
				a = pwgenMPM.safe_add(a, olda);
				b = pwgenMPM.safe_add(b, oldb);
				c = pwgenMPM.safe_add(c, oldc);
				d = pwgenMPM.safe_add(d, oldd);
			}
			return Array(a, b, c, d);		
		}
	},

	md5_cmn : function (q, a, b, x, s, t)
	{
		return pwgenMPM.safe_add(pwgenMPM.bit_rol(pwgenMPM.safe_add(pwgenMPM.safe_add(a, q), pwgenMPM.safe_add(x, t)), s),b);
	},
	
	md5_ff : function (a, b, c, d, x, s, t)
	{
		return pwgenMPM.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	},

	md5_gg : function (a, b, c, d, x, s, t)
	{
		return pwgenMPM.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	},
	
	md5_hh : function (a, b, c, d, x, s, t)
	{
		return pwgenMPM.md5_cmn(b ^ c ^ d, a, b, x, s, t);
	},
	
	md5_ii : function (a, b, c, d, x, s, t)
	{
		return pwgenMPM.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	},
			
	safe_add : function (x, y)
	{
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	},
			
	bit_rol : function (num, cnt)
	{
		return (num << cnt) | (num >>> (32 - cnt));
	},
			
	str2binl : function (str)
	{
		var bin = Array();
		var mask = (1 << 8) - 1;
		for(var i = 0; i < str.length * 8; i += 8)
			bin[i>>5] |= (str.charCodeAt(i / 8) & mask) << (i%32);
		return bin;
	},
			
	binl2hex : function (binarray)
	{
		var hex_tab = 0 ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for(var i = 0; i < binarray.length * 4; i++)
		{
			str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
			hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
		}
		return str;
	}

}

window.addEventListener("load", function(e) { pwgenMPM.init(); }, false);
