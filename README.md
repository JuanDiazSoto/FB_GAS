# SCRIPT-GAS

## Leer datos de un spreadsheet desde un google script

const c_id_libro = ''; //modificar por su id de libro 
const c_hoja_lectura = ''; // modificar por su nombre de hoja 

const libro = SpreadsheetApp.openById(c_id_libro );   
const hoja = libro.getSheetByName(c_hoja_lectura );   
const datos = hoja.getDataRange().getValues();   

Logger.log(datos)  

## Leer datos de un spreadsheet desde un google script con filtro

const c_id_libro = ''; //modificar por su id de libro   
const c_hoja_lectura = ''; // modificar por su nombre de hoja   
const c_filtro = 'X';  
  
const libro = SpreadsheetApp.openById(c_id_libro );   
const hoja = libro.getSheetByName(c_hoja_lectura );   
//vamos a suponer que en la columna A, hay filas o registros con una 'X'  
const datos = hoja.getDataRange().getValues().filter( x => x[0] == c_filtro)   
  
Logger.log(datos)  

  
## Obtener cantidad de registros que tiene una hoja

const c_id_libro = ''; //modificar por su id de libro   
const c_hoja_lectura = ''; // modificar por su nombre de hoja   
  
const libro = SpreadsheetApp.openById(c_id_libro);  
const hoja = libro.getSheetByName(c_hoja_lectura);  
const id = hoja.getLastRow();  
  
Logger.log(id);  

## Como CONSUMIR API´S
## pueden crear una api en https://www.mockable.io/a/ para pruebas.  

### 1.- primera forma 

  const URL_STRING = "MI_API_URL";  
  const response = UrlFetchApp.fetch(URL_STRING);  
  const json = response.getContentText();  
  const data = JSON.parse(json);  
    
  Logger.log(data)  
  
### 2.- segunda forma

 const url = 'MI_API_URL';


 const  options = {  
    'headers': {   
      'Content-Type': 'application/json'
    }  
  };  

  const  response = UrlFetchApp.fetch(url, options)
  Logger.log(response)

  
