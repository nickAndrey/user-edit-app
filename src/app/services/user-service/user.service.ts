import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) {
  }

  public getUserData() {
    return this.db.collection('users').get();
  }

  public addUser(data: object) {
    return this.db.collection('users').add(data);
  }

  public removeUserData(id: string) {
    return this.db.collection('users').doc(id).delete();
  }

  public updateUserData(id: string, data: object) {
    return this.db.collection('users').doc(id).update(data);
  }
}
