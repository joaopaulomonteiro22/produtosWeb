import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  
} from '@angular/forms';
import { enviroment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  mensagemSucesso: String ='';
  mensagemErro:String = '';
  erroSenha: string = '';

  //programando a estrutura do formulário
  //resgatar cada campo preenchido no formulário
  //metodo construtor
    constructor(private httpClient: HttpClient) {

    }
  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),

    email: new FormControl('', [Validators.required, Validators.email]),

    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),

    senhaConfirmacao: new FormControl('', [Validators.required]),
  });
  get f() {
    return this.form.controls;
  }
  submit() {
    this.erroSenha = '';
    this.mensagemSucesso = '';
    this.erroSenha= '';
    if (this.form.value.senha == this.form.value.senhaConfirmacao) {
    this.httpClient.post(enviroment.apiUsuarios +'/usuarios/criar', this.form.value).subscribe(
      { next: (data:any) => {
        this.mensagemSucesso = `parabéns ${data.nome},sua conta foi criada com sucesso.`

      },
      error: (e) =>
      {
      this.mensagemErro = e.error.errors[0];
      }


      }
    )
    } else {
      this.erroSenha = 'senha não confere por favor verifique'
    }
  }
}
