/*
* Ali Abbas | alouche07@gmail.com | http://alouche.net
* GPL v.3 License - 2010 
* http://pwgen.alouche.net
*/

var pwgenPasswordHistory = {

  passwordHistory : window.arguments[0],
  
  init : function() {
    var passHistTextArea = document.getElementById ( 'passHistTextArea' );
    passHistTextArea.setAttribute( 'value', pwgenPasswordHistory.passwordHistory);
  }

};
