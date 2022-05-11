import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear Cliente";

  public errores: string[];
  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }
  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params =>{
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe((cliente) =>this.cliente = cliente)
      }
    })
  }
  create(): void{
    this.clienteService.create(this.cliente)
    .subscribe(json => {
      Swal.fire('Nuevo cliente', `${json.mensaje} : ${json.cliente.nombre}`, 'success')
      this.router.navigate(['/clientes'])
    },
    err => {
      this.errores = err.error.errors as string[];

    }
    );
  }

  update():void{
    this.clienteService.update(this.cliente)
    .subscribe(json => {
      this.router.navigate(['/clientes'])
      Swal.fire('Cliente actualizado', `${json.mensaje} : ${json.cliente.nombre}`, 'success')
    },
    err => {
      this.errores = err.error.errors as string[];
      
    })
  }  

}
