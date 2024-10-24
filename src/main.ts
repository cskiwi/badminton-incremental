import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { App } from './app.component';

bootstrapApplication(App, {
  providers: [
    provideAnimations()
  ]
});