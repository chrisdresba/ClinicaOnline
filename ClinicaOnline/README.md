# Clinica Online

Proyecto para administrar una clínica con sus turnos, médicos, clientes y administradores

Puede acceder al proyecto desde el siguiente [link](https://clinicaonline-7159e.web.app/).

#Requerimientos de la aplicación
Debemos realizar un sistema según las necesidades y deseos del cliente, para eso tenemos una breve
descripción de lo que el cliente nos comenta acerca de su negocio.
“La clínica OnLine, especialista en salud, cuenta actualmente con consultorios (6 en la actualidad), dos laboratorios (físicos en la clínica), y una sala de espera general. Está abierta al público de lunes a viernes en el horario de 8:00 a 19:00, y los sábados en el horario de 8:00 a 14:00.

Trabajan en ella profesionales de diversas especialidades, que ocupan los consultorios acorde a su disponibilidad, y reciben en ellos pacientes con turno para consulta o tratamiento. Dichos turnos son pedidos por la web seleccionando el profesional o la especialidad. La duración mínima de un turno es 30 minutos."pero los profesionales pueden cambiar la duración según su especialidad. Estos profesionales pueden tener más de una especialidad.
También contamos con un sector dentro de la clínica que se encarga de la organización y administración de la misma.

# Funcionamiento

**Home - Pantalla de Inicio**  

*Podemos utilizar la barra de navegación para desplazarnos en las distintas rutas.*    

*Desde el vertice superior derecho podemos ingresar al login, donde podremos iniciar sesión para poder acceder a las distintas rutas.*    

![](https://github.com/chrisdresba/ClinicaOnline/blob/main/ClinicaOnline/appAngular/home.png?raw=true)


**Login**  

*Desde aquí podremos iniciar sesión con nuestro mail y contraseña, ambos datos son requeridos para ingresar correctamente.*    

*En caso de no contar con una cuenta, desde el botón inferior podremos crear una.*    



![](https://github.com/chrisdresba/ClinicaOnline/blob/main/ClinicaOnline/appAngular/login.png?raw=true)

**Pantalla Ingreso Registro**  

*Desde aquí podremos crear dos tipos de cuentas diferentes:*    

*Para crear una cuenta de tipo paciente, seleccionaremos la imagen de la izquierda.*   

*Para crear una cuenta de tipo especialista, seleccionaremos la imagen de la derecha.*   

![](https://github.com/chrisdresba/ClinicaOnline/blob/main/ClinicaOnline/appAngular/registro1.png?raw=true)


**Registro Usuario**  

*Una vez seleccionada el tipo de cuenta a crear, accederemos a un formulario en donde debemos cargar todos los datos solicitados.*    

*Es obligatoria la resolución del Captcha, ya que si no es resuelto, no podremos crear la cuenta.*    

*Cada vez que se cree una cuenta, se enviará un mail para verificar la misma.*   

![](https://github.com/chrisdresba/ClinicaOnline/blob/main/ClinicaOnline/appAngular/registro2.png?raw=true)

**Usuarios**  

*Esta ruta será de acceso exclusivo de los administradores*    

*En la misma se podrá observar un listado de pacientes y especialistas, estos ultimos podran ser habilitados e inhabilitados*

*El administrador podra crear todos los tipos diferentes de cuenta: pacientes, especialistas y administradores*

![](https://github.com/chrisdresba/ClinicaOnline/blob/main/ClinicaOnline/appAngular/usuarios.png?raw=true)

**Mi perfil**  

*Desde aquí podremos ver todos los datos del usuario que se encuentra en una sesión activa*

*En el caso de los especialistas, estos desde aquí podrán ingresar su horario disponible para los turnos.*    
![](https://github.com/chrisdresba/ClinicaOnline/blob/main/ClinicaOnline/appAngular/perfil.png?raw=true)
