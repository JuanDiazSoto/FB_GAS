/*============================================================
ABRIR WEB  
==============================================================*/
function doGet() {

  var html = HtmlService.createTemplateFromFile("index");
  return html.evaluate().setTitle("mi_titulo")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag("viewport", "width=device-width, initial-scale=1");

}

/*============================================================
INCLUIR CONTENIDO
==============================================================*/
function incluirArchivo(pagina) {

  var html = HtmlService.createTemplateFromFile(pagina);
  return html.evaluate().getContent();

}
