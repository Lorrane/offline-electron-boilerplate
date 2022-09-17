const electron = window.require('electron');
const { ipcRenderer } = electron;

const buscaTudo = "select * from livro";

export function sendAsync(message) {
  return new Promise((resolve) => {
    ipcRenderer.once('asynchronous-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('asynchronous-message', message);
  });
}

export function buscaLivros(buscaTudo) {
  return new Promise((resolve) => {
    ipcRenderer.once('asynchronous-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('asynchronous-message', buscaTudo);
  });
}

export function sendTeste(message) {
  return new Promise((resolve) => {
    ipcRenderer.once('teste-reply', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('teste', message);
  });
}