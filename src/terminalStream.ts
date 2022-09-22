import { BrowserWindow } from "electron";
import { ChildProcess } from 'child_process';


class StreamHandler {
    public static mainWindow: BrowserWindow;

    public static initialize(window: BrowserWindow) {
        StreamHandler.mainWindow = window;
    }

    public static process(process: ChildProcess) {
        process.stdout?.on('data', (data: Buffer) => {
            StreamHandler.send(data);
        });
    }

    public static send(data: Buffer) {
        StreamHandler.mainWindow.webContents.send('terminal-stream', data);
    }
}

export default StreamHandler;