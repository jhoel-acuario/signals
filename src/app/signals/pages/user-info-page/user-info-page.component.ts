import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user-equest.interface';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {
 
  private userService= inject(UserService);
  public userId= signal(1);
  public currentUser = signal<User|undefined>(undefined);
  public userWasFound = signal(true);
  public fullName = computed<string>(()=>{
    if(!this.currentUser()) return 'Usuario no encontrado';

    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`
  })

  ngOnInit(): void {
    this.loadUser(this.userId())
    console.log('hola')
  }

  loadUser(id:number){
    if(id<=0) return;
    this.userId.set(id),
    this.userService.getUserById(id).subscribe(
      {
        next:(user)=>{
          this.currentUser.set(user);
          this.userWasFound.set(true);
        },
        error:()=>{
          this.userWasFound.set(false);
          this.currentUser.set(undefined)
        }
      }
    )

  }
}
