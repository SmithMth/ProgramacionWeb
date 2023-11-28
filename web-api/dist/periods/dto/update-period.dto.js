"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePeriodDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_period_dto_1 = require("./create-period.dto");
class UpdatePeriodDto extends (0, mapped_types_1.PartialType)(create_period_dto_1.CreatePeriodDto) {
}
exports.UpdatePeriodDto = UpdatePeriodDto;
//# sourceMappingURL=update-period.dto.js.map