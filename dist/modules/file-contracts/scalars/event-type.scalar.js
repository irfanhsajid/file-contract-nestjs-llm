"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTypeScalar = exports.allowedEventTypes = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
exports.allowedEventTypes = [
    'Demographic Data',
    'Cancer Diagnosis',
    'Tumor Metastasis',
    'Group Stage',
    'TNM Stage',
    'Surgery',
    'Cancer Medication',
    'Radiation',
    'Other Procedure',
    'Tumor Response to Therapy',
    'Cancer Outcome',
    'Death',
    'Biomarker',
    'Clinical Follow-Up',
];
let EventTypeScalar = class EventTypeScalar {
    constructor() {
        this.description = `
  Allowed event types: ${exports.allowedEventTypes.join(' - ')}
  `;
    }
    parseValue(value) {
        if (!exports.allowedEventTypes.includes(value)) {
            throw new Error(`Invalid eventType: ${value}`);
        }
        return value;
    }
    serialize(value) {
        return value;
    }
    parseLiteral(ast) {
        if (ast.kind === graphql_2.Kind.STRING && exports.allowedEventTypes.includes(ast.value)) {
            return ast.value;
        }
        throw new Error(`Invalid eventType literal: ${ast.value}`);
    }
};
exports.EventTypeScalar = EventTypeScalar;
exports.EventTypeScalar = EventTypeScalar = __decorate([
    (0, graphql_1.Scalar)('EventTypeScalar')
], EventTypeScalar);
//# sourceMappingURL=event-type.scalar.js.map