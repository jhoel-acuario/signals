import { Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-equest.interface';
import { count } from 'rxjs';

@Component({
  selector: 'app-roperties-page',
  templateUrl: './roperties-page.component.html',
  styleUrls: ['./roperties-page.component.css'],
})
export class RopertiesPageComponent implements OnDestroy, OnInit {

  public user = signal({
    "id": 1,
    "email": "george.bluth@reqres.in",
    "first_name": "George",
    "last_name": "Bluth",
    "avatar": "https://reqres.in/img/faces/1-image.jpg"
  });

  public fullName =computed<string>(()=>{
    if(!this.user()) return 'Usuario no encontrado';

    return `${this.user()?.first_name} ${this.user()?.last_name}`
  });

  public userChangeEffec = effect(()=>{
    console.log(`userChange Trigger, ${this.user().first_name} - ${this.counter()}`)

  });
  public counter= signal(10)

  ngOnInit(): void {
    setInterval(()=>{
      this.counter.update(current=>current +1)
    },3000)
  }
  onField(field: keyof User, value: string) {
    //SET
    /* this.user.set({
      ...this.user(),
      [field]: value
    }) */
    // UPDATE
    /* this.user.update(current=>{
      ...current,
      [field]: value
    }) */
//MUTATE
    this.user.mutate(current=>{
      switch (field) {
        case 'email':
          current.email= value
          break;
        case 'first_name':
          current.first_name= value
          break;
        case 'last_name':
          current.last_name= value
          break;
          case 'id':
          current.id=Number(value) 
          break;
        default:
          break;
      }
    })
  }
  increaseBy(value: number){
    this.counter.update(current=> current + value)
  }
  ngOnDestroy(): void {
    
  }
}
