# CRUD-js-localStorage

CRUD en Javascript utilizando localStorage

### Creación del localStorage

Debemos crear una instancia en el localStorage donde se guardarán literalmente un **string**. Para poder hacer el intercambio entre objeto **JSON** y string usaremos las funciones `stringify` y `parse` y en un array tendremos disponibles siempre la colección del los objetos para poderlos iterar.

http://slides.com/yhoanandresgaleanourrea-1/html5-forms-localstorage#/


```js
var dbJornalero = localStorage.getItem("dbJornalero"); //Obtener datos de localStorage
dbJornalero = JSON.parse(dbJornalero); // Covertir a objeto
if (dbJornalero === null) // Si no existe, creamos un array vacio.
    dbJornalero = [];
```


### Funciones

En el script `funciones.js` definimos una función o metetodo para cada uno de los casos:

- Creación de un objeto
- Actualizción
- Eliminación

Tambien funciones de consulta como listado de los atributos y algo para contar el total de objetos.

Para poder manejar estas acciones usamos un modo de operación como un `flag` asi,

```
var operacion = "A"; //"A"=agregar; "E"=edtidar

```

Luego esperamos por un evento usando Jquery y mandamos a la funcion en cuestión.
```js
// Esperar el evento de envio del formulario !!
$("#jornalero-form").bind("submit", function() {
    debugger;
    if (operacion == "A")
        return AgregarJornalero();
    else {
        return Editar();
    }
});
```

### Estilos

Referencias a clases de Bootstrap `container` y `col-md-x`

### Arquitectura

![Arquitectura js-localSotrage](http://i.imgur.com/1r60VsO.png)


### Mockups

![Mockups](http://i.imgur.com/vEfkY52.png)

## Identificar si estas Online o no
```js

navigator.onLine

### Ejercicios

- Aclaración sobre comparadores lógicos

```js
0 == false;   // true
0 === false;  // false, por que son de tipo diferente
1 == "1";     // true, Coversión automatica solamente para el valor
1 === "1";    // false, Son de tipo diferente
null == undefined; // true
null === undefined; // false
'0' == false; // true
'0' === false; // false
```

> Escribir un bucle que va desde x = 0 hasta x <10.
> Dentro del bucle, si x es par,  mostrar x y "par" en la consola.
si x es impar, mostrar X e "impar" en la consola.

```js

for (var i = 0; i < 10; i++) {
    if (i % 2 === 0 ) {
        console.log(i, "Es par");
    }else{
        console.log(i, "Es impar");
    }
}
```

> Objeto Javascript

```js

var Personas = {
  url: "http://mi_seleccion.com.co",

  integrantes: {
    primernombre: "Jose",
    segundoNombre: "Pekerman"
  },

  torneos:{
    nombre: "Eliminatoria Rusia",
    partidosGanados: "2"
  }
};

```
> Más de un integrante ? Un objeto dentro de un objeto? , usamos arrays.

```js
var Personas = {
  url: "http://mi_seleccion.com.co",

  integrantes: [
    {
      primerNombre: "Jose",
      segundoNombre: "Pekerman"
    },
    {
      primerNombre: "Radamel",
      segundoNombre: "Falcao"
    }
  ]
};

```
> Operaciones con arrays

```js
// Array Original
var array = ["uno", "dos", "cuatro"];
// splice(position, numberOfItemsToRemove, item)
array.splice(2, 0, "tres");

array;  // ["uno", "dos", "tres", "cuatro"]

```

> Como limpiar el localStorage ?

```js
localStorage.clear();
```
