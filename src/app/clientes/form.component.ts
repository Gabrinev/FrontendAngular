import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2'
import { Region } from './detalle/region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  public regiones: Region[];
  public titulo: string = "Crear Cliente";

  public errores: string[];
  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.cargarCliente()

    this.clienteService.getRegiones().subscribe(regiones => {
      this.regiones = regiones
    });
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente);
      }
    });
  }

  create(): void{
    console.log(this.cliente)

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

  update(): void{
    console.log(this.cliente)
    this.clienteService.update(this.cliente)
      .subscribe(json => {
        this.router.navigate(['/clientes'])
        Swal.fire('Cliente actualizado', `${json.mensaje} : ${json.cliente.nombre}`, 'success')
      },
        err => {
          this.errores = err.error.errors as string[];
      
        });
  }  
  
  compararRegion(o1: Region, o2: Region): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 == null || o2 == null ? false : o1.id ===o2.id;
  }
}
