/*
* Ali Abbas | ali@alouche.net | http://alouche.net
* GPL v.3 License - 2010 - 2011
* http://alouche.net/pwgen
*/

var pwgen = 
{
  strBun : Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService).createBundle("chrome://pwgen/locale/pwgen.properties"),
  prefsMetaList : [
		{name:"firstNumber",type:"bool",value:true},
		{name:"lastNumber",type:"bool",value:true},
		{name:"firstLower",type:"bool",value:true},
		{name:"lastLower",type:"bool",value:true},
		{name:"firstUpper",type:"bool",value:true},
		{name:"lastUpper",type:"bool",value:true},
		{name:"firstOther",type:"bool",value:true}, 
		{name:"lastOther",type:"bool",value:true},
		{name:"copycli", type:"bool",value:true},
		{name:"display",type:"bool",value:true},
		{name:"masterpass",type:"bool",value:false},
		{name:"passhistory",type:"bool",value:false},
		{name:"length",type:"string",value:"8"},
		{name:"specialchar",type:"string",value:"!#"},
		{name:"excludechar",type:"string",value:"0"},],
  prefs             : null,
  prefsList         :{},
  timerDisplay      : "",
  timerIcon         : "",
  statusIcon        : "",
  charSet           : "",
  showPassStatusBar : "",
  passHistVar       : "",

  randomGenerator: function()
  {
     if (window.crypto && typeof window.crypto.getRandomValues === "function") {
       var buffer = new Uint32Array(1);
       window.crypto.getRandomValues(buffer);
       return buffer[0] / Math.pow(2, 32);
     } else {
       return Math.random();
     }
  },
  
  clipboardToCopy : function (generatedPass)
  {
    if (pwgen.prefsList["copycli"] == true)
    {
      const copy = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
      copy.copyString(generatedPass);
    }
    if (pwgen.prefsList["display"] == true)
    {
      pwgen.displayPass(generatedPass);
    }
  },

  displayPass : function(generatedPass)
  {
    clearTimeout(pwgen.timerDisplay);
    pwgen.showPassStatusBar = document.getElementById( 'showPassStatusBar' );
    pwgen.showPassStatusBar.setAttribute( 'hidden', 'false');
    pwgen.showPassStatusBar.setAttribute( 'value', generatedPass);
    pwgen.timerDisplay = setTimeout(function(){pwgen.hidePass();}, 10000); 
  },

  hidePass : function()
  {
    pwgen.showPassStatusBar.setAttribute( 'hidden', 'true');
    pwgen.clearIcon();
  },
  
  getPrefs : function()
  {
		try{
			pwgen.prefs = Components.classes["@mozilla.org/preferences-service;1"]
						.getService(Components.interfaces.nsIPrefService);
			pwgen.prefs = pwgen.prefs.getBranch("extensions.pwgen.");
			for( var i=0 ; i<pwgen.prefsMetaList.length; i++){
			  if (pwgen.prefsMetaList[i].type == "string"){
				  pwgen.prefsList[pwgen.prefsMetaList[i].name] = pwgen.prefs.getCharPref(pwgen.prefsMetaList[i].name);
				} else {
				  pwgen.prefsList[pwgen.prefsMetaList[i].name] = pwgen.prefs.getBoolPref(pwgen.prefsMetaList[i].name);
				}
			}		
		}
		catch(e){
			alert(e+"\n"+e.stack);
		}
  },

  getRandomChar : function (number, lower, upper, other, numberChars, lowerChars, upperChars, otherChars) 
  {
    pwgen.charSet = "";
    if (number == true)
      pwgen.charSet += numberChars;
    if (lower == true)
      pwgen.charSet += lowerChars;
    if (upper == true )
      pwgen.charSet += upperChars;
    if (other == true)
    {
      pwgen.charSet += otherChars;
    }
    return pwgen.charSet.charAt(Math.floor(pwgen.randomGenerator() * pwgen.charSet.length));
  },

  getLocalMsg : function (msg)
  {
    return pwgen.strBun.GetStringFromName(msg);
  },

  getPassword : function (evt) {
    if(evt.button == 2) {
      return false;
    }
    
    clearTimeout(pwgen.timerIcon);
    pwgen.getPrefs();
    
    if (pwgen.prefsList["masterpass"] == false) {

      var numberChars = "0123456789";
      var lowerChars = "abcdefghijklmnopqrstuvwxyz";
      var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var otherChars = pwgen.prefsList["specialchar"];

      if (pwgen.prefsList["excludechar"] != "") {
        var excludeChars = new Array();
        excludeChars = pwgen.prefsList["excludechar"].split('');
        for (var i=0;i<excludeChars.length;i++) {
          if (isNaN(excludeChars[i])) {
            if (excludeChars[i] == excludeChars[i].toLowerCase()) {
              lowerChars = lowerChars.replace(excludeChars[i],'');
            }
            else {
              upperChars = upperChars.replace(excludeChars[i],'');
            } 
          } else {
            numberChars = numberChars.replace(excludeChars[i],'');
          }
        }
      }

    var rc = "";
      
    if (pwgen.prefsList["length"] > 0) 
      rc = rc + pwgen.getRandomChar(pwgen.prefsList["firstNumber"], pwgen.prefsList["firstLower"], pwgen.prefsList["firstUpper"], pwgen.prefsList["firstOther"], numberChars, lowerChars, upperChars, otherChars);

    for (var idx = 1; idx < pwgen.prefsList["length"]; ++idx) {
      rc = rc + pwgen.getRandomChar(pwgen.prefsList["lastNumber"], pwgen.prefsList["lastLower"], pwgen.prefsList["lastUpper"], pwgen.prefsList["lastOther"], numberChars, lowerChars, upperChars, otherChars);  
    }
    if ( rc != "" ) {
      document.getElementById('pwgen-button').style.listStyleImage = "url('chrome://pwgen/skin/pwgen-exec.png')";
      pwgen.clipboardToCopy(rc);
      if (pwgen.prefsList["passhistory"] == true)
        pwgen.passHistVar = rc + "\n" + pwgen.passHistVar;
      pwgen.timerIcon = setTimeout(function(){pwgen.clearIcon();}, 4000);
    } 
    else {
      var cannotGenerateMsg = pwgen.getLocalMsg('cannotGenerateMsg');
      pwgen.displayPass(cannotGenerateMsg);
    }
  } 
      else {
      pwgen.showMPM();  
    }
  },

  clearIcon : function()
  {
      document.getElementById('pwgen-button').style.listStyleImage = "url('chrome://pwgen/skin/pwgen.png')";
  },

  showOptions: function()
  {
    var win = Components.classes["@mozilla.org/appshell/window-mediator;1"]
        .getService(Components.interfaces.nsIWindowMediator)
        .getMostRecentWindow("pwgen:Options");
    if (win)
      win.focus();
    else
      openDialog("chrome://pwgen/content/options.xul", "", "centerscreen,chrome,titlebar,toolbar");
  },

  showMPM : function()
  {
    var win = Components.classes["@mozilla.org/appshell/window-mediator;1"]
      .getService(Components.interfaces.nsIWindowMediator)
      .getMostRecentWindow("pwgen:MPM");
    if(win)
      win.focus();
    else
       openDialog("chrome://pwgen/content/mpm.xul", "", "centerscreen,chrome,titlebar,toolbar");
  },
  
  help : function()
  {
    var new_tab = gBrowser.addTab("http://alouche.net/pwgen#howto");
    gBrowser.selectedTab = new_tab;
  },
  
  getPasswordHistory: function(action)
  {
    var win = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                      .getService(Components.interfaces.nsIWindowMediator)
                      .getMostRecentWindow("pwgen:history");
    if (action == "clear") {
      pwgen.passHistVar = "";
      if(win) {
        win.close();
      }
    } else {
      if(win)
        win.focus();
      else
        openDialog("chrome://pwgen/content/passwordHistory.xul", "", "centerscreen,chrome,titlebar,toolbar",pwgen.passHistVar);
    }
  },

  initializeToolBar: function()
  {
    // I could call pwgen.getPrefs() but it is a bit unecessary
    var prefs = Components.classes["@mozilla.org/preferences-service;1"]
		.getService(Components.interfaces.nsIPrefService).getBranch("extensions.pwgen.");
	  var isToolBarButtonSet = prefs.getBoolPref("toolbar-button-set", false);
    if (!isToolBarButtonSet) {
      try {
        var toolbarID    = "pwgen-button";
		    var toolbarMain  = document.getElementById("nav-bar");
		    var set  = toolbarMain.currentSet.split(",");
        if (set.indexOf(toolbarID) == -1) {
          set.push(toolbarID);
			    toolbarMain.setAttribute("currentset", set.join(","));
			    toolbarMain.currentSet = set.join(",");
			    document.persist(toolbarMain.id, "currentset");
          try { BrowserToolboxCustomizeDone(true); }
			    catch (e) {}
        }
        prefs.setBoolPref("toolbar-button-set", true);
	    }
	    catch(e) {}
    }
  }
};

window.addEventListener("load", pwgen.initializeToolBar, false); 
