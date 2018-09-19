import 'reflect-metadata';

let booted = false;
function bootstrap() {
  if (booted) return;
  booted = true;
  import('./components/my-app');
}
window.addEventListener('WebComponentsReady', bootstrap);

document.createElement = Document.prototype.createElement;
