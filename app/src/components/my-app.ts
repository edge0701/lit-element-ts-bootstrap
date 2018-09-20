import { customElement, html, LitElement } from '@polymer/lit-element';

@customElement('my-app' as any)
class MyApp extends LitElement {
  public render() {
    return html`Hello, world!`;
  }
}
