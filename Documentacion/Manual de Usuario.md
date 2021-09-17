### <img align="right"  src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/LOGOUSAC.png" width="250px"/>   Universidad San Carlos de Guatemala <br> Facultad de Ingenieria <br> Seminario De Sistemas 1 <br> Auxiliar: Diego Estuardo Gómez Fernández 
> Integrantes <br> 
> - Juan Pablo Ardón López -            201700450 <br> 
> - Erick Fernando Sánchez Mejía -      201503878 

<h1 align="center">Proyecto 1</h1>

# Manual de Usuario

## Indice

- [Objetivos Del Manual](#f0)
- [Explicación y descripción de la aplicación](#f0_)
- [Login](#f1)
- [Registro](#f2)
- [Dashboard U-Storage](#f3)
- [Subir archivo](#f4)
- [Editar archivo](#f5)
- [Eliminar archivo](#f6)
- [Agregar amigo](#f7)
- [Ver archivos públicos de amigos](#f8)

<a name="f0"></a>

### Objetivos Del Manual

Establecer los pasos especificos para la administración de archivos en la nube a travéz del aplicactivo, otorgando funcionalidades de carga, edición, eliminacion de archivos ya sea públicos o privados, asi como agregar amigos para poder compartir archivos públicos.

<a name="f0_"></a>

### Explicación y descripción de la aplicación

<a name="f1"></a>

Actualmente existen diversas formas y situaciones donde se necesita e implementan los servicios de la nube, como estudiantes de Seminario de sistemas 1 y teniendo los conocimientos básicos de diferentes servicios que nos brinda AWS se requiere que defina, desarrolle e implemente una aplicación para el Almacenamiento de archivos públicos y privados con las opciones de agregar amigos y poder ver sus archivos compartidos y con la posibilidad de compartir nuestros propios archivos para que estos los puedan ver y también tener la opción de guardar archivos en modo secreto.

### Login

- Esta es la pantalla de Login o inicio se sesión, el usuario ingrasa a su cuenta colocando su nombre de usuario o correo electronico y password.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/login.PNG" /></p>

- Cuando los campos estan vacios y el usuario intena ingresar el sistema mostrara una advertencia al respecto.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/clv.PNG" /></p>

- Si el usuario coloca un username o pasword incorrectos el sistema mostrara una advertencia al respecto, esto suceda a que el sistema verifica que el usuario exista.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/uci_.PNG" /></p>

- Dando Click en el ojito en el campo de contraseña se puede ocultar o mostrar la contraseña para saber si estamos colocando de manera correcta nuestro password.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/po_.PNG" /></p>
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/pno_.PNG" /></p>

- Al dar click en el boton de crear cuenta nueva seremos trasladados a la página de registro.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/btnre_.PNG" /></p>

<a name="f2"></a>

### Registro

- Esta es la pantalla de registro de usuario, el usuario debe ingrasar nombre de usuario, correo electronico, contraseña y foto de perfil
para crear una cuenta en el sistema.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/registerpage_.PNG" /></p>

- Todos los datos descritos anteriormente son obligatorios, si el usuario decide no colocar alguno sistema mostrara una advertencia al respecto.

    - campo nombre de usuario vacio.
    <p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/rnuv_.PNG" /></p>
    - campo correo electronico vacio.
    <p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/rcoev_.PNG" /></p>
    - campo contraseña vacio.
    <p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/rccv_.PNG" /></p>
    - campo condifrmar contraseña vacio.
    <p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/rcccv_.PNG" /></p>
    - es obligatorio seleccionar foto de perfil, el sistema notificara si no selecciona.
    <p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/rcsfp_.PNG" /></p>
    - si las contraseñas no coinciden, el sistema lo notificara.
    <p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/rccrne_.PNG" /></p>
    - Es posible ver las contraseñas dando click en los ojitos en los campos.
    <p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/rojop_.PNG" /></p>

- Acceso rapido a documentación del proyecto 1, regreso a la pantalla de Login o ver el código en repositorio en la parte superior o navbar en la pantalla de registro.
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/rnvabar_.PNG" /></p>

- Al cumplir con los requisitos previos para crear una cuenta, damos click en el boton Empezar, el sistema notificara que se ha registrado correctamente y seguido de esto lo enviara al Login para ingresar.
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/rcorrecto_.PNG" /></p>

<a name="f3"></a>

### Dashboard U-Storage

- Al hacer Login el sistema automaticamente nos mostrara un excelente dashboard donde podras realizar diferentes acciones referentes al almacenamiento de archivos en la nube.
    
    - A simple vista encontraras tu foto de perfil y nombre de usuario en un costado.
    - El boton de cerrar sesión facil de encontrar en la parte superior.
    - Área donde podras ver tus archivos: secciones separadas donde puedes ver tus archivos públicos y privados.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/udachboard_.PNG" /></p>

- En el sistema U-Storage encontraras dos formas de realizar acciones de creación de archivos, agregar amigo y ver archivos publicos.
    
    - Forma No. 1: Dando click en el boton que dice nuevo, situado abajo de tu nombre de usuario y foto de prefil.
    <p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/dcontex1_.PNG" /></p>

    - Forma No. 2: Puedes situar el puntero del mouse en las areas de público y privado, dar click derecho y abrira un menu contextual muy intuitivo como utilizar tu sistema de archivos en tu computadora.
    <p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/dcontex2_.png" /></p>

<a name="f4"></a>

### Subir archivo

- Al dar click en la opción "subir archivo" automaticamente se nos abrira una patalla flotante para cargar un archivo, este puede ser publico o privado y todos los campos son obligatorios, exceptuando el campo nombre de archivo ya que puede o no cambiar el nombre del archivo que desea subir, los archivos aceptados son imagenes, archivos de texto y documentos pdf.

    - En esta pantalla se pedirá seleccionar un archivo a subir desde el ordenador.
    - Se muestra la ruta del archivo seleccionado.
    - Se puede modificar el nombre del archivo como será guardado.
    - Se puede elegir la visibilidad del archivo en modo publico o privado.
    - Para poder subir un archivo se pide confirmar la contraseña esto es obligatorio.
    - Únicamente se podrán subir Imágenes, archivos de textos y documentos pdf.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/dsa_.PNG" /></p>

- La ventana flotante de subir archivos cuenta con un sistema de alertas que le indicaran de cada acción realizada.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/dal_.PNG" /></p>

- Es necesario colocar su password de cuenta para subir archivos, el sistema le notificara si la contraseña es incorrecta o si el campo esta vacio, puede ver el pass en el ojito.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/dpasssia_.PNG" /></p>

- Al cumplir con lo mencionado anteriormente, damos click en el boton cargar, el sistema notificara que se ha cargado un elemento y acontinuacion se mostrará en el area de archivos publicos o privados, dependiendo de la visibilidad que haya seleccionado.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/darchivocargado.PNG" /></p>

<a name="f5"></a>

### Editar archivo

- Para editar un archivo, debemos de dar click derecho sobre un archivo y se nos abrira un menu contextual, damos click en editar.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/deditar.PNG" /></p>

- Seguido de lo anterior se nos abrira una pantalla flotante.

    - En esta pantalla se podrá cambiar el nombre del archivo.
    - Se podrá cambiar el modo de visibilidad del archivo de privado a publico y viceversa.
    - Se necesita confirmación de contraseña para editar el archivo.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/dpantaeditar.PNG" /></p>

- La ventana flotante de editar archivos cuenta con un sistema de alertas que le indicaran de cada acción realizada.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/deditalerta.PNG" /></p>

<a name="f6"></a>

### Eliminar archivo

- Para eliminar un archivo, debemos de dar click derecho sobre un archivo y se nos abrira un menu contextual, damos click en eliminar.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/deiminararc.PNG" /></p>

- Seguido de lo anterior se nos abrira una pantalla flotante.

    - En esta pantalla únicamente se pide al usuario es que revise bien el nombre del archivo a eliminar.
    - Para confirmar la eliminación de un archivo se necesita confirmar la contraseña del usuario.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/deliminaflot.PNG" /></p>

- La ventana flotante de eliminar archivos cuenta con un sistema de alertas que le indicaran de cada acción realizada.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/alerteliminarar.PNG" /></p>

<a name="f7"></a>

### Agregar amigo

- Al dar click en la opción "Agregar amigo" automaticamente se nos abrira una patalla flotante con todos los usuarios que estan registrados en U-Storage. Estos se muestran de dos en dos.

    - En la sección de agregar amigos, aparecerán todos los usuarios creados en la plataforma.
    - Tiene opción de buscar a un usuario por su username.
    - También contiene un contador de cuantos archivos públicos tiene ese usuario y la opción de agregar a ese amigo.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/dagrea.PNG" /></p>


- Cuando agreguemos a un amigo dejara de aparecer en está pantalla, ya que ahora nuestro amigo ya no aparecera en la lista para volver a agregarlo. Veamos un ejemplo, en los usuarios registrados en este momento, busquemos al usuario "erickace".

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/ejemploagrr.PNG" /></p>

- Ahora procedemos a agregarlo. Observemos que el contador de usuarios baja en 1, y erickace desaparece de esta lista autoamticamente. Esto implica que ya es nuestro amigo.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/amiguis.PNG" /></p>

<a name="f8"></a>

### Ver archivos públicos de amigos

- Al dar click en la opción "Ver archivos públicos" automaticamente se nos abrira una patalla flotante con todos los archivos publicos de nuestros amigos.

    - En esta sección aparecen todos los archivos públicos de los amigos que hayamos agregado. SOLAMENTE LOS ARCHIVOS PUBLICOS DE AMIGOS AGREGADOS.
    - Esta pantalla cuenta con una opción de poder ver estos archivos ya sea una imagen o un archivo de texto .txt o .pdf.
    - Contiene también una opción de buscar por el nombre del archivo.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/vermiagogosarc.PNG" /></p>

- Como podemos observar en la imagen anterior, MYNEWUSER pueden ver los archivos de ERICKACE eso implica que son amigos, es decir que si vamos al usuario ERICKACE el tambien podra observar los archivos de MYNEWUSER.

<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Documentacion/Images/todosamigos.PNG" /></p>





