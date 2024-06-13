const cc_libro = {
  "form": "FORMULARIO",
  "cell": "C3",
  "datos": "DATA",
  "ss": SpreadsheetApp.getActiveSpreadsheet(),
  "cellForm": ["C3", "C5", "C7", "C9", "C11", "C13", "C15"]

}

const page_form = cc_libro.ss.getSheetByName(cc_libro.form);
const page_data = cc_libro.ss.getSheetByName(cc_libro.datos);


const mensajes = {
  "cls": SpreadsheetApp.getUi(),
  "msn1": "datos no encontrados",
  "msn2": "datos actualizados correctamente",
  "msn3": "error: ",
  "msn4": "el sistema asigna id automaticamente",
  "msn5" : "datos insertados correctamente"

}


const getData = () => {

  const valueCell = page_form.getRange(cc_libro.cell).getValue();
  const data = page_data.getDataRange().getValues().filter(x => x[0] == valueCell);

  if (data.length == 0) {
    mensajes.cls.alert(mensajes.msn1);
  }
  else {
    setData(data);
  }

}

const setData = (data) => {

  const dat = data[0];
  let i = 0;
  cc_libro.cellForm.forEach(item => {
    page_form.getRange(item).setValue(dat[i])
    i++;
  })


}
const saveData = () => {

  const valueCell = page_form.getRange(cc_libro.cell).getValue();

  if (valueCell != "") {
    mensajes.cls.alert(mensajes.msn4);
    return;
  }

  const lista = [];

  cc_libro.cellForm.forEach(item => {
    lista.push(page_form.getRange(item).getValue());
  })

  try {
    const index = page_data.getLastRow() + 1;

    lista.unshift(index);
    lista.splice(1, 1)
    page_data.appendRow(lista);
  } catch (e) {
    mensajes.cls.alert(`${mensajes.msn3} ${e}`);
    return;
  }

  mensajes.cls.alert(mensajes.msn5);
  clearData();

}

const clearData = () => {

  cc_libro.cellForm.forEach(item => {
    page_form.getRange(item).clearContent();
  })

}

const updateData = () => {

  const lista = [];

  cc_libro.cellForm.forEach(item => {
    lista.push(page_form.getRange(item).getValue());
  })

  try {
    page_data.getRange(lista[0], 1, 1, page_data.getLastColumn()).setValues([lista])
  } catch (e) {
    mensajes.cls.alert(`${mensajes.msn3} ${e}`);
    return;
  }

  mensajes.cls.alert(mensajes.msn2);

  clearData();

}
