const device_values = require("../../../../SOCKET/schemas/device_values");
const device_data = require("../../../../SOCKET/schemas/device");


module.exports = (params,device, logging) => {
        device_data.model.findOne({IDENTIFIER: device}, (err, div) => {
                let data = {
                        UPDATED: Date.now().toLocaleString('en-US', {
                                timeZone: 'America/Mexico_City',
                        }),
                        deviceId: div._id,
                        CALL: params.toString(),
                        MAIN_AU: params[0],
                        MAIN_AB: params[1],
                        MAIN_AC: params[2],
                        MAIN_UAB: params[3],
                        MAIN_UBC: params[4],
                        MAIN_UCA: params[5],
                        MAIN_FREC: params[6],
                        GEN_UA: params[7],
                        GEN_UB: params[8],
                        GEN_UC: params[9],
                        GEN_UAB: params[10],
                        GEN_UBC: params[11],
                        GEN_UCA: params[12],
                        GEN_FREC: params[13],
                        A_PHACE_CURRENT: params[14],
                        B_PHACE_CURRENT: params[15],
                        C_PHACE_CURRENT: params[16],
                        WATER_TEMP: params[17],
                        OIL_PREASURE: params[19],
                        FUEL_LEVEL: params[21],
                        SPEED: params[23],
                        BATTERY_VOLTAGE: params[24],
                        ACTIVE_POWER: params[26],
                        REACTIVE_POWER: params[27],
                        APPARENT_POWER: params[28],
                        POWER_FACTOR: params[29],
                        CONTROLLER_RUNNING_STATUS: params[34],
                        AUTO_RUNNING_STATUS: params[36],
                        ATS_RUNNING_STATUS: params[38],
                        MAIN_STATUS: params[40],
                        OIL_ENGINE_RUN_ACCUM_MSB: params[42],
                        OIL_ENGINE_RUN_ACCUM_LSB: params[43],
                        OIL_ENGINE_RUN_ACCUM_MIN: params[44],
                        OIL_ENGINE_RUN_ACCUM_SEC: params[45],
                        ACCUM_START_TIMES_MSB: params[46],
                        ACCUM_START_TIMES_LSB: params[47],
                        ACCUM_ENERGY_MSB: params[48],
                        ACCUM_ENERGY_LSB: params[49],
                        A_PHACE_ACTIVE_POWER: params[52],
                        B_PHACE_ACTIVE_POWER: params[53],
                        C_PHACE_ACTIVE_POWER: params[54],
                        LOAD_OUTPUT_PERCENTAGE: params[55],
                        AIR_FUEL_RATIO: params[56],
                        THROTTLE_PERVENTAGE: params[57],
                        OIL_TEMP: params[59],
                        COOLANT_PRESSURE: params[60],
                        FUEL_PRESSURE: params[61],
                        FUEL_TEMP: params[62],
                        INLET_TEMP: params[63],
                        EXHAUST_TEMP: params[64],
                        TURBO_PRESSURE: params[65],
                        FUEL_CONSUMPTION: params[66],
                        INLET_PRESSURE: params[67],
                        CONTROLLER_MODEL: params[71]
                }
                let values = new device_values.model(data);
                try {
                        values.save().then(r => {
                                device_data.model.findOneAndUpdate({_id:div._id}, {DEVICE_VALUE:data} ,(err,result) => {
                                        //console.log(result);
                                });
                        });
                } catch (e) {
                        logging.warn(e);
                }

        })

}
