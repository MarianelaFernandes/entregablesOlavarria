const formulario = document.getElementById("formulario");
const btnEnviar = document.getElementById("enviar");
let informacion = {};
btnEnviar.addEventListener("click", (e) => {
  e.preventDefault();    // Obtención de valores de los campos del formulario
  informacion.nombre = document.getElementById("nombre").value;
  informacion.apellido = document.getElementById("apellido").value;
  informacion.nacimiento = document.getElementById("nacimiento").value;
  informacion.dni = document.getElementById("dni").value;
  informacion.telefono = document.getElementById("telefono").value;
  informacion.domicilio = document.getElementById("domicilio").value;
  informacion.mail = document.getElementById("mail").value;
  informacion.consulta = document.getElementById("consulta").value;  //Verificar si los campos obligatorios están completos
  if (!informacion.nombre || !informacion.apellido || !informacion.nacimiento || 
    !informacion.dni || !informacion.telefono || !informacion.domicilio ||
     !informacion.mail || !informacion.consulta) {
    alert("POR FAVOR. ¡COMPLETE TODOS LOS DATOS PARA PODER CONTINUAR!");
    return;
  }
  const emailRegex = /@/;            // VALIDAMOS EL FORMATO CON @ 
  if (!emailRegex.test (mail.value)) {  //Regex: abreviatura de "regular expresion". se utiliza para validar un formato de texto.
    alert ("INGRESE UN CORREO ELECTRONICO VALIDO");
    return;
  }
  alert ("¡SUS DATOS HAN SIDO CARGADOS!");
  console.log(`Su nombre es ${informacion.nombre} ${informacion.apellido}, Fecha de Nacimiento ${informacion.nacimiento} DNI: ${informacion.dni} Teléfono: ${informacion.telefono} Domiciliado en: ${informacion.domicilio} Su correo electronico: ${informacion.mail} Su consulta es: ${informacion.consulta}`);
  let archivo = new Blob([JSON.stringify(informacion)], {type: "text/plain;charset=utf=8"}); //json.stringify: metodo que convierte un valor de js en cadena de texto
  saveAs(archivo, "contact.txt"); //saveAs: significa "guardar como". Aplicado al objeto blob.
                                  //Blob: tipo de fichero de datos planos (que no se encuentran detallados en js)
   alert ("¡GRACIAS POR SU COMPRA!");
   return;
});








