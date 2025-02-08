import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isLogin: boolean = false;
  router=inject(Router);
  _authService = inject(AuthService);
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._authService.userdata.subscribe(() => {
      if(this._authService.userdata.getValue()!=null) {
        this.isLogin = true;
      }else{
        this.isLogin = false;
      }
    })
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this._authService.userdata.next(null);
    
  }
}
 