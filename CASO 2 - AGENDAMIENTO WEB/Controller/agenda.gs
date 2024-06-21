
/* 
saveData -> funcion que permite registrar datos en el spreadsheet
         -> recibe como parametro todos los valores declarados en el formulario html
*/

const saveData = (form) => {
  
  debugger;
  const list = form.fecha.split("-");

  const anio  = list[0];
  const mes   = list[1] - 1;
  const dia   = list[2];


  const fecha1 = new Date(anio, mes, dia);
  const fecha2 = Utilities.formatDate(fecha1, "GMT", "dd-MM-yyyy");

  const flag = validarCupo(fecha1, form.hora);

  if(flag == false){
   throw new Error("Su hora ya no esta disponible");
   
  }

  const id = ss_data.getLastRow() + 1;

  try{
    ss_data.appendRow([id, form.nombre, form.email, form.servicio, fecha2, form.hora, 1]);
    const msn = `Tu hora ha sido agendada con exito para el día ${form.fecha}, a la hora  ${form.hora}`;
    //enviarMail1(form.email, msn );
    enviarMail2(form.email,form.nombre, form.fecha, form.hora, 'google.com', 'facebook.com' )
    return msn; 
    
    }catch(e){
    return e;
  }
}

/*
validarCupo -> funcion que permite validar si la hora selecciona para el día seleccionado es valida aun.
            -> recibe como parametros fecha y hora.
*/
const validarCupo = (fecha, hora) => {

  const data = ss_data.getDataRange().getValues().filter(x => x[4].toString() == fecha 
                                                           && x[5].toString() == hora 
                                                           && x[6] != 3);

  if(data.length != 0){
    return false;
  }
  return true;

}

/*
getHoras -> funcion que obtiene las horas disponibles para ser mostradas en el campo select del html
         -> recibe como parametro una fecha.
*/
const getHoras = (p_fecha) =>{


  const list = p_fecha.split("-");

  const anio  = list[0];
  const mes   = list[1] - 1;
  const dia   = list[2];

  const fecha = new Date(anio, mes, dia);

  const dia_semana = fecha.getDay();

  const horario = getHorario(dia_semana);

  const dataRegistrada = ss_data.getDataRange().getValues().filter(x=> x[4].toString() == fecha.toString() && x[6] != 3);

  let horas = dataRegistrada.map(x => x[5]);
  let horasDisponibles = horario.filter(hora => !horas.includes(hora));

  return horasDisponibles;

}

/*
getHorario -> funcion que permite obtener el horario segun el día de la semana.
           -> recibe como parametro el día de la semana 
*/


const getHorario = (dia_semana) =>{

  if(dia_semana === 6 || dia_semana === 0){
    return config.horas_fin_semana;
  }else{
    return config.horas_semana;
  }

}
