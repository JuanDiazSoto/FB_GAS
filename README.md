# SCRIPT-GAS 

## Leer datos de un Spreadsheet desde un Google script

```javascript
const c_id_libro = ''; //modificar por su id de libro 
const c_hoja_lectura = ''; // modificar por su nombre de hoja 

const libro = SpreadsheetApp.openById(c_id_libro );   
const hoja = libro.getSheetByName(c_hoja_lectura );   
const datos = hoja.getDataRange().getValues();   

Logger.log(datos);  
```

## Leer datos de un Spreadsheet desde un Google script con filtro
```javascript
const c_id_libro = ''; //modificar por su id de libro   
const c_hoja_lectura = ''; // modificar por su nombre de hoja   
const c_filtro = 'X';  
  
const libro = SpreadsheetApp.openById(c_id_libro );   
const hoja = libro.getSheetByName(c_hoja_lectura );   
//vamos a suponer que en la columna A, hay filas o registros con una 'X'  
const datos = hoja.getDataRange().getValues().filter( x => x[0] == c_filtro)   
  
Logger.log(datos)  
```

  ## Obtener cantidad de registros que tiene una hoja
```javascript
const c_id_libro = ''; //modificar por su id de libro   
const c_hoja_lectura = ''; // modificar por su nombre de hoja   
  
const libro = SpreadsheetApp.openById(c_id_libro);  
const hoja = libro.getSheetByName(c_hoja_lectura);  
const id = hoja.getLastRow();  
  
Logger.log(id);  
```
## Como CONSUMIR API´S
## pueden crear una api en https://www.mockable.io/a/ para pruebas.  

### 1.- Primera forma 
```javascript
  const URL_STRING = "MI_API_URL";  
  const response = UrlFetchApp.fetch(URL_STRING);  
  const json = response.getContentText();  
  const data = JSON.parse(json);  
    
  Logger.log(data)  
``` 
### 2.- Segunda forma

```javascript
 const url = 'MI_API_URL';
 const  options = {  'headers': {   
                                  'Content-Type': 'application/json'
                                 }  
                  };  

  const  response = UrlFetchApp.fetch(url, options)
  Logger.log(response)
  
  ```
### 3.- Tercera forma

```javascript
    
    const url = "MI_API_URL";
    const datos = {
      "item1": 'id',
      "tabla": 'tabla_interna'
    };
    const options = {
      "method": "POST",
      "contentType": "application/json",
      "payload": JSON.stringify(datos)
    };
    UrlFetchApp.fetch(url, options);
```
  
## Google DOCS - Modificar un Templete

```javascript
  const c_id_carpeta = 'mi_id_carpeta';
  const c_id_templete = 'mi_google_docs_templete';
  
  const carpeta = DriveApp.getFolderById(c_id_carpeta);
  const planilla = DriveApp.getFileById(c_id_planilla);

  let copia_planilla = planilla.makeCopy();
  const id_copia = copia_planilla.getId();

  let documento_copia = DocumentApp.openById(id_copia);
  let cuerpo_documento = documento_copia.getBody();

  cuerpo_documento.replaceText("{{tag1}}", paciente.id);
  cuerpo_documento.replaceText("{{tag2}}", paciente.apelli);

  documento_copia.saveAndClose();
  copia_planilla.setName('aqui puede agregar un nuevo nombre')
  copia_planilla.moveTo(carpeta);

```

## Correos

### 1.- Envió de correo simple
  
```javascript

  const mail = 'tu_correo';
  const asunto = 'esta es un prueba';
  const mensaje = 'hola Usuario: \n este es un mensaje de prueba. \n  Atte. tu Boot'; 
  GmailApp.sendEmail(mail, asunto, mensaje);
  
 ``` 
 ### 2.- Envió de correo con HTML
 
 ```javascript

  const mail = 'tu_correo';
  const asunto = 'esta es un prueba';
  const mensajeHtml = '<div style="background-color: #b119b4; padding: 20px; color: white; font-family: Arial, sans-serif;">'+ 
                      '<div style="background-color: #b119b4; padding: 20px; color: white; font-family: Arial, sans-serif;"> +
                      '<p style="font-size: 18px; margin: 0 0 20px;">Estimado Usuario: </p>' +
                      '<p style="font-size: 18px; margin: 0 0 20px;">Este es un mensaje de prueba.</p>' +
                      '<p style="font-size: 18px; margin: 0 0 20px;">Atte. tu Boot.</p>' +
                      '</div>';


  
  GmailApp.sendEmail(
          mail, 
          asunto, 
          '', 
          {
            htmlBody: message,           
          }
        );
  
 ``` 
 
 ### 3.- Adjuntar Archivo

