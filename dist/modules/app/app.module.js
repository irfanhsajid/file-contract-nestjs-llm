"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const path_1 = require("path");
const default_1 = require("@apollo/server/plugin/landingPage/default");
const mongoose_1 = require("@nestjs/mongoose");
const mongooseFactory_1 = require("../../utils/mongooseFactory");
const patients_resolver_1 = require("../../patients/patients.resolver");
const patients_service_1 = require("../../patients/patients.service");
const file_contract_module_1 = require("../file-contracts/file-contract.module");
const health_controller_1 = require("./health.controller");
const clinvault_module_1 = require("../clinvault/clinvault.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                typePaths: ['./**/*.graphql'],
                definitions: {
                    path: (0, path_1.join)(process.cwd(), 'src/graphql.schema.ts'),
                    outputAs: 'class',
                },
                playground: false,
                introspection: true,
                plugins: [(0, default_1.ApolloServerPluginLandingPageLocalDefault)()],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: mongooseFactory_1.mongooseFactory,
            }),
            file_contract_module_1.FileContractModule,
            clinvault_module_1.ClinvaultModule,
        ],
        controllers: [health_controller_1.HealthController],
        providers: [patients_resolver_1.PatientsResolver, patients_service_1.PatientsService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map