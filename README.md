![Alt text]( http://lh5.ggpht.com/VJ551nPgKjFzhZ3Q9-ukMBJHhuQ-jSzj6ZC_WkmTsBD3vANXAevxTa0-JTnruWx4l3xTLjj8TTQJ4MgHPgYzf01zmhoO8CcUgR_LA3IehQ "doodle 2015")

Node-doodles
============
 Este es un pequeño programa hecho en node.js que consume parte del API-REST de google para obtener las imágenes de los doodles de google según el año y el mes, este programa no tiene ninguna intención maliciosa, con la cual pueda representar un problema a los servidores de google.

## Getting Started
Ejecuta siguientes comandos:

* **Clone el repositorio** 
`git clone https://github.com/Maxtermax/node-doodles.git`

* **Entra al repositorio clonado** 
`cd ./node-doodles && node node-doodles.js 2015:1 `

Cuando ejecutes el programa incluye 2 parmetros el primero es el año de los doodles que quieres obtener de google 
y el segundo parametro es el mes de los doodles que quieres obtener de google, nota que estos dos parametros estan separados por 
el simbolo de dos puntos `:` esto actua como un separador entre el mes y el año, es algo importante dentro del codigo asi que no te olvides de ponerlo.
`node-doodles.js 2015:1 `
Año:`2015`
Mes:`1`
en caso de que google no tenga doodles para una fecha en especifico node-doodles te lo dira y el programa terminara.

## Como funciona
Node-doodles hace una peticion ´GET´ a el API-REST de google y luego busca los imagenes de los doodles,entonces node.js crea un directorio llamado doodles en donde finalmente se descargan las imagenes requeridas. 



