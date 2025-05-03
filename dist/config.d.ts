declare const _default: {
    port: number;
    mongo: {
        host: string | undefined;
        port: string | undefined;
        db: string;
    };
    graphqlUploadExpress: {
        maxFileSize: number;
        maxFiles: number;
    };
    okta: {
        clientId: string;
        secret: string;
        issuer: string;
        scopes: string[];
    };
};
export default _default;
