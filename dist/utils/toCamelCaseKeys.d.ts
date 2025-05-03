interface SimpleObject {
    [key: string]: string | number | boolean | null | undefined | SimpleObject | SimpleObject[];
}
export declare const toCamelCaseKeys: <T extends SimpleObject>(input: T) => Record<string, unknown>;
export {};
