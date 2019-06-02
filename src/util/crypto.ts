import crypto from "crypto";
import config from "../configuration";

class Crypto {
    private algorithm: string = config.crypto.algorithm;

    public encrypt(str: string, password: string) {
        const cipher = crypto.createCipher(this.algorithm, password);
        let crypted = cipher.update(str, "utf8", "hex");
        crypted += cipher.final("hex");
        return crypted;
    }

    public decrypt(str: string, password: string) {
        const decipher = crypto.createDecipher(this.algorithm, password);
        let dec = decipher.update(str, "hex", "utf8");
        dec += decipher.final("utf8");
        return dec;
    }

    public md5(str: string, password: string) {
        return crypto.createHash("md5").update(str + password).digest("hex");
    }

    public randomBytes() {
        return crypto.randomBytes(16).toString("hex");
    }

}

export default new Crypto();
