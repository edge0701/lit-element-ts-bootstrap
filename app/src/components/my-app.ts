import { html, LitElement } from '@polymer/lit-element';

import { customElement } from '../decorators/webcomponent';

@customElement('my-app')
class NaApp extends LitElement {
  public render() {
    return html`Hello, world!`;
  }
}
