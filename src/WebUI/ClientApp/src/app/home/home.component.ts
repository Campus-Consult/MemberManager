import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizeService } from 'src/api-authorization/authorize.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public isAuthenticated: Observable<boolean>;
  public userName: Observable<string>;

  constructor(private authorizeService: AuthorizeService) {}

  ngOnInit() {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.userName = this.authorizeService
      .getUser()
      .pipe(map((u) => u && u.name));
  }
}
