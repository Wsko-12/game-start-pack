import App from './app/App';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).devMode = true;
const ROOT = new App();
ROOT.start();
