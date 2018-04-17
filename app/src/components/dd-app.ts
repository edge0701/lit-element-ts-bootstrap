import {
  LitElement,
  html,
  TemplateResult
} from './lit-element';

import {
  customElement,
  property
} from '../decorators/webcomponent';

@customElement('dd-app')
class DDApp extends LitElement {

  @property()
  private lol:string = 'lolface';

  render({lol}): TemplateResult {
    return html`
    <div id="lol">${lol}</div>
    <button lolValue="mcnuggets" on-click="${(e) => { this.buttonClick(e) }}">Click Me</button>
    `;
  }

  ready() {
    console.log('ready');
  }

  buttonClick(e: Event) {
    console.log('click!', e);
    const t:HTMLElement = <HTMLElement>e.target;
    console.log(t.getAttribute('lolValue'));
    console.log(t.innerText);
    //console.log(this.$.lol.innerHtml);
  }
}