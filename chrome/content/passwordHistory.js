/*
* Ali Abbas | alouche07@gmail.com | http://alouche.net
* GPL v.3 License - 2010 
* http://alouche.net/pwgen
*/

var pwgenPasswordHistory = {

  passwordHistory : window.arguments[0],
  
  init : function() {
    var passHistTextArea = document.getElementById ( 'passHistTextArea' );
    passHistTextArea.setAttribute( 'value', pwgenPasswordHistory.passwordHistory);
  }

};
