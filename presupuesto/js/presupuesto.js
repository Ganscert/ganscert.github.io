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
   return totalIngresos
}
let calcularEgresos=()=>{ 
   let totalEgresos=0
   for(let i of egresos){
      totalEgresos+=i.valor
   }
   return totalEgresos
}

const cargarApp=()=>{
   cargarCabecero();
   cargarIngresos();
   cargarEgresos();
}

let cargarCabecero= ()=>{
   let presupuesto= calcularIngresos()-calcularEgresos()
   let porcentaje= calcularEgresos()/calcularIngresos()
   document.getElementById("presupuesto").innerHTML=formatoMoneda(presupuesto)
   document.getElementById('porcentaje').innerHTML=`
   ${isNaN(porcentaje) ? 0 : (Math.round(porcentaje * 1000)) / 10}%
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
   cargarCabecero();
   cargarIngresos();
}
eliminarEgreso=(id)=>{
   let eliminar=egresos.findIndex(egreso=>egreso.id===id)
   egresos.splice(eliminar,1)
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
   }
}