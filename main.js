const { app, BrowserWindow,Tray,Menu} = require('electron');
require('@electron/remote/main').initialize(); // Initialize @electron/remote

let mainWindow;
let tray
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Enable @electron/remote for the mainWindow
  require('@electron/remote/main').enable(mainWindow.webContents);

  mainWindow.maximize();
  mainWindow.show();
  mainWindow.loadFile('index.html');
//   mainWindow.on('close', (event) => {
//     // Prevent the window from closing and hide it instead
//     //event.preventDefault();
//     mainWindow.hide();
// });
//   tray = new Tray("images/home.png"); // Ensure you have a suitable icon.png
//     const contextMenu = Menu.buildFromTemplate([
//         {
//             label: 'Show App', click: () => {
//                 mainWindow.show();
//             }
//         },
//         {
//             label: 'Quit', click: () => {
//               console.log("iuehuiwehuiwehfiufiwbfbkjsfbskhfkshfuishfiudfishfiuehfhweifwfb")
              
//                 app.quit();
//             }
//         }
//     ]);
    
//     tray.setContextMenu(contextMenu);
//     tray.setToolTip('My Electron App');
});

app.setAsDefaultProtocolClient("Mailit");

app.on('open-url', function(event,data){
  console.log(data);
});