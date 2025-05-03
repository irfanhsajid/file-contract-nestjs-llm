"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinvaultModule = void 0;
const common_1 = require("@nestjs/common");
const clinvault_service_1 = require("./clinvault.service");
const org_auth_service_1 = require("./org-auth.service");
const http_module_1 = require("@nestjs/axios/dist/http.module");
let ClinvaultModule = class ClinvaultModule {
};
exports.ClinvaultModule = ClinvaultModule;
exports.ClinvaultModule = ClinvaultModule = __decorate([
    (0, common_1.Module)({
        imports: [
            http_module_1.HttpModule.register({
                timeout: 15000,
                maxRedirects: 2,
            }),
        ],
        providers: [clinvault_service_1.ClinvaultService, org_auth_service_1.OrgAuthService],
    })
], ClinvaultModule);
//# sourceMappingURL=clinvault.module.js.map