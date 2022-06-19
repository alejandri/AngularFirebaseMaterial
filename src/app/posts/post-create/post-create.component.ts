import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Post } from 'src/app/_interfaces/post';
import { FirebaseService } from 'src/app/_services/firebase.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  @Output() onChange = new EventEmitter<any>();

  registro: Post = new Post;
  submitted = false;

  createForm: FormGroup | any;
  form: any = {
    id: null,
    codigo: null,
    descripcion: null,
    fecha: null
  };
  errorMessage = '';

  collection_name:string = 'registros';
  itemCreated:boolean = false;

  constructor(private firebaseService: FirebaseService) { 
    this.createForm = new FormGroup({
      
      id: new FormControl('', [Validators.required]),
      codigo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      fecha: new FormControl('', [Validators.required]),
      collection_name: new FormControl('registros', [Validators.required]),
    });

  }

  ngOnInit(): void {
  }


  onSubmit(): void {
    const { codigo, descripcion } = this.createForm.value;
    console.log("Item created!", this.createForm.value);
    console.log("this.createForm.value.collection_name", this.createForm.value.collection_name);
    this.itemCreated = true;
      this.firebaseService.create(this.createForm.value.collection_name, this.createForm.value).then(() => {
        this.submitted = true;
        if(this.submitted = true){
          console.log('Created new item successfully!');
          this.onChange.emit(1);
          this.createForm.value = ''
        }else{
          this.createForm.value = ''
        }
      });
  }

}
