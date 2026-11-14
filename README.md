# Amigos de la Naturaleza · Libro de lectura (web)

Sitio estático (HTML + CSS + JavaScript). No necesita base de datos ni servidor especial.

## Cómo subirlo a tu subdominio
1. Sube **todo el contenido de esta carpeta** (index.html, css/, js/, img/, fonts/) a la carpeta pública del subdominio (por ejemplo `public_html/lectura/`), manteniendo la estructura.
2. Abre `https://tu-subdominio/` y listo. Funciona en celular, tableta y computador.

## Cambiar la clave del adulto
Edita `js/config.js` y cambia `PIN` (por defecto es `1234`). Se entra desde el enlace "Panel del adulto" en la pantalla de inicio.
Aviso: la clave está en el código de la página, así que sirve para que el niño no entre por accidente, no como seguridad real.

## Cómo se evalúa
- El niño escribe su nombre, lee, y contesta 3 preguntas por cuento. Ve en el momento si acertó y recibe estrellas.
- Cada intento queda guardado con fecha, alumno, puntaje y las respuestas elegidas.
- En el **Panel del adulto** ves el mejor resultado por cuento, el detalle de cada intento, y puedes **descargar un CSV** (abre en Excel) o **imprimir un informe**.
- Por defecto los resultados se guardan **en el navegador del dispositivo** que usa el niño. Si cambias de equipo o borras los datos del navegador, no estarán.

## (Opcional) Recibir los resultados en una hoja de Google
1. Crea una hoja de cálculo en Google Sheets → Extensiones → Apps Script, y pega:

```js
function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  var sh = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var resp = d.answers.map(function (a) { return a.chosen + (a.ok ? " (OK)" : " (X)"); });
  sh.appendRow([new Date(d.date), d.name, d.storyTitle, d.attempt, d.score, d.total].concat(resp));
  return ContentService.createTextOutput("ok");
}
```
2. Implementar → Nueva implementación → Aplicación web → Acceso: "Cualquier persona". Copia la URL.
3. Pega esa URL en `RESULTS_ENDPOINT` dentro de `js/config.js`.

## Agregar o cambiar cuentos
Todo el contenido (textos, imágenes y preguntas) está en `js/data.js`. Las imágenes van en `img/`.
