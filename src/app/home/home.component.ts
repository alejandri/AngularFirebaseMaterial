import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav/drawer';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/_interfaces/post';
import { FirebaseService } from 'src/app/_services/firebase.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  content?: any;
  showFiller = false;
  registros?: Post[];
  currentPost?: Post;
  currentIndex = 1;
  title = '';

  incubadoras:any = [
    {
      codigo: 'INC1', descripcion: 'Incubadora 1'
    },
    {
      codigo: 'INC2', descripcion: 'Incubadora 2'
    },
    {
      codigo: 'INC3', descripcion: 'Incubadora 3'
    },
  ]

  currentUser: any;
  constructor(
    private firebaseService: FirebaseService,
    private token: TokenStorageService,
    private router:Router) {
      
     }
 
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser)
    if(!this.currentUser.user){
      this.token.signOut();
      this.router.navigate(['/login']).then( (e) => {
        if (e) {
          window.location.reload();
        } 
      }); 
    }

    this.retrieveRegistros(1);
  }

  onOpenedChange(e: boolean){
     console.log('onOpenedChange',e);
  }

  closePanel(e:any){
    console.log('this.drawer.toggle',e);
    this.drawer.close();
  }

  retrieveRegistros(idIncub:number): void {
    this.firebaseService.getIncubadora(idIncub).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.registros = data;
    });
  }

  setActiveTutorial(registro: Post, index: number): void {
    this.currentPost = registro;
    this.currentIndex = index + 1 ;
    this.retrieveRegistros(this.currentIndex);
  }

}