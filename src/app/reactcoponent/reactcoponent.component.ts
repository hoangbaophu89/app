import {
  Component,
  AfterViewInit,
} from '@angular/core';
import { ReactLoaderService } from '../../services/react-loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-react-wrapper',
  standalone: true,
  imports: [CommonModule],
  template: `<div id="react-component"></div>`,
})
export class ReactcomponentComponent implements AfterViewInit {
  constructor(private reactLoader: ReactLoaderService) {}

  async ngAfterViewInit() {
    const module = await this.reactLoader.loadComponent('tcai', './AnalayseDocument');
    // @ts-ignore
    const ReactComponent = module.default || module;

    const rootElement = document.getElementById('react-component');
    if (rootElement) {
      // Ensure React and ReactDOM are loaded from libapp
      const React = await this.reactLoader.loadComponent('libapp', './react');
      const ReactDOM = await this.reactLoader.loadComponent('libapp', './react-dom');
      const fluentv9 = await this.reactLoader.loadComponent('libapp', './fluentv9');
      
      if (React && ReactDOM) {
        ReactDOM.render(
          React.createElement(React.Suspense, { fallback: 'Loading...' }, React.createElement(ReactComponent)),
          rootElement
        );
      } else {
        console.error('React or ReactDOM is not available from libapp');
      }
    }
  }
}
