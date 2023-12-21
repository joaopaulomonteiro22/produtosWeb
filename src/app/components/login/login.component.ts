import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { enviroment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  mensagemErro: String ='';
    constructor(
      private httpClient:HttpClient


    ){}


  form = new FormGroup ({
    email: new FormControl('',[Validators.required,Validators.email]),
    senha : new FormControl('',[Validators.required,Validators.minLength(8)])

  })
  get f (){
    return this.form.controls;

  }
  submit (): void {
    this.httpClient.post(enviroment.apiUsuarios + "/usuarios/autenticar", this.form.value).subscribe({
      next:(data:any) => {
      console.log(data);
      localStorage.setItem('auth-user',JSON.stringify(data));
      location.href ='/app/produto-consulta';
      
        
      },
      error:(e) => {
        this.mensagemErro =e.error.errors[0];
      }



    })
  }


}
