import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReactLoaderService {
  private loadExtensionJson(): Promise<void> {
    return fetch('https://oneportal.blob.core.windows.net/extension/extension.json')
      .then(response => response.json())
      .then(json => {
        // @ts-ignore
        window['oneportalextension'] = json;
      });
  }

  private loadScript(src: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve();
      };
      script.onerror = () => {
        reject(`Failed to load script ${src}`);
      };
      document.body.appendChild(script);
    });
  }

  private async loadRemoteEntries(): Promise<void> {
    await this.loadScript('https://oneportal-ehckg7axe3dacxhw.a01.azurefd.net/libapp/remoteEntry.js?v=122');
    await this.loadScript('https://oneportal-ehckg7axe3dacxhw.a01.azurefd.net/tcai/remoteEntry.js?v=122');
  }

  async loadReactComponent(): Promise<void> {
    await this.loadExtensionJson();
    await this.loadRemoteEntries();
  }

  async loadComponent(scope: string, module: string): Promise<any> {
    await this.loadReactComponent();
    // @ts-ignore
    await __webpack_init_sharing__('default');
    // @ts-ignore
    const container = window[scope];
    // @ts-ignore
    await container.init(__webpack_share_scopes__.default);
    // @ts-ignore
    const factory = await container.get(module);
    const Module = factory();
    return Module;
  }
}
