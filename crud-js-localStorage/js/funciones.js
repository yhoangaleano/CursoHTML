//Obtener datos de localStorage
var dbJornaleros = localStorage.getItem("dbJornaleros");
//"A"=agregar; "E"=edtidar
var operacion = "A";
// Covertir a objeto
dbJornaleros = JSON.parse(dbJornaleros);
// Si no existe, creamos un array vacio.
if (dbJornaleros === null)
    dbJornaleros = [];

jQuery(document).ready(function($) {

    jornalero.inicializar();

});

var jornalero = {

    inicializar: function(){

        if (dbJornaleros.length !== 0) {
            jornalero.listar();
        } else {
            jornalero.mensajeVacio();
        }

        // Esperar a que se oprima el boton de guardar
        $("#btnGuardar").on("click", function(){

            console.log(operacion);

            if (operacion == "A")
                return jornalero.agregar();
            else {
                return jornalero.editar();
            }
        });
    },

    establecerFunciones: function(){
        $(".btnEliminar").on("click", function(){
            var respuesta = confirm("¿En verdad deseas eliminar este jornalero?");

            if (respuesta == true) {
                 // "this" contiene el elemento clikeado en el contexto actual
                 indice_selecionado = $(this).attr("id");
                 console.log(indice_selecionado);
                 console.log(this);
                // Eliminamos el elemento llamando la funcion de eliminar
                jornalero.eliminar(indice_selecionado);
                jornalero.listar();
            }
        });

        $(".btnEditar").on("click", function() {
            alert("¿ Me quieres editar ?");

            // Cambiamos el modo
            $(".modo").html("<span class='glyphicon glyphicon-pencil'> </span> Modo edición");
            $("#btnGuardar").val("Modificar");
            $("#btnGuardar").removeClass('btn-success').addClass('btn-primary');

            operacion = "E";
            indice_selecionado = $(this).attr("id");

            // Llemanos el formulario con los datos actuales del jornalero a editar
            var jornaleroItem = JSON.parse(dbJornaleros[indice_selecionado]);

            $("#id").val(indice_selecionado);
            $("#nombre").val(jornaleroItem.Nombre);
            $("#correo").val(jornaleroItem.Correo);
            $("#peso").val(jornaleroItem.Peso);
            $("#fecha_nacimiento").val(jornaleroItem.Fecha_nacimiento);
            $("#nombre").focus();
        });
    },

    limpiar: function() {

        $(".modo").html("<i class='glyphicon glyphicon-plus'> </i> Agregar Jornalero");
        $("#btnGuardar").val("Guardar");
        $("#btnGuardar").removeClass('btn-primary').addClass('btn-success');

        $("#id").val("");
        $("#nombre").val("");
        $("#correo").val("");
        $("#peso").val("");
        $("#fecha_nacimiento").val("");
        $("#nombre").focus();
    },

    listar: function() {

        jornalero.contar();
        $("#dbJornaleros-list tbody").empty();

        if (dbJornaleros.length !== 0) {
            for (var i in dbJornaleros) {
                var d = JSON.parse(dbJornaleros[i]);
                $("#dbJornaleros-list tbody").append(
                    "<tr>" +
                    "<td>" + i + "</td>" +
                    "<td>" + d.Nombre + "</td>" +
                    "<td>" + d.Correo + "</td>" +
                    "<td>" + d.Peso + "</td>" +
                    "<td>" + d.Fecha_nacimiento + "</td>" +
                    "<td> <button type='button' id='"+ i + "' class='btn btn-link btnEditar'> <i class='glyphicon glyphicon-pencil'> </i>  </button> </td>" +
                    "<td> <button type='button' id='"+ i + "' class='btn btn-link btnEliminar'> <i class='glyphicon glyphicon-trash'> </i> </button> </td>" +
                    "</tr>"
                    );
            }

            jornalero.establecerFunciones();

        } else {
            jornalero.mensajeVacio();
        }
    },

    mensajeVacio: function(){
        $("#dbJornaleros-list tbody").append("<tr><th colspan='7'>No tienes jornaleros</th></tr>");
    },

    contar: function(){
        var jornaleros = dbJornaleros;
        nJornaleros = jornaleros.length;

        $("#numeroJornaleros").empty();

        $("#numeroJornaleros").append(
            "<a>Tienes actualmente" + "<br>" + "<span class='badge'>" + nJornaleros + "</span></a> jornaleros"
            );
        return nJornaleros;
    },

    mensaje: function(opcion){
        switch (opcion) {
            case 1:
            $(".mensaje-alerta").append(
                "<div class='alert alert-success' role='alert'>Se agrego con exito el jornalero</div>"
                );
            break;
            case 2:
            $(".mensaje-alerta").append(
                "<div class='alert alert-danger' role='alert'>Se elimino el jornalero</div>"
                );
            break;
            default:

        }
    },


    agregar: function() {
        // Seleccionamos los datos de los inputs de formulario
        var datos_jornalero = JSON.stringify({
            Nombre : $("#nombre").val(),
            Correo : $("#correo").val(),
            Peso : $("#peso").val(),
            Fecha_nacimiento : $("#fecha_nacimiento").val(),
        });

        // Guardar datos en el array definido globalmente
        dbJornaleros.push(datos_jornalero);
        localStorage.setItem("dbJornaleros", JSON.stringify(dbJornaleros));

        jornalero.limpiar();
        jornalero.listar();

        return jornalero.mensaje(1);
    },

    eliminar: function(indice_selecionado){
        // indice_selecionado (posición en el array, numero de items a eliminar)
        dbJornaleros.splice(indice_selecionado, 1);
        localStorage.setItem("dbJornaleros", JSON.stringify(dbJornaleros));
        return jornalero.mensaje(2);
    },

    editar: function() {

        var jornalero_modificado = JSON.stringify({
            Nombre : $("#nombre").val(),
            Correo : $("#correo").val(),
            Peso : $("#peso").val(),
            Fecha_nacimiento : $("#fecha_nacimiento").val(),
        });

        var indice_selecionado = $("#id").val();

        dbJornaleros[indice_selecionado] = jornalero_modificado;
        localStorage.setItem("dbJornaleros", JSON.stringify(dbJornaleros));
        
        jornalero.limpiar();
        jornalero.listar();

        //Regresamos la valor original
        operacion = "A";
        return true;
    }
}