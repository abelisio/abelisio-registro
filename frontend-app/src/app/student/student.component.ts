import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {
  StudentArray : any[] = [];
 
  
  nome: string ="";
  pais: string ="";
  tel: Number =0;
 
  currentStudentID = "";
  isResultLoaded: boolean | undefined;
constructor(private http: HttpClient )
  {
    this.getAllStudent();
 
  }
  getAllStudent()
  {
    
    this.http.get("http://127.0.0.1:8000/api/student")
  
    .subscribe((resultData: any)=>
    {
        this.isResultLoaded = true;
        console.log(resultData);
        this.StudentArray = resultData;
    });  }
 
  register()
  {
  
    let bodyData = {
      "nome" : this.nome,
      "pais" : this.pais,
      "tel" : this.tel
    };
 
    this.http.post("http://127.0.0.1:8000/api/student",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Cadastrado realizado com Sucesso!");
        this.getAllStudent();
        this.nome = '';
        this.pais = '';
        this.tel  = 0;
    });
  }
  setUpdate(data: any)
  {
   this.nome = data.nome;
   this.pais = data.pais;
   this.tel = data.tel;
   this.currentStudentID = data.id;
  }
 
  UpdateRecords()
  {
    let bodyData = {
      "id" : this.currentStudentID,
      "nome" : this.nome,
      "pais" : this.pais,
      "tel" : this.tel,
  
    };
    
    this.http.put("http://127.0.0.1:8000/api/student"+ "/"+ this.currentStudentID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Registro atualizado com Sucesso!")
        this.getAllStudent();
      
    });
  }
 
  save()
  {
    if(this.currentStudentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
 
  }
 
  setDelete(data: any)
  {
    
    
    this.http.delete("http://127.0.0.1:8000/api/student"+ "/"+ data.id,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Cadastro Excluido com Sucesso!")
        this.getAllStudent();
        this.nome = '';
        this.pais = '';
        this.tel  = 0;
  
    });
 
  }
}
