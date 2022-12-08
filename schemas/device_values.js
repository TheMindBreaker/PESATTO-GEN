const mongoose = require('../dbcon');
const db = require("../dbcon");

// Define a schema
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let device_value = new Schema(
    {
        deviceId: {
            type: ObjectId
        },
        CALL: {
            type: String,
            default: ""
        },
        UPDATED: {
            type: Date,
            default: Date.now()
        },
        MAIN_AU: {
            type: String,
            default: "",
        },
        MAIN_AB: {
            type: Number,
            default: 0
        },
        MAIN_AC: {
            type: Number,
            default: 0
        },
        MAIN_UAB: {
            type: Number,
            default: 0
        },
        MAIN_UBC: {
            type: Number,
            default: 0
        },
        MAIN_UCA: {
            type: Number,
            default: 0
        },
        MAIN_FREC: {
            type: Number,
            default: 0
        },
        GEN_UA: {
            type: Number,
            default: 0
        },
        GEN_UB: {
            type: Number,
            default: 0
        },
        GEN_UC: {
            type: Number,
            default: 0
        },
        GEN_UAB: {
            type: Number,
            default: 0
        },
        GEN_UBC: {
            type: Number,
            default: 0
        },
        GEN_UCA: {
            type: Number,
            default: 0
        },
        GEN_FREC: {
            type: Number,
            default: 0
        },
        A_PHACE_CURRENT: {
            type: Number,
            default: 0
        },
        B_PHACE_CURRENT: {
            type: Number,
            default: 0
        },
        C_PHACE_CURRENT: {
            type: Number,
            default: 0
        },
        WATER_TEMP: {
            type: Number,
            default: 0
        },
        OIL_PREASURE: {
            type: Number,
            default: 0
        },
        FUEL_LEVEL: {
            type: Number,
            default: 0
        },
        SPEED: {
            type: Number,
            default: 0
        },
        BATTERY_VOLTAGE: {
            type: Number,
            default: 0
        },
        ACTIVE_POWER: {
            type: Number,
            default: 0
        },
        REACTIVE_POWER: {
            type: Number,
            default: 0
        },
        APPARENT_POWER: {
            type: Number,
            default: 0
        },
        POWER_FACTOR: {
            type: Number,
            default: 0
        },
        CONTROLLER_RUNNING_STATUS: {
            type: Number,
            default: 0
        },
        AUTO_RUNNING_STATUS: {
            type: Number,
            default: 0
        },
        ATS_RUNNING_STATUS: {
            type: Number,
            default: 0
        },
        MAIN_STATUS: {
            type: Number,
            default: 0
        },
        OIL_ENGINE_RUN_ACCUM_MSB: {
            type: Number,
            default: 0
        },
        OIL_ENGINE_RUN_ACCUM_LSB: {
            type: Number,
            default: 0
        },
        OIL_ENGINE_RUN_ACCUM_MIN: {
            type: Number,
            default: 0
        },
        OIL_ENGINE_RUN_ACCUM_SEC: {
            type: Number,
            default: 0
        },
        ACCUM_START_TIMES_MSB: {
            type: Number,
            default: 0
        },
        ACCUM_START_TIMES_LSB: {
            type: Number,
            default: 0
        },
        ACCUM_ENERGY_MSB: {
            type: Number,
            default: 0
        },
        ACCUM_ENERGY_LSB: {
            type: Number,
            default: 0
        },
        A_PHACE_ACTIVE_POWER: {
            type: Number,
            default: 0
        },
        B_PHACE_ACTIVE_POWER: {
            type: Number,
            default: 0
        },
        C_PHACE_ACTIVE_POWER: {
            type: Number,
            default: 0
        },
        LOAD_OUTPUT_PERCENTAGE: {
            type: Number,
            default: 0
        },
        AIR_FUEL_RATIO: {
            type: Number,
            default: 0
        },
        THROTTLE_PERVENTAGE: {
            type: Number,
            default: 0
        },
        OIL_TEMP: {
            type: Number,
            default: 0
        },
        COOLANT_PRESSURE: {
            type: Number,
            default: 0
        },
        FUEL_PRESSURE: {
            type: Number,
            default: 0
        },
        FUEL_TEMP: {
            type: Number,
            default: 0
        },
        INLET_TEMP: {
            type: Number,
            default: 0
        },
        EXHAUST_TEMP: {
            type: Number,
            default: 0
        },
        TURBO_PRESSURE: {
            type: Number,
            default: 0
        },
        FUEL_CONSUMPTION: {
            type: Number,
            default: 0
        },
        INLET_PRESSURE: {
            type: Number,
            default: 0
        },
        CONTROLLER_MODEL: {
            type: Number,
            default: 0
        }
    }

);

module.exports.model = db.model("device_values", device_value);
module.exports.data = device_value

