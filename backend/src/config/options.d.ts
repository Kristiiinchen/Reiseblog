export type Options = {
    express: {
        port: number;
        host: string;
    };
    mongo: {
        port: number;
        host: string;
        user: string;
        password: string;
        db: string;
    };
};
