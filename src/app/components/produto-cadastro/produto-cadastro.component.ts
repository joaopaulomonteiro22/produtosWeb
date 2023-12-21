import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { enviroment } from '../../../environments/environment';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto-cadastro',
  standalone: true,
    imports:[CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './produto-cadastro.component.html',
  styleUrl: './produto-cadastro.component.css'
})
export class ProdutoCadastroComponent implements OnInit {

  categorias: any[] = [];
  fornecedores: any[] = [];
  mensagemSucesso: string = '';
  mensagemErro: string = '';
  constructor(
    private httpclient: HttpClient


  ){}
  form = new FormGroup({
    nome :new FormControl(''),
    preco : new FormControl(''),
    quantidade : new FormControl(''),
    idFornecedor : new FormControl(''),
    idCategoria : new FormControl(''),

     
  });
  ngOnInit(): void {
    this.httpclient.get(enviroment.apiProdutos+ "/categorias").subscribe({
        next:(data) =>{
          this.categorias = data as any[];


        }
    });
    this.httpclient.get(enviroment.apiProdutos+ "/fornecedores").subscribe({
      next: (data)=> {
        this.fornecedores = data as any[];
      }
    });
  


  }
  submit(){
    this.mensagemSucesso ='';
    this.mensagemErro = '';
    this.httpclient.post(enviroment.apiProdutos + "/produtos", this.form.value).subscribe({
      next: (data:any) => {
        `produto ${data.nome},cadastrado com sucesso.`;
        this.form.reset();

      },
      error: (e) => {
        this.mensagemErro = `erro ao cadastrar o produto.`;
      }

    })
  }


}
