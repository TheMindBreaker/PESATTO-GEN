const db = require("../../../dbcon");
function addValues(params,device, logging) {
    const deviceId = 1;
    logging.warn("DB ADD : ",device)
    db.query("INSERT INTO pesatto_gen.device_values(" +
        "deviceId, " +
        "timeStamp, " +
        "MAIN_AU, MAIN_AB, MAIN_AC, " +
        "MAIN_UAB, MAIN_UBC, MAIN_UCA," +
        " MAIN_FREC, " +
        "GEN_UA, GEN_UB, GEN_UC, " +
        "GEN_UAB, GEN_UBC, GEN_UCA, " +
        "GEN_FREC, " +
        "A_PHACE_CURRENT, B_PHACE_CURRENT, C_PHACE_CURRENT, " +
        "WATER_TEMP, OIL_PREASURE, FUEL_LEVEL, SPEED, BATTERY_VOLTAGE, " +
        "ACTIVE_POWER, REACTIVE_POWER, APPARENT_POWER, POWER_FACTOR, " +
        "CONTROLLER_RUNNING_STATUS, AUTO_RUNNING_STATUS, ATS_RUNNING_STATUS, MAIN_STATUS, " +
        "OIL_ENGINE_RUN_ACCUM_MSB, OIL_ENGINE_RUN_ACCUM_LSB, OIL_ENGINE_RUN_ACCUM_MIN, OIL_ENGINE_RUN_ACCUM_SEC, " +
        "ACCUM_START_TIMES_MSB, ACCUM_START_TIMES_LSB, ACCUM_ENERGY_MSB, ACCUM_ENERGY_LSB, " +
        "A_PHACE_ACTIVE_POWER, B_PHACE_ACTIVE_POWER, C_PHACE_ACTIVE_POWER, LOAD_OUTPUT_PERCENTAGE, " +
        "AIR_FUEL_RATIO, THROTTLE_PERVENTAGE, OIL_TEMP, COOLANT_PRESSURE, " +
        "FUEL_PRESSURE, FUEL_TEMP, INLET_TEMP, EXHAUST_TEMP, TURBO_PRESSURE, " +
        "FUEL_CONSUMPTION, INLET_PRESSURE, CONTROLLER_MODEL) VALUES " +
        "(?, current_timestamp, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [deviceId,
            params[0],
            params[1],
            params[2],
            params[3],
            params[4],
            params[5],
            params[6],
            params[7],
            params[8],
            params[9],
            params[10],
            params[11],
            params[12],
            params[13],
            params[14],
            params[15],
            params[16],
            params[17],
            params[19],
            params[21],
            params[23],
            params[24],
            params[26],
            params[27],
            params[28],
            params[29],
            params[34],
            params[36],
            params[38],
            params[40],
            params[42],
            params[43],
            params[44],
            params[45],
            params[46],
            params[47],
            params[48],
            params[49],
            params[52],
            params[53],
            params[54],
            params[55],
            params[56],
            params[57],
            params[59],
            params[60],
            params[61],
            params[62],
            params[63],
            params[64],
            params[65],
            params[66],
            params[67],
            params[71]],(err, result) => {
            if(err) {
                logging.warning("DB ERROR DEVICE VALUES : ",err)
            }
        })


}

module.exports = addValues;
