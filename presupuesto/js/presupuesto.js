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
   return parseInt(totalIngresos)
}
let calcularEgresos=()=>{ 
   let totalEgresos=0
   for(let i of egresos){
      totalEgresos+=i.valor
   }
   return parseInt(totalEgresos)
}

const cargarApp=()=>{
   cargarDatos(); // Cargar datos guardados
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
   guardarDatos(); // Guardar cambios
   cargarCabecero();
   cargarIngresos();
}
eliminarEgreso=(id)=>{
   let eliminar=egresos.findIndex(egreso=>egreso.id===id)
   egresos.splice(eliminar,1)
   guardarDatos(); // Guardar cambios
   cargarCabecero();
   cargarEgresos();
}

const agregarDato=()=>{
   let forma=document.forms['forma']
   let tipo=forma['tipo']
   let descripcion=forma['descripcion']
   let valor=forma['valor']
   if(descripcion.value!==""&&valor.value!==''){
      if(tipo.value==='ingreso'){
         ingresos.push(new Ingreso(descripcion.value,+valor.value))
         cargarIngresos()
         cargarCabecero()
      }
      else if(tipo.value==='egreso'){
         egresos.push(new Egreso(descripcion.value,parseInt(valor.value)))
         cargarEgresos()
         cargarCabecero()
      }
      guardarDatos(); // Guardar cambios
   }
}


function formatNumber(value) {
   // Añade comas como separadores de miles
   return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function cleanInputValue(value) {
   // Elimina cualquier carácter que no sea un número o un punto decimal
   return value.replace(/[^0-9.]/g, '');
}

function updateInputValue(input) {
   const currentValue = input.value;
   const cleanValue = cleanInputValue(currentValue);
   
   // Si hay más de un punto decimal, eliminar los adicionales
   const parts = cleanValue.split('.');
   if (parts.length > 2) {
         cleanValue = parts[0] + '.' + parts.slice(1).join('');
   }

   if (cleanValue === '') {
      input.value = '';
   } else {
      input.value = formatNumber(cleanValue);
   }
}

document.getElementById('valor').addEventListener('input', function(e) {
   // Guardar la posición del cursor
   const start = e.target.selectionStart;
   const end = e.target.selectionEnd;

   // Actualizar el valor del campo de entrada
   updateInputValue(e.target);

   // Restaurar la posición del cursor
   e.target.setSelectionRange(start, end);
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


const eliminarDatos=()=>{
   document.getElementById('descripcion').innerHTML=''
   document.getElementById('valor').innerHTML=''
}