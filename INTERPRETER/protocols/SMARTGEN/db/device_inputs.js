const device_inputs = require("../../../../schemas/device_inputs");
const device_data = require("../../../../schemas/device");


module.exports = (params, device, logging) => {
    device_data.model.findOne({IDENTIFIER: device}, (err, div) => {
        let data = {
            UPDATED: Date.now().toLocaleString('en-US', {
                timeZone: 'America/Mexico_City',
            }),
            deviceId: div._id,
            CALL: params.toString(),
            UPDATED: Date.now(),
            deviceId: div._id,
            CALL: params.toString(),
            MODE: {
                TEST_MODE: params[40],
                AUTO_MODE: params[41],
                MANUAL_MODE: params[42],
                STOP_MODE: params[43],
            },
            COMMON_ALARM: params[0],
            COMMON_WARNING_ALARM: params[1],
            COMMON_SHUTDOWN_ALARM: params[2],
            REMOTE_MODE: params[3],
            REMOTE_LOCK: params[4],
            MAIN_WITH_LOAD: params[6],
            GEN_WITH_LOAD: params[7],
            EMERGENCY_STOP: params[8],
            CRANK_FAILURE: params[17],
            SHUTDOWNS: {
                SPEED_SIGNAL_LOSS: params[11],
                OVER_FREQUENCY: params[12],
                UNDER_FREQUENCY: params[13],
                OVER_VOLTAGE: params[14],
                UNDER_VOLTAGE: params[15],
                GEN_OVER_CURRENT: params[16],
                HIGH_TEMPERATURE: params[18],
                LOW_OIL_PRESSURE: params[19],
                TEMP_SENSOR_OPEN: params[44],
                OIL_PRESSURE_SENSOR_OPEN: params[45],

            },
            ALARM_SHUTDOWN: {
                OVER_SPEED_ALARM: params[9],
                UNDER_SPEED_ALARM: params[10],
            },
            SHUTDOWN_ALARM: {
                MAINTENANCE_DUE: params[46],
                OVER_POWER: params[47],
                INPUT_PORT: params[21],
                LOW_FUEL_LEVEL: params[22],
                LOW_COOLANT_LEVEL: params[23],
            },
            ALARMS: {
                FREQUENCY_LOSS: params[20],
            },
            WARNS_ALARMS: {
                HIGH_WATER_TEMPERATURE: params[24],
                LOW_OIL_PRESSURE: params[25],
                GEN_OVER_CURRENT: params[26],
                BATTERY_VOLT_LOW: params[30],
                BATTERY_VOLT_HIGH: params[31],
                INPUT_PORT: params[32],
            },
            WARNS: {
                STOP_FAILURE: params[27],
                LOW_OIL_LEVEL: params[28],
                CHARGE_FAILURE: params[29],
                SPEED_SIGNAL_LOSS: params[33],
                LOW_COOLANT_LEVEL: params[34],
                TEMP_SENSOR_OPEN: params[35],
                OIL_PRESSURE_SENSOR_OPEN: params[36],
                MAINTENANCE_DUE: params[37],
                CHARGER_FAIL_TO_CHARGE: params[38],
                OVER_POWER: params[39],
                GEN_SWITCH_FAILURE: params[54],
                MAINS_SWITCH_FAILURE: params[55],
            },
            INPUT: {
                EMERGENCY_STOP: params[48],
                AUX1: params[49],
                AUX2: params[50],
                AUX3: params[51],
                AUX4: params[52],
                AUX5: params[53],
            },
            OUTPUT: {
                START_RELAY: params[56],
                FUEL_RELAY: params[57],
                AUX1: params[58],
                AUX2: params[59],
                AUX3: params[60],
                AUX4: params[61],
            },
            MAINS: {
                FAULT: params[64],
                NORMAL: params[65],
                OVER_VOLTAGE: params[66],
                UNDER_VOLTAGE: params[67],
                LOSS_OF_PHASE: params[68],
                BLACKOUT: params[69],
            },
            GEN: {
                NORMAL: params[72],
                OVER_VOLTAGE: params[73],
                UNDER_VOLTAGE: params[74],
                OVER_FREQUENCY: params[75],
                UNDER_FREQUENCY: params[76],
                OVER_CURRENT_WARN: params[77],
                IN_SCHEDULED_NOT_RUN: params[78],
            }

        }
        let values = new device_inputs.model(data);

        values.save().then(r => {
            device_data.model.findOneAndUpdate({_id: div._id}, {DEVICE_INPUT: data}, (err, result) => {
                //console.log(result);
            });
        });
    })

}
