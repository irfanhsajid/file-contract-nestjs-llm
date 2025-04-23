import { Schema } from 'mongoose';
import { z } from 'zod';
export declare const BoundingBoxInputSchema: z.ZodObject<{
    top: z.ZodNumber;
    left: z.ZodNumber;
    width: z.ZodNumber;
    height: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    top: number;
    left: number;
    width: number;
    height: number;
}, {
    top: number;
    left: number;
    width: number;
    height: number;
}>;
export declare const CoordinatesSchema: z.ZodObject<{
    page: z.ZodNumber;
    boundingBox: z.ZodObject<{
        top: z.ZodNumber;
        left: z.ZodNumber;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        top: number;
        left: number;
        width: number;
        height: number;
    }, {
        top: number;
        left: number;
        width: number;
        height: number;
    }>;
}, "strip", z.ZodTypeAny, {
    page: number;
    boundingBox: {
        top: number;
        left: number;
        width: number;
        height: number;
    };
}, {
    page: number;
    boundingBox: {
        top: number;
        left: number;
        width: number;
        height: number;
    };
}>;
export declare const SourceSchema: z.ZodObject<{
    similarityScore: z.ZodNumber;
    chunkId: z.ZodString;
    chunkNumber: z.ZodNumber;
    text: z.ZodString;
    textS3Link: z.ZodString;
    pageNumber: z.ZodNumber;
    documentId: z.ZodNumber;
    documentCategory: z.ZodString;
    totalPage: z.ZodNumber;
    filename: z.ZodString;
    testType: z.ZodString;
    productType: z.ZodString;
    coordinates: z.ZodObject<{
        page: z.ZodNumber;
        boundingBox: z.ZodObject<{
            top: z.ZodNumber;
            left: z.ZodNumber;
            width: z.ZodNumber;
            height: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            top: number;
            left: number;
            width: number;
            height: number;
        }, {
            top: number;
            left: number;
            width: number;
            height: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        page: number;
        boundingBox: {
            top: number;
            left: number;
            width: number;
            height: number;
        };
    }, {
        page: number;
        boundingBox: {
            top: number;
            left: number;
            width: number;
            height: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    similarityScore: number;
    chunkId: string;
    chunkNumber: number;
    text: string;
    textS3Link: string;
    pageNumber: number;
    documentId: number;
    documentCategory: string;
    totalPage: number;
    filename: string;
    testType: string;
    productType: string;
    coordinates: {
        page: number;
        boundingBox: {
            top: number;
            left: number;
            width: number;
            height: number;
        };
    };
}, {
    similarityScore: number;
    chunkId: string;
    chunkNumber: number;
    text: string;
    textS3Link: string;
    pageNumber: number;
    documentId: number;
    documentCategory: string;
    totalPage: number;
    filename: string;
    testType: string;
    productType: string;
    coordinates: {
        page: number;
        boundingBox: {
            top: number;
            left: number;
            width: number;
            height: number;
        };
    };
}>;
export declare const ExtractionResultSchema: z.ZodObject<{
    _id: z.ZodOptional<z.ZodString>;
    category: z.ZodString;
    eventType: z.ZodString;
    eventDetail: z.ZodString;
    llmExtraction: z.ZodOptional<z.ZodString>;
    reasoning: z.ZodOptional<z.ZodString>;
    patientId: z.ZodNumber;
    eventId: z.ZodOptional<z.ZodString>;
    parserName: z.ZodOptional<z.ZodString>;
    codeLabel: z.ZodOptional<z.ZodString>;
    codeValue: z.ZodOptional<z.ZodString>;
    source: z.ZodObject<{
        similarityScore: z.ZodNumber;
        chunkId: z.ZodString;
        chunkNumber: z.ZodNumber;
        text: z.ZodString;
        textS3Link: z.ZodString;
        pageNumber: z.ZodNumber;
        documentId: z.ZodNumber;
        documentCategory: z.ZodString;
        totalPage: z.ZodNumber;
        filename: z.ZodString;
        testType: z.ZodString;
        productType: z.ZodString;
        coordinates: z.ZodObject<{
            page: z.ZodNumber;
            boundingBox: z.ZodObject<{
                top: z.ZodNumber;
                left: z.ZodNumber;
                width: z.ZodNumber;
                height: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                top: number;
                left: number;
                width: number;
                height: number;
            }, {
                top: number;
                left: number;
                width: number;
                height: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            page: number;
            boundingBox: {
                top: number;
                left: number;
                width: number;
                height: number;
            };
        }, {
            page: number;
            boundingBox: {
                top: number;
                left: number;
                width: number;
                height: number;
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        similarityScore: number;
        chunkId: string;
        chunkNumber: number;
        text: string;
        textS3Link: string;
        pageNumber: number;
        documentId: number;
        documentCategory: string;
        totalPage: number;
        filename: string;
        testType: string;
        productType: string;
        coordinates: {
            page: number;
            boundingBox: {
                top: number;
                left: number;
                width: number;
                height: number;
            };
        };
    }, {
        similarityScore: number;
        chunkId: string;
        chunkNumber: number;
        text: string;
        textS3Link: string;
        pageNumber: number;
        documentId: number;
        documentCategory: string;
        totalPage: number;
        filename: string;
        testType: string;
        productType: string;
        coordinates: {
            page: number;
            boundingBox: {
                top: number;
                left: number;
                width: number;
                height: number;
            };
        };
    }>;
}, "strip", z.ZodTypeAny, {
    category: string;
    eventType: string;
    eventDetail: string;
    patientId: number;
    source: {
        similarityScore: number;
        chunkId: string;
        chunkNumber: number;
        text: string;
        textS3Link: string;
        pageNumber: number;
        documentId: number;
        documentCategory: string;
        totalPage: number;
        filename: string;
        testType: string;
        productType: string;
        coordinates: {
            page: number;
            boundingBox: {
                top: number;
                left: number;
                width: number;
                height: number;
            };
        };
    };
    _id?: string | undefined;
    llmExtraction?: string | undefined;
    reasoning?: string | undefined;
    eventId?: string | undefined;
    parserName?: string | undefined;
    codeLabel?: string | undefined;
    codeValue?: string | undefined;
}, {
    category: string;
    eventType: string;
    eventDetail: string;
    patientId: number;
    source: {
        similarityScore: number;
        chunkId: string;
        chunkNumber: number;
        text: string;
        textS3Link: string;
        pageNumber: number;
        documentId: number;
        documentCategory: string;
        totalPage: number;
        filename: string;
        testType: string;
        productType: string;
        coordinates: {
            page: number;
            boundingBox: {
                top: number;
                left: number;
                width: number;
                height: number;
            };
        };
    };
    _id?: string | undefined;
    llmExtraction?: string | undefined;
    reasoning?: string | undefined;
    eventId?: string | undefined;
    parserName?: string | undefined;
    codeLabel?: string | undefined;
    codeValue?: string | undefined;
}>;
export declare const MetaDataSchema: z.ZodOptional<z.ZodObject<{
    patientId: z.ZodNumber;
    caseId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    casebundlingId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    casebundlingType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    extractionId: z.ZodString;
    genaiPipelineVersion: z.ZodString;
    totalExtractions: z.ZodNumber;
    extractionStatus: z.ZodEnum<["pending", "completed"]>;
    validationStatus: z.ZodEnum<["pending", "completed"]>;
}, "strip", z.ZodTypeAny, {
    patientId: number;
    extractionId: string;
    genaiPipelineVersion: string;
    totalExtractions: number;
    extractionStatus: "pending" | "completed";
    validationStatus: "pending" | "completed";
    caseId?: number | null | undefined;
    casebundlingId?: number | null | undefined;
    casebundlingType?: string | null | undefined;
}, {
    patientId: number;
    extractionId: string;
    genaiPipelineVersion: string;
    totalExtractions: number;
    extractionStatus: "pending" | "completed";
    validationStatus: "pending" | "completed";
    caseId?: number | null | undefined;
    casebundlingId?: number | null | undefined;
    casebundlingType?: string | null | undefined;
}>>;
export declare const zFileContractSchema: z.ZodObject<{
    schemaVersion: z.ZodString;
    metadata: z.ZodOptional<z.ZodObject<{
        patientId: z.ZodNumber;
        caseId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        casebundlingId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        casebundlingType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        extractionId: z.ZodString;
        genaiPipelineVersion: z.ZodString;
        totalExtractions: z.ZodNumber;
        extractionStatus: z.ZodEnum<["pending", "completed"]>;
        validationStatus: z.ZodEnum<["pending", "completed"]>;
    }, "strip", z.ZodTypeAny, {
        patientId: number;
        extractionId: string;
        genaiPipelineVersion: string;
        totalExtractions: number;
        extractionStatus: "pending" | "completed";
        validationStatus: "pending" | "completed";
        caseId?: number | null | undefined;
        casebundlingId?: number | null | undefined;
        casebundlingType?: string | null | undefined;
    }, {
        patientId: number;
        extractionId: string;
        genaiPipelineVersion: string;
        totalExtractions: number;
        extractionStatus: "pending" | "completed";
        validationStatus: "pending" | "completed";
        caseId?: number | null | undefined;
        casebundlingId?: number | null | undefined;
        casebundlingType?: string | null | undefined;
    }>>;
    extractionResults: z.ZodArray<z.ZodObject<{
        _id: z.ZodOptional<z.ZodString>;
        category: z.ZodString;
        eventType: z.ZodString;
        eventDetail: z.ZodString;
        llmExtraction: z.ZodOptional<z.ZodString>;
        reasoning: z.ZodOptional<z.ZodString>;
        patientId: z.ZodNumber;
        eventId: z.ZodOptional<z.ZodString>;
        parserName: z.ZodOptional<z.ZodString>;
        codeLabel: z.ZodOptional<z.ZodString>;
        codeValue: z.ZodOptional<z.ZodString>;
        source: z.ZodObject<{
            similarityScore: z.ZodNumber;
            chunkId: z.ZodString;
            chunkNumber: z.ZodNumber;
            text: z.ZodString;
            textS3Link: z.ZodString;
            pageNumber: z.ZodNumber;
            documentId: z.ZodNumber;
            documentCategory: z.ZodString;
            totalPage: z.ZodNumber;
            filename: z.ZodString;
            testType: z.ZodString;
            productType: z.ZodString;
            coordinates: z.ZodObject<{
                page: z.ZodNumber;
                boundingBox: z.ZodObject<{
                    top: z.ZodNumber;
                    left: z.ZodNumber;
                    width: z.ZodNumber;
                    height: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    top: number;
                    left: number;
                    width: number;
                    height: number;
                }, {
                    top: number;
                    left: number;
                    width: number;
                    height: number;
                }>;
            }, "strip", z.ZodTypeAny, {
                page: number;
                boundingBox: {
                    top: number;
                    left: number;
                    width: number;
                    height: number;
                };
            }, {
                page: number;
                boundingBox: {
                    top: number;
                    left: number;
                    width: number;
                    height: number;
                };
            }>;
        }, "strip", z.ZodTypeAny, {
            similarityScore: number;
            chunkId: string;
            chunkNumber: number;
            text: string;
            textS3Link: string;
            pageNumber: number;
            documentId: number;
            documentCategory: string;
            totalPage: number;
            filename: string;
            testType: string;
            productType: string;
            coordinates: {
                page: number;
                boundingBox: {
                    top: number;
                    left: number;
                    width: number;
                    height: number;
                };
            };
        }, {
            similarityScore: number;
            chunkId: string;
            chunkNumber: number;
            text: string;
            textS3Link: string;
            pageNumber: number;
            documentId: number;
            documentCategory: string;
            totalPage: number;
            filename: string;
            testType: string;
            productType: string;
            coordinates: {
                page: number;
                boundingBox: {
                    top: number;
                    left: number;
                    width: number;
                    height: number;
                };
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        category: string;
        eventType: string;
        eventDetail: string;
        patientId: number;
        source: {
            similarityScore: number;
            chunkId: string;
            chunkNumber: number;
            text: string;
            textS3Link: string;
            pageNumber: number;
            documentId: number;
            documentCategory: string;
            totalPage: number;
            filename: string;
            testType: string;
            productType: string;
            coordinates: {
                page: number;
                boundingBox: {
                    top: number;
                    left: number;
                    width: number;
                    height: number;
                };
            };
        };
        _id?: string | undefined;
        llmExtraction?: string | undefined;
        reasoning?: string | undefined;
        eventId?: string | undefined;
        parserName?: string | undefined;
        codeLabel?: string | undefined;
        codeValue?: string | undefined;
    }, {
        category: string;
        eventType: string;
        eventDetail: string;
        patientId: number;
        source: {
            similarityScore: number;
            chunkId: string;
            chunkNumber: number;
            text: string;
            textS3Link: string;
            pageNumber: number;
            documentId: number;
            documentCategory: string;
            totalPage: number;
            filename: string;
            testType: string;
            productType: string;
            coordinates: {
                page: number;
                boundingBox: {
                    top: number;
                    left: number;
                    width: number;
                    height: number;
                };
            };
        };
        _id?: string | undefined;
        llmExtraction?: string | undefined;
        reasoning?: string | undefined;
        eventId?: string | undefined;
        parserName?: string | undefined;
        codeLabel?: string | undefined;
        codeValue?: string | undefined;
    }>, "many">;
    createdAt: z.ZodEffects<z.ZodString, string, string>;
    updatedAt: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    schemaVersion: string;
    extractionResults: {
        category: string;
        eventType: string;
        eventDetail: string;
        patientId: number;
        source: {
            similarityScore: number;
            chunkId: string;
            chunkNumber: number;
            text: string;
            textS3Link: string;
            pageNumber: number;
            documentId: number;
            documentCategory: string;
            totalPage: number;
            filename: string;
            testType: string;
            productType: string;
            coordinates: {
                page: number;
                boundingBox: {
                    top: number;
                    left: number;
                    width: number;
                    height: number;
                };
            };
        };
        _id?: string | undefined;
        llmExtraction?: string | undefined;
        reasoning?: string | undefined;
        eventId?: string | undefined;
        parserName?: string | undefined;
        codeLabel?: string | undefined;
        codeValue?: string | undefined;
    }[];
    createdAt: string;
    updatedAt: string;
    metadata?: {
        patientId: number;
        extractionId: string;
        genaiPipelineVersion: string;
        totalExtractions: number;
        extractionStatus: "pending" | "completed";
        validationStatus: "pending" | "completed";
        caseId?: number | null | undefined;
        casebundlingId?: number | null | undefined;
        casebundlingType?: string | null | undefined;
    } | undefined;
}, {
    schemaVersion: string;
    extractionResults: {
        category: string;
        eventType: string;
        eventDetail: string;
        patientId: number;
        source: {
            similarityScore: number;
            chunkId: string;
            chunkNumber: number;
            text: string;
            textS3Link: string;
            pageNumber: number;
            documentId: number;
            documentCategory: string;
            totalPage: number;
            filename: string;
            testType: string;
            productType: string;
            coordinates: {
                page: number;
                boundingBox: {
                    top: number;
                    left: number;
                    width: number;
                    height: number;
                };
            };
        };
        _id?: string | undefined;
        llmExtraction?: string | undefined;
        reasoning?: string | undefined;
        eventId?: string | undefined;
        parserName?: string | undefined;
        codeLabel?: string | undefined;
        codeValue?: string | undefined;
    }[];
    createdAt: string;
    updatedAt: string;
    metadata?: {
        patientId: number;
        extractionId: string;
        genaiPipelineVersion: string;
        totalExtractions: number;
        extractionStatus: "pending" | "completed";
        validationStatus: "pending" | "completed";
        caseId?: number | null | undefined;
        casebundlingId?: number | null | undefined;
        casebundlingType?: string | null | undefined;
    } | undefined;
}>;
export declare const FileContractSchema: Schema;
export declare const FileContractToken = "FileContract";
export type TFileContract = z.infer<typeof zFileContractSchema>;
