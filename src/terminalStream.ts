import { BrowserWindow } from "electron";
import { ChildProcess } from 'child_process';
import fs from 'fs';

class StreamHandler {
    public static mainWindow: BrowserWindow;

    public static initialize(window: BrowserWindow) {
        StreamHandler.mainWindow = window;
    }

    public static async process(process: ChildProcess, filePath: string) {
        process.stdout?.on('data', () => {
            if (!fs.existsSync(filePath)) {
                return;
            }
            const content = fs.readFileSync(filePath, "utf-8");
            StreamHandler.send(content);
        });
    }

    public static send(data: string) {
        StreamHandler.mainWindow.webContents.send('terminal-stream', data);
    }
}

export default StreamHandler;