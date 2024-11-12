import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/api-call.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  loginUserName: string = "Test@test.com";
  DisplayName: string = "";
  public opened = true;
  private mediaWatcher: Subscription;
  
  

  constructor(
    private media: MediaObserver,
    private router: Router,
    private apiservice: ApiCallService
    ) {
    this.mediaWatcher = this.media.asObservable().pipe(
      filter((changes: MediaChange[]) => changes.length > 0),
      map((changes: MediaChange[]) => changes[0])
      )
      .subscribe((mediaChange: MediaChange) => {
        this.handleMediaChange(mediaChange);
      });
  }


  ngOnInit(): void {
    this.getCurrentUser(); 
}

navigate(path: string){
  this.router.navigate([path]);
}

  private handleMediaChange(mediaChange: MediaChange): void {
    if (this.media.isActive('lt-md')) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

  async getCurrentUser(){
    this.apiservice.getUserName().subscribe((res) => {
      if (res != null && res !== '') {
        const user = res as any;
        this.loginUserName = user.d.Email;
        this.DisplayName = user.d.Title;   
      }
    });
  }
}
