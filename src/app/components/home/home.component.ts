import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    // this.items = db.collection('items').valueChanges();
  }
}
