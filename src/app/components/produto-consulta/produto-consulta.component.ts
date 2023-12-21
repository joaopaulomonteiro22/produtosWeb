import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { enviroment } from '../../../environments/environment';

@Component({
  selector: 'app-produto-consulta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produto-consulta.component.html',
  styleUrl: './produto-consulta.component.css'
})
export class ProdutoConsultaComponent implements OnInit {
  produtos: any[] =[];
  constructor(private httpclient:HttpClient){



  }

  ngOnInit(): void {
    this.httpclient.get(enviroment.apiProdutos+ "/produtos").subscribe({
      next: (data) => { 
        this.produtos = data as any[];

      
  },
  error: (e) => {
   console.log (e);

  }

    })
    
  }

}
