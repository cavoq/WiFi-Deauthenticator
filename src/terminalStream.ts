import { BrowserWindow } from "electron";
import { ChildProcess } from 'child_process';
import fs from 'fs';


class StreamHandler {
    public static mainWindow: BrowserWindow;
    public static outputFile = fs.openSync('output.log', 'a');

    public static initialize(window: BrowserWindow) {
        StreamHandler.mainWindow = window;
    }

    public static process(process: ChildProcess) {
        process.stdout?.on('data', () => {
            StreamHandler.send(this.outputFile.toString());
        });
        process.on('exit', () => {
            console.log("Exited");
        });
    }

    public static send(data: string) {
        StreamHandler.mainWindow.webContents.send('terminal-stream', data);
    }
}

export default StreamHandler;