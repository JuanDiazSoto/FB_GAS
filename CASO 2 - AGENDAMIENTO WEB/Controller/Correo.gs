//envio de email, texto plano

const enviarMail1 = (correo, mensaje) => {

  try {
    Logger.log("se esta enviando un correo")
    GmailApp.sendEmail(correo, config.asunto, mensaje);
  }
  catch (e) {
    Logger.log(`ha ocurrido un Error : ${e}`);
  }

}

//envio de mail con templete html.
const enviarMail2 = (correo, nombre, fecha, hora, link_anular, link_confirmar) => {

  const htmlTemplate = HtmlService.createTemplateFromFile("Controller/templete");
  htmlTemplate.nombre = nombre;
  htmlTemplate.fecha = fecha;
  htmlTemplate.hora = hora;
  htmlTemplate.urlsuccess = link_confirmar;
  htmlTemplate.urlcancel = link_anular;

    try {
      const emailBody = htmlTemplate.evaluate();

      MailApp.sendEmail({
        to: correo,
        subject: config.asunto,
        htmlBody: emailBody.getContent(),
      })

    } catch (e) {
      Logger.log("error " + e)
    }
 
}
