import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav/drawer';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/_interfaces/post';
import { FirebaseService } from 'src/app/_services/firebase.service';

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
  currentIndex = -1;
  title = '';

  constructor(
    private firebaseService: FirebaseService) { }
 
  ngOnInit(): void {
    this.retrieveRegistros();
  }

  onOpenedChange(e: boolean){
     console.log('onOpenedChange',e);
  }

  closePanel(e:any){
    console.log('this.drawer.toggle',e);
    this.drawer.close();
  }

  retrieveRegistros(): void {
    this.firebaseService.getAll().snapshotChanges().pipe(
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
    this.currentIndex = index;
  }

}