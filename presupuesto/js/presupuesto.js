class Ingreso{
   static contador_ingreso=0
   constructor(desc,valor){
      this._desc=desc
      this._valor=valor
      this._id = ++Ingreso.contador_ingreso
   }
   get desc(){
      return this._desc
   }
   set desc(desc){
      this._desc=desc
   }
   get valor(){
      return this._valor
   }
   set valor(valor){
      this._valor=valor
   }
   get id(){
      return this._id
   }
}
class Egreso{
   static contador_egreso=0
   constructor(desc,valor){
      this._desc=desc
      this._valor=valor
      this._id=++Egreso.contador_egreso
   }
   get desc(){
      return this._desc
   }
   set desc(desc){
      this._desc=desc
   }
   get valor(){
      return this._valor
   }
   set valor(valor){
      this._valor=valor
   }
   get id(){
      return this._id
   }
}

const ingresos=[]
const egresos=[]


let calcularIngresos=()=>{ 
   let totalIngresos=0
   for(let i of ingresos){
      totalIngresos+=i.valor
   }
   return parseFloat(totalIngresos)
}
let calcularEgresos=()=>{ 
   let totalEgresos=0
   for(let i of egresos){
      totalEgresos+=i.valor
   }
   return parseFloat(totalEgresos)
}

const cargarApp=()=>{
   cargarDatos()
   cargarCabecero();
   cargarIngresos();
   cargarEgresos();
}

let cargarCabecero= ()=>{
   let presupuesto= calcularIngresos()-calcularEgresos()
   let porcentaje= calcularEgresos()/calcularIngresos()
   document.getElementById("presupuesto").innerHTML=formatoMoneda(presupuesto)
   document.getElementById('porcentaje').innerHTML=`
   ${isNaN(porcentaje)||porcentaje===Infinity ? 0 : (Math.round(porcentaje * 1000)) / 10}%
   `
   document.getElementById('ingresos').innerHTML=formatoMoneda(calcularIngresos())
   document.getElementById('egresos').innerHTML=formatoMoneda(calcularEgresos())

}

const formatoMoneda=(valor)=>{
   return valor.toLocaleString('en-US',{style:"currency",currency:"DOP",minimumFractionDigits:2})
}


function cargarIngresos(){
   let ingresosHTML=''
   for(let objeto of ingresos){
      ingresosHTML+=crearIngresosHTML(objeto)
   }
   document.getElementById('lista-ingresos').innerHTML=ingresosHTML
}
function cargarEgresos(){
   let egresosHTML=''
   for(let objeto of egresos){
      egresosHTML+=crearEgresosHTML(objeto)
   }
   document.getElementById('lista-egresos').innerHTML=egresosHTML
}

const crearIngresosHTML=(ingreso)=>{
   let ingresoHTML=`
   <div class="elemento limpiarEstilos">
      <div class="elemento_descripcion">${ingreso.desc}</div>
      <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
               <button class="elemento_eliminar--btn">
                  <ion-icon name="close-circle-outline"
                  onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
               </button>
            </div>
      </div>
   </div>
   `
   return ingresoHTML
}

const crearEgresosHTML=(egreso)=>{
   let egresoHTML=`
   <div class="elemento limpiarEstilos">
      <div class="elemento_descripcion">${egreso.desc}</div>
      <div class="derecha limpiarEstilos">
            <div class="elemento_valor">-${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${Math.floor((egreso.valor/calcularEgresos())*1000)/10}%</div>
            <div class="elemento_eliminar">
               <button class="elemento_eliminar--btn"><ion-icon name="close-circle-outline"
               onclick="eliminarEgreso(${egreso.id})"></ion-icon></button>
            </div>
      </div>
   </div>
   `
   return egresoHTML
}

eliminarIngreso=(id)=>{
   let eliminar=ingresos.findIndex(ingreso=>ingreso.id===id)
   ingresos.splice(eliminar,1)
   guardarDatos()
   cargarCabecero();
   cargarIngresos();
}
eliminarEgreso=(id)=>{
   let eliminar=egresos.findIndex(egreso=>egreso.id===id)
   egresos.splice(eliminar,1)
   guardarDatos()
   cargarCabecero();
   cargarEgresos();
}

const agregarDato = () => {
   let forma = document.forms['forma'];
   let tipo = forma['tipo'];
   let descripcion = forma['descripcion'];
   let valor = forma['valor'];

   // Elimina las comas del valor antes de convertirlo a número
   let valorSinComas = valor.value.replace(/,/g, '');

   // Convierte el valor a número decimal después de eliminar las comas
   let valorNumerico = parseFloat(valorSinComas);

   // Verifica si el valor es un número válido
   if (descripcion.value !== "" && !isNaN(valorNumerico)) {
      if (tipo.value === 'ingreso') {
         ingresos.push(new Ingreso(descripcion.value, valorNumerico));
         cargarIngresos();
         cargarCabecero();
      } else if (tipo.value === 'egreso') {
         egresos.push(new Egreso(descripcion.value, valorNumerico));
         cargarEgresos();
         cargarCabecero();
      }
   guardarDatos()
   }
};







document.getElementById('valor').addEventListener('input', function(e) {
   // Guardar la posición del cursor
   const start = e.target.selectionStart;
   const end = e.target.selectionEnd;

   // Actualizar el valor del campo de entrada
   updateInputValue(e.target);

   // Restaurar la posición del cursor
   e.target.setSelectionRange(start, end);
});

const eliminarDatos=()=>{
   document.getElementById('valor').value=''
   document.getElementById('descripcion').value=''
}



const formatearValor = (event) => {
   const input = event.target;
   let valor = input.value;

   // Eliminar caracteres no numéricos y formatear el número
   valor = valor.replace(/,/g, ''); // Eliminar comas existentes
   const partes = valor.split('.'); // Dividir en parte entera y decimal

   // Formatear la parte entera con comas
   partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

   // Unir partes con el punto decimal si existe
   input.value = partes.join('.');
};

// Configurar el evento 'input' para formatear el valor del input
document.addEventListener('DOMContentLoaded', () => {
   const inputValor = document.getElementById('valor');
   inputValor.addEventListener('input', formatearValor); // Formatear al escribir
   inputValor.addEventListener('blur', formatearValor);  // Formatear al salir del campo
});

function guardarDatos() {
   localStorage.setItem('ingresos', JSON.stringify(ingresos));
   localStorage.setItem('egresos', JSON.stringify(egresos));
}

function cargarDatos() {
   const ingresosGuardados = JSON.parse(localStorage.getItem('ingresos')) || [];
   const egresosGuardados = JSON.parse(localStorage.getItem('egresos')) || [];
   
   
   ingresosGuardados.forEach(i => ingresos.push(new Ingreso(i._desc, i._valor)));
   egresosGuardados.forEach(e => egresos.push(new Egreso(e._desc, e._valor)));
}
