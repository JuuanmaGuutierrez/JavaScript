class productoAgregado{
    constructor(producto, cantidad, id, precio){
        this.id=Number(id),
        this.nombre=producto.toLowerCase();
        this.precio=Number(precio);
        this.cantidad=parseInt(cantidad)
    }
}
const articulos=[
    {
        id:0,
        nombre:"gin",
        precio:1100,
        cantidad:0,
        clase:"destilado"
    },
    {
        id:1,
        nombre:"vodka",
        precio:2370,
        cantidad:0,
        clase: "destilado"
    },
    {
        id:2,
        nombre:"fernet",
        precio:1250,
        cantidad:0,
        clase: "aperitivo"
    },
    {
        id:3,
        nombre:"ron",
        precio:1750,
        cantidad:0,
        clase: "destilado"
    },
    {
        id:4,
        nombre:"cerveza",
        precio:270,
        cantidad:0,
        clase:"cerveza"
    },
    {
        id:5,
        nombre:"whisky",
        precio:5470,
        cantidad:0,
        clase: "destilado"
    },
    {
        id:6,
        nombre:"gaseosa",
        precio:350,
        cantidad:0,
        clase:"gaseosa"
    },
    {
        id:7,
        nombre:"hielo",
        precio:300,
        cantidad:0,
        clase: "extras"
    }
];
const carrito=[];
let seleccionarProducto=null;
let seleccionarCantidad=0;
let seleccionarCuotas=0;
let total=0;
let totalCuotas=0;
let volverAComprar=true;

const agregarAlCarro=(seleccionarProducto,seleccionarCantidad)=>{
    let producto=articulos.find(producto=>producto.nombre===seleccionarProducto);
    let enCarrito=carrito.find(producto=>producto.nombre===seleccionarProducto);
    if(producto){
        if(enCarrito){
            enCarrito.cantidad+=seleccionarCantidad;
        }
        else{
            producto.cantidad=seleccionarCantidad;
            carrito.push(producto);
        }
    }
    else{
        let agregarArticulo=confirm(`El producto no se encuntra en stock quiere agregarlo?`);
        if(agregarArticulo==true){
            let totalId=articulos.length;
            let id=totalId++;
            let precio=Number(prompt(`Ingrece el precio de ${seleccionarProducto}`));
            let articuloNuevo=new productoAgregado(seleccionarProducto,0,id,precio);
            articulos.push(articuloNuevo);
            articuloNuevo.cantidad=seleccionarCantidad;
            carrito.push(articuloNuevo);
        }
    }
}
const calcularTotal=()=>{
    total=0;
    carrito.forEach(producto=>{
        total+=(producto.cantidad*producto.precio);
    })
    return Math.round(total);
}
const calcularCuotas=(cuotas)=>{
    totalCuotas=total/cuotas;
    totalCuotas=Math.round(totalCuotas);
    return totalCuotas;
}
const mostrarTotal=()=>{
    if(seleccionarCuotas==1){
        alert(`
            El total de su compra es de: $${total}
        `);
    }
    else{
        alert(`El total de su compra es de  $${total}$ en ${seleccionarCuotas} cuotas de $${totalCuotas} finales`);
    }
}
const verCarrito=()=>{
    console.log(`
    
    Productos en el carrito:
    
    `);
    for (const articulo of carrito) {
        console.log(`
        Producto: ${articulo.nombre},
        Cantidad: ${articulo.cantidad},
        Precio:${articulo.precio}$ c/u

        `);
    }
}
const pedirProducto=()=>{
    for (const articulo of articulos) {
        console.log(`
        ${articulo.nombre} : ${articulo.precio}`);
    }
    do{
        seleccionarProducto=prompt(`
            Presione la tecla F12 para ingresar a la lista de productos.

            Si no aparece la lista, recargue la página.

            Una vez allí, si no encuentra el producto que desesa comprar,
            puede agregarlo manualmente, junto con su valor.

            Para cancelar la compra, escriba "salir"
                `);
                if(seleccionarProducto==null || seleccionarProducto==""){
                    alert(`No ingresaste ningun dato`);
                }
                else if((!isNaN(seleccionarProducto))){
                    alert(`Ingresaste un numero`);
                }
    }while(!isNaN(seleccionarProducto))
    
}
const pedirCantidad=()=>{
    do{
        seleccionarCantidad=Number(prompt(`
            Ingrese la cantidad de "${seleccionarProducto}" que quiere llevar:
        `));
        if(seleccionarCantidad==0){
            alert(`No ingresaste ninguna cantidad, vuelve a intenrarlo`);
            seleccionarCantidad=NaN;
        }
        else if(isNaN(seleccionarCantidad)){
            alert(`No ingresaste un Numero`);
        }
    }while(isNaN(seleccionarCantidad))
}
const pedirCuotas=()=>{
    do{
    seleccionarCuotas=Number(prompt(`Ingrese la cantidad de cuotas que desea pagar`));
        if(seleccionarCuotas==0){
            alert(`No ingresaste ninguna cantidad, vuelve a intenrarlo`);
            seleccionarCuotas=NaN;
        }
        else if(isNaN(seleccionarCuotas)){
            alert(`No ingresaste un Numero`);
        }
    }while(isNaN(seleccionarCuotas))
}
//Logica
do{
    pedirProducto();
    seleccionarProducto.toLowerCase();
    if(seleccionarProducto=="salir"){
        break;
    }
    pedirCantidad();
    agregarAlCarro(seleccionarProducto,seleccionarCantidad);
    verCarrito();
    alert(`El sutotal es de =$${+calcularTotal()}`);
    volverAComprar=confirm(`Quiere agregar otro producto al carrito?`);
    if(volverAComprar==false){
        break;
    }
}while(seleccionarProducto!="salir" || volverAComprar==true);
if(volverAComprar==false){
    pedirCuotas();
    calcularCuotas(seleccionarCuotas);
    mostrarTotal();
}
console.log("Gracias por su compra");