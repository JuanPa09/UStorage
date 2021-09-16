### <img align="right"  src="https://github.com/JuanPa09/UStorage/blob/main/Images/LOGOUSAC.png" width="250px"/>   Universidad San Carlos de Guatemala <br> Facultad de Ingenieria <br> Redes de Computadoras 1 <br> Auxiliar Juan Pablo Garcia Monzón 
> Integrantes <br> 
> - Juan Pablo Ardón López -            201700450 <br> 
> - Erick Sánchez -  201503878 

<h1 align="center">Proyecto1</h1>

# Manual Técnico

## Indice

- [Objetivos Del Manual](#f1)
- [Explicación Arquitectura Del Proyecto](#f2)
- [Descripción De Cada Usuario De IAM](#f3)
- [Configuración De Cada Servicio](#f4)
- [Conclusiones](#f5)

<a name="f1"></a>

### Objetivos Del Manual

- Entender el funcionamiento de una VPC
- Entender el funcionamiento de un load balancer
- Utilizar los servicios de aws para la implementación de una aplicación
- Conocer el funcionamiento de RDS
- Aprender a configurar un bucket en S3 para el almacenamiento de archivos

<a name="f2"></a>

### Explicación Arquitectura Del Proyecto

> 1. Lo primero que se tuvo que hacer fue crear una VPC para permitir tener todos nuestros servicios en una misma red y manejar de una mejor manera las conexiones entre cada uno de los servicios. 
> 2. Se crearon dos tipos de subnets para la VPC. 
>  2.1 Subnet Publica para manejar las conexiones entre cliente-servidor
>  2.2 Subnet Privada para mantener la base de datos segura
> 3. Para la subnet publica se creo un "Internet Gateway" para que tuviera acceso a internet
> 4. Se crearon dos route tables, una para cada tipo de subnet y se le agrego el internet gateway a la route table que contenia a las subnets publicas
> 5. Se le asigno una ip publica a la subnet publica
> 6. Se configuraron 2 EC2 y se agregaron a la vpc con sus respectivas subnets publicas
> 7. Se creo un bucket que puediera ser publico desde las EC2
> 8. Se creo una base de datos y se agrego a la vpc con accesso privado
> 9. Se creo un load balancer para que pudiera balancera la carga de trafico entre las dos maquina virtuales

Lo que se logro con estas configuraciones fue que los datos de la base de datos fueran solamente accedidos desde dentro de nuestras ec2 y mantenerlas seguras. 
Y la unica forma de acceso desde el cliente es por medio de las EC2 que estan configuradas con subnets publicas para que puedieran ser accedidas. 

<a name="f3"></a>

### Descripcion usuarios IAM

Nuestro equipo esta conformado por dos personas, por lo que fueron necesarios dos usuarios IAM con permisos de administrador para que ambos tuvieramos acceso a la cuenta de AWS. Adicionalmente para el acceso al bucket se tuvo que crear un usuario extra para obtener las credenciales.
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/usuariosIAM.png" /></p>
Cada usuario de cada integrante tiene politicas "AdministratorAccess" para que tuviera acceso a todo
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/politicasUsuarios.png" /></p>
Para el bucket se le agrego la politica "AmazonS3FullAccess" para que tuvieramos acceso a todas las funcionalidades de S3
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/politicasBucket.png" /></p>

<a name="f4"></a>

### Configuracion De Cada Servicio

#### S3
> 1. Creamos un nuevo bucket con el nombre "archivos-15-p1"
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/BucketS3.png" /></p>
> 2. Desbloqueamos todo el acceso publico para poder acceder a el desde fuera
> 3. Creamos su respectivo usuario IAM para poder obtener las credenciales
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/politicasBucket.png" /></p>

#### EC2
> 1. Creamos dos maquinas virtuales identicas con sistema operativo linux
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/EC2s.png" /></p>
> 2. Utilizamos los nombres "server1-15-p1" y "server2-15-p1"
> 3. Agregamos la maquina a la vpc y le asignamos la subnet publica
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/confEC2.png" /></p>
> 4. Creamos un grupo de seguridad nuevo con el puerto donde tenemos corriendo nuestro backend y se los asignamos a las 2 EC2
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/sgEC2.png" /></p>

#### VPC
> 1. Creamos una nueva VPC con el nombre "semi1vpc-15-p1"
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/VPC.png" /></p>
> 2. Le agregamos "10.0.0.0/16" a la IPv4 CIDR
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/confVPC.png" /></p>

#### Subnets
> 1. Creamos dos subnets, una publica y una privada
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/subnets.png" /></p>
> 2. Agregamos las subnets a nuestra VPC
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/subnetsVPC.png" /></p>
> 3. Se agrego una ip publica a la subnet publica
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/subnetpubIP.png" /></p>

#### Internet Gatewats
> 1. Creamos un internet gateway con el nombre "ig-15-p1" y lo enlazamos a nuestra vpc
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/internetgateway.png" /></p>

#### Route Tables
> 1. Se crearon dos route tables, una publica y una privada y la enlazamos a nuestra vpc
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/routetables.png" /></p>
> 2. Se agregaron las respectivas subnets a cada route table
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/routetablessubnets.png" /></p>
> 3. Se agrego la internet gateway a la route table publica
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/routetableinternetgateaw.png" /></p>

#### RDS
> 1. Se creo una nueva base de datos MySQL
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/RDS.png" /></p>
> 2. Se agrego a la vpc y se le configuro un grupo de subnets privadas
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/RDSconf.png" /></p>

#### Load Balancer
> 1. Se creo un nuevo balanceador de carga http
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/loadbalancer.png" /></p>
> 2. Se agrego a la vpc y se agregaron un par de subnets publicas de diferentes regiones
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/loadbalancervpc.png" /></p>
> 3. Se creo un target group con las ec2 de nuestra vpc
<p align="center"><img src="https://github.com/JuanPa09/UStorage/blob/main/Images/loadbalancertargetgroup.png" /></p>


<a name="f5"></a>

### Conclusiones 

> AWS es una herramienta que nos permitio gestionar de la mejor forma la estructura de nuestro proyecto, brindandonos herramientas para mantener la integridad de nustra aplicacion segura. Pudimos configurar nuestras redes internas para mantener la conexion cliente-servidor segura y nuestros datos de la base de datos privados. Gracias al balanceador de carga pudimos no sobrecarga un solo servidor y evitar errores de sobrecarga del lado del backend. Nuestro proyecto tiene todas las herramientas necesarias de AWS para mantener un correcto funcionamiento de nuestros servicios y lo mas importante, estan seguros gracias a las conexiones implementadas.





