import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true, 
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  implements OnInit{
  usuarioAutenticado: boolean = false;
  nomeUsuario: string = '';
  emailUsuario: string ='';

  ngOnInit(): void {
     const dados =localStorage.getItem('auth-user');
     if(dados!= null){
      var usuario = JSON.parse(dados);
      this.nomeUsuario = usuario.nome;
      this.emailUsuario = usuario.email;
      this.usuarioAutenticado = true;


     }
  }
  logout(): void {
    if(confirm('Deseja realmente sair do sistema ?')){
      localStorage.removeItem('auth-user');

      location.href='/app/login';
    }

  }


}