```javascript

  const archivo = DriveApp.getFileById('ID_DEL_ARCHIVO'); // Reemplaza 'ID_DEL_ARCHIVO' con el ID real de tu archivo adjunto
  const destinatario = 'correo_destino';
  const asunto = 'Adjunto de prueba';
  const cuerpo = '¡Hola! Adjunto te envío un archivo de prueba.';
  
  // Convierte el archivo a Blob
  const blob = archivo.getBlob();
  
  // Crea el mensaje de correo
  const mensaje = {
    to: destinatario,
    subject: asunto,
    body: cuerpo,
    attachments: [blob]
  };
  
  // Envía el correo
  MailApp.sendEmail(mensaje);

```


 ### 4.- Envió con Templete 
 debe crear el siguiente archivo con el nombre : templete.html
```javascript

<!DOCTYPE html>
<html>

<head>

</head>

<body>
  <div class="container my-4">
    <hr>
    <p><strong>Este es un mensaje</strong></p>
    <table style="font-family: Arial, Helvetica, sans-serif; border-collapse: collapse; width: 100%;">
      <thead style="">
        <tr style="background-color: #f2f2f2;">
          <th style="border: 1px solid #ddd; padding: 8px; padding-top: 12px; padding-bottom: 12px; text-align: left; background-color: #000; color: white;">INDEX</th>
          
        </tr>
      </thead>
      <tbody>
        <?!= tabla_de_datos ?>
      </tbody>
    </table>

    </div_prueba>
    <p style="background-color: #faf4e0; border-color: #c2a442; padding: 10px; border-left: 6px solid; border-radius: 5px;">
      <strong style="font-weight: 600;">
        Nota:
      </strong>
      Este correo fue emitido a travez de Google Apps Script.
    </p>
  </div>
</body>

</html>
```
en el codigo.gs agregar lo siguiente
```javascript
function enviarCorreos() {
  const htmlTemplate = HtmlService.createTemplateFromFile("templete");
  htmlTemplate.tabla_de_datos = construirTabla();
  const emailBody = htmlTemplate.evaluate();

  try {

    MailApp.sendEmail({
      to: 'test@test.cl',
      subject: 'Esta es una prueba',
      htmlBody: emailBody.getContent(),
      cc: 'test2@test.cl'
    })

  } catch (e) {
    Logger.log("error " + e)
  }

}

function construirTabla() {
  const tabla = "";
  for (var i = 0; i < 9; i++) {
    tabla =
      tabla +
      "<tr style='background-color: #f2f2f2'>" +
      "<th style='padding-top: 12px; padding-bottom: 12px; text-align: left;  background-color: #f2f2f2;  color: black; border: 1px solid #ddd;'>" +
      i +
      "</th>" +
      "</tr>";
  }

  return tabla;
}
```

## Google Calendario:
### Leer eventos de calendario
deberan crear un calendario en google calendar, ademas en la parte de configuracion deberan buscar el id de este.
```javascript

  const id_calendario = 'mi_id_calendario';
  const calendario = CalendarApp.getCalendarById(id_calendario);

  let eventos = calendario.getEvents(new Date("2023-01-01"), new Date("2023-12-31")); // Obtén los eventos de este año

  eventos.forEach(function (evento) {
    var titulo = evento.getTitle();
    var fechaInicio = evento.getStartTime();
    var fechaFin = evento.getEndTime();
    var ubicacion = evento.getLocation();

    Logger.log("Título: " + titulo);
    Logger.log("Fecha de inicio: " + fechaInicio);
    Logger.log("Fecha de fin: " + fechaFin);
    Logger.log("Ubicación: " + ubicacion);
    Logger.log("-------------------");
  });

```

### Crear un evento de calendario
```javascript
 const calendarioId = 'mi_id_calendario'; // Reemplaza con el ID de tu calendario
  
 const calendario = CalendarApp.getCalendarById(calendarioId);
  
 const tituloEvento = "Título del evento";
 const fechaInicio = new Date("2023-04-30T09:00:00"); // Fecha y hora de inicio del evento
 const fechaFin = new Date("2023-04-30T10:30:00"); // Fecha y hora de fin del evento
 const ubicacion = "Ubicación del evento";
 const descripcion = "Descripción del evento";
  
 let evento = calendario.createEvent(tituloEvento, fechaInicio, fechaFin, {
    location: ubicacion,
    description: descripcion
  });
  
  Logger.log("Evento creado: " + evento.getId());
```
### Cancelar evento de calendario
```javascript
  const eventoId = 'mi_id_evento'
  const calendarioId = 'mi_id_calendario'; // Reemplaza con el ID de tu calendario
  
  const calendario = CalendarApp.getCalendarById(calendarioId);
  const evento = calendario.getEventById(eventoId);
  
  if (evento) {
    evento.deleteEvent();
    Logger.log("Evento cancelado: " + eventoId);
  } else {
    Logger.log("No se encontró el evento con el ID: " + eventoId);
  }
  ```
### Realizar Respaldo de un Documento

```javascript
const idDocumento       = "";
const idCarpetaRespaldo = "";

var fecha       = Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd");
const carpeta   = DriveApp.getFolderById(idCarpetaRespaldo);
const plantilla = DriveApp.getFileById(idDocumento);
const copiaPlan = plantilla.makeCopy("Backup - " + fecha + " - creado por script");

 copiaPlan.moveTo(carpeta);

```
