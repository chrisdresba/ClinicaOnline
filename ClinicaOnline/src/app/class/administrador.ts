export class Administrador {
    nombre: string = '';
    apellido: string = '';
    edad: number = 0;
    dni: number = 0;
    mail: string = '';
    password: string = '';
    foto1: string = '';
    admin: boolean = true;

    iniciarAdmin(nombre:string,apellido:string,edad:number,dni:number,mail:string,foto1:string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.mail = mail;
        this.foto1 = foto1;
    }
}