# Julio Marticorena & Cía.

Web pública de Julio Marticorena & Cía. Ltda., desarrollada con React 19, TypeScript, Vite 7 y Tailwind CSS 4.

## Desarrollo

Con Node 22.12 o superior instalado:

```sh
npm install
npm run dev
npm run build
npm run validate
```

La versión compilada está en `dist/`. El sitio utiliza rutas hash para que todas las páginas funcionen en alojamientos estáticos sin reglas de reescritura. Servir `dist/` por HTTP(S), no abrirlo como archivo local.

## Publicación

Cada actualización enviada a la rama `main` se verifica, compila y publica automáticamente mediante GitHub Actions y GitHub Pages.

## Contenido

- `src/data/mockData.ts`: contenidos, remates, condiciones, oficinas y configuración de redes. Aunque el nombre se conserva del flujo de conversión de Stitch, los remates y contactos proceden de publicaciones reales verificadas.
- `src/data/galleries.json`: galerías locales. Hay 96 fotografías del remate presencial y 28 del electrónico. Galpones y planchas no tiene fotografías publicadas; se presentan sus especificaciones sin imágenes ajenas.
- `public/images/`: fotografías originales descargadas, con la resolución disponible en la publicación.
- `.stitch/sources/`: procedencia, HTML y registro de importación; no se distribuye en el sitio compilado.
- `.stitch/designs/`: diseños fuente de Stitch; sus imágenes ilustrativas y textos no verificados no se usan en la versión final.

La importación del 25 de septiembre detectó la prórroga de las 28 camionetas al 2 de octubre a las 12:00 y la incorporó al aviso. El remate electrónico usa la fecha de cierre indicada en su ficha específica: 1 de octubre a las 12:00; el listado general tenía información divergente.

## Redes sociales

WhatsApp está configurado en `https://wa.me/56968134197`. Facebook e Instagram apuntan temporalmente a sus páginas principales por indicación del cliente; reemplazar los destinos de `channels` cuando entregue los perfiles de empresa. Los iconos de marca proceden de Font Awesome Free; atribución en `public/brand-icons-license.txt`.

Las dos oficinas incluyen mapas de Google insertados y enlaces por dirección a Google Maps y Waze, sin claves ni servicios facturables. La ubicación se obtiene por búsqueda de la dirección publicada; confirmar el acceso exacto con la empresa antes del lanzamiento.

Prueba de contacto: `node scripts/contact.test.mjs` verifica los dos mapas y los destinos de navegación y redes.

## Verificaciones

Compilación de producción y TypeScript sin errores. Validador AST de interfaces readonly, colores tokenizados y enlaces. Comprobación en navegador de catálogo, búsqueda, filtros combinados, estado vacío, restablecimiento, navegación a fichas, botón social, galería, ampliación y teclado. Revisión visual de escritorio y móvil a 390 px.

## Alcance operativo

La web no almacena datos de clientes ni recibe pagos; teléfono y correo abren las aplicaciones del usuario. Área privada, inscripción, garantías y pujas propias siguen en segunda fase. Las publicaciones están almacenadas localmente; no hay sincronización automática ni panel de administración en esta entrega. Antes de publicar se deben confirmar vigencia de los remates y los canales definitivos con la empresa.
