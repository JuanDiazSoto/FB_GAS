# SCRIPT-GAS

## Leer datos de un spreadsheet desde un google script

```javascript
const c_id_libro = ''; //modificar por su id de libro 
const c_hoja_lectura = ''; // modificar por su nombre de hoja 

const libro = SpreadsheetApp.openById(c_id_libro );   
const hoja = libro.getSheetByName(c_hoja_lectura );   
const datos = hoja.getDataRange().getValues();   

Logger.log(datos);  
```

## Leer datos de un spreadsheet desde un google script con filtro
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

### 1.- primera forma 
```javascript
  const URL_STRING = "MI_API_URL";  
  const response = UrlFetchApp.fetch(URL_STRING);  
  const json = response.getContentText();  
  const data = JSON.parse(json);  
    
  Logger.log(data)  
``` 
### 2.- segunda forma

```javascript
 const url = 'MI_API_URL';
 const  options = {  'headers': {   
                                  'Content-Type': 'application/json'
                                 }  
                  };  

  const  response = UrlFetchApp.fetch(url, options)
  Logger.log(response)
  
  ```
### 3.- tercera forma

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

## Envio de Correos
### 1.- envio de correo simple
  
```javascript

  const mail = 'tu_correo';
  const asunto = 'esta es un prueba';
  const mensaje = 'hola Usuario: \n este es un mensaje de prueba. \n  Atte. tu Boot'; 
  GmailApp.sendEmail(mail, asunto, mensaje);
  
 ``` 
 ### 1.- envio de correo con HTML
 
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
