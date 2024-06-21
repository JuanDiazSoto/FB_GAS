const config = {
  "st" : {
    "id" : "1NeoR9pO2pUk5FS8o66x_ljtqrV8uxeiCQX2IpEz67-k",
    "hoja" : "DATA"
  },
  "status": {
    "1" : "sin confirmar",
    "2" : "confirmado",
    "3" : "anulado"
  },
  "horas_semana"      : ["11:00 a 12:00", "12:00 a 13:00", "13:00 a 14:00", "16:00 a 17:00", "17:00 a 18:00", "18:00 a 19:00"],
  "horas_fin_semana"  : ["16:00 a 17:00", "17:00 a 18:00", "18:00 a 19:00"],
  "asunto" : "Reserva de Hora en Portal de Agendamiento - Spreadsheet en Español"
}



const ss = SpreadsheetApp.openById(config.st.id);
const ss_data = ss.getSheetByName(config.st.hoja);


/*============================================================
ABRIR WEB  
==============================================================*/
function doGet() {

  var html = HtmlService.createTemplateFromFile("index");
  return html.evaluate().setTitle("Agendamiento WEB")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag("viewport", "width=device-width, initial-scale=1");

}

/*============================================================
INCLUIR CONTENIDO
==============================================================*/ 
function include(pagina) {

  var html = HtmlService.createTemplateFromFile(pagina);
  return html.evaluate().getContent();

}
