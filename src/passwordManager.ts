import fs from 'fs';
import { errorlog } from './logger';

class PasswordManager {

    private static PASSWORD_FILE = "access.key";

    public static safe(password: string) {
        try {
            fs.writeFileSync(PasswordManager.PASSWORD_FILE, password);
        } catch (err) {
            errorlog.error(`Could not write file ${err}`);
        }
    }

    public static get() {
        try {
            return fs.readFileSync(PasswordManager.PASSWORD_FILE, 'utf8');
        } catch (err) {
            errorlog.error(`Could not read file ${err}`);
        }
    }
}

export default PasswordManager;