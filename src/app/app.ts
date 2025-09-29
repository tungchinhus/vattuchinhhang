import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { GlobalLoadingComponent } from './components/global-loading/global-loading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, GlobalLoadingComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Vật Tư Chính Hãng';
}
