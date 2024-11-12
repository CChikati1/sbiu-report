import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiCallService } from 'src/app/api-call.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  loginUserName: string = "Test@test.com";
  DisplayName: string = "";
  title: string = "";
  subtitle: string = "";
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

  private handleMediaChange(mediaChange: MediaChange): void {
    if (this.media.isActive('lt-md')) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }

  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
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

  navigate (title: string, subtitle: string, path: string){
    this.title = title;
    this.subtitle = subtitle;
    this.router.navigate([path]);
  }
}
