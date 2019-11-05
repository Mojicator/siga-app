import mongoose from "mongoose";

export default class MongoDB {
    public url: string;

    constructor(url: string) {
        this.url = url;
    }

    static init(url: string) {
        return new MongoDB(url);
    }

    mongoSetup(callback: (err: any) => void): void {
        mongoose.set("useNewUrlParser", true);
        mongoose.set("useFindAndModify", false);
        mongoose.set("useCreateIndex", true);
        mongoose.set("useUnifiedTopology", true);
        mongoose.connect(this.url, callback);
    }
}