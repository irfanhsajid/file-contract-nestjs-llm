export declare const getCorsConfig: () => {
    origin: string[];
    methods: string;
    credentials: boolean;
} | {
    origin: string;
    methods: string;
    credentials: boolean;
};
