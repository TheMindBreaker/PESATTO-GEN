const mongoose = require('../dbcon');
const db = require("../dbcon");

// Define a schema
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let device_inputs = new Schema({
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
    MODE:{
      TEST_MODE:{
          type: Boolean,
          default: false
      },
      AUTO_MODE:{
          type: Boolean,
          default: false
      },
      MANUAL_MODE:{
          type: Boolean,
          default: false
      },
      STOP_MODE:{
          type: Boolean,
          default: false
      },
    },
    COMMON_ALARM: {
        type: Boolean,
        default: false
    },
    COMMON_WARNING_ALARM:{
        type: Boolean,
        default: false
    },
    COMMON_SHUTDOWN_ALARM:{
        type: Boolean,
        default: false
    },
    REMOTE_MODE:{
        type: Boolean,
        default: false
    },
    REMOTE_LOCK:{
        type: Boolean,
        default: false
    },
    MAIN_WITH_LOAD:{
        type: Boolean,
        default: false
    },
    GEN_WITH_LOAD:{
        type: Boolean,
        default: false
    },
    EMERGENCY_STOP:{
        type: Boolean,
        default: false
    },
    CRANK_FAILURE:{
        type: Boolean,
        default: false
    },
    SHUTDOWNS: {
        SPEED_SIGNAL_LOSS:{
            type: Boolean,
            default: false
        },
        OVER_FREQUENCY:{
            type: Boolean,
            default: false
        },
        UNDER_FREQUENCY:{
            type: Boolean,
            default: false
        },
        OVER_VOLTAGE:{
            type: Boolean,
            default: false
        },
        UNDER_VOLTAGE:{
            type: Boolean,
            default: false
        },
        GEN_OVER_CURRENT:{
            type: Boolean,
            default: false
        },
        HIGH_TEMPERATURE:{
            type: Boolean,
            default: false
        },
        LOW_OIL_PRESSURE:{
            type: Boolean,
            default: false
        },
        TEMP_SENSOR_OPEN:{
            type: Boolean,
            default: false
        },
        OIL_PRESSURE_SENSOR_OPEN:{
            type: Boolean,
            default: false
        },

    },
    ALARM_SHUTDOWN:{
        OVER_SPEED_ALARM: {
            type: Boolean,
            default: false
        },
        UNDER_SPEED_ALARM:{
            type: Boolean,
            default: false
        },
    },
    SHUTDOWN_ALARM:{
        MAINTENANCE_DUE:{
            type: Boolean,
            default: false
        },
        OVER_POWER:{
            type: Boolean,
            default: false
        },
        INPUT_PORT:{
            type: Boolean,
            default: false
        },
        LOW_FUEL_LEVEL:{
            type: Boolean,
            default: false
        },
        LOW_COOLANT_LEVEL:{
            type: Boolean,
            default: false
        },
    },
    ALARMS: {
      FREQUENCY_LOSS:{
          type: Boolean,
          default: false
      },
    },
    WARNS_ALARMS: {
        HIGH_WATER_TEMPERATURE:{
            type: Boolean,
            default: false
        },
        LOW_OIL_PRESSURE:{
            type: Boolean,
            default: false
        },
        GEN_OVER_CURRENT:{
            type: Boolean,
            default: false
        },
        BATTERY_VOLT_LOW:{
            type: Boolean,
            default: false
        },
        BATTERY_VOLT_HIGH:{
            type: Boolean,
            default: false
        },
        INPUT_PORT:{
            type: Boolean,
            default: false
        },
    },
    WARNS: {
      STOP_FAILURE:{
          type: Boolean,
          default: false
      },
        LOW_OIL_LEVEL:{
            type: Boolean,
            default: false
        },
        CHARGE_FAILURE:{
            type: Boolean,
            default: false
        },
        SPEED_SIGNAL_LOSS:{
            type: Boolean,
            default: false
        },
        LOW_COOLANT_LEVEL:{
            type: Boolean,
            default: false
        },
        TEMP_SENSOR_OPEN:{
            type: Boolean,
            default: false
        },
        OIL_PRESSURE_SENSOR_OPEN:{
            type: Boolean,
            default: false
        },
        MAINTENANCE_DUE:{
            type: Boolean,
            default: false
        },
        CHARGER_FAIL_TO_CHARGE:{
            type: Boolean,
            default: false
        },
        OVER_POWER:{
            type: Boolean,
            default: false
        },
        GEN_SWITCH_FAILURE:{
            type: Boolean,
            default: false
        },
        MAINS_SWITCH_FAILURE:{
            type: Boolean,
            default: false
        },
    },
    INPUT: {
        EMERGENCY_STOP:{
            type: Boolean,
            default: false
        },
        AUX1:{
            type: Boolean,
            default: false
        },
        AUX2:{
            type: Boolean,
            default: false
        },
        AUX3:{
            type: Boolean,
            default: false
        },
        AUX4:{
            type: Boolean,
            default: false
        },
        AUX5:{
            type: Boolean,
            default: false
        },
    },
    OUTPUT:{
        START_RELAY:{
            type: Boolean,
            default: false
        },
        FUEL_RELAY:{
            type: Boolean,
            default: false
        },
        AUX1:{
            type: Boolean,
            default: false
        },
        AUX2:{
            type: Boolean,
            default: false
        },
        AUX3:{
            type: Boolean,
            default: false
        },
        AUX4:{
            type: Boolean,
            default: false
        },
    },
    MAINS:{
      FAULT:{
          type: Boolean,
          default: false
      },
      NORMAL:{
          type: Boolean,
          default: false
      },
      OVER_VOLTAGE:{
          type: Boolean,
          default: false
      },
        UNDER_VOLTAGE:{
            type: Boolean,
            default: false
        },
        LOSS_OF_PHASE:{
            type: Boolean,
            default: false
        },
        BLACKOUT:{
            type: Boolean,
            default: false
        },
    },
    GEN:{
        NORMAL:{
            type: Boolean,
            default: false
        },
        OVER_VOLTAGE:{
            type: Boolean,
            default: false
        },
        UNDER_VOLTAGE:{
            type: Boolean,
            default: false
        },
        OVER_FREQUENCY:{
            type: Boolean,
            default: false
        },
        UNDER_FREQUENCY:{
            type: Boolean,
            default: false
        },
        OVER_CURRENT_WARN:{
            type: Boolean,
            default: false
        },
        IN_SCHEDULED_NOT_RUN:{
            type: Boolean,
            default: false
        },
    }

})

module.exports.model = db.model("device_inputs", device_inputs);
module.exports.data = device_inputs

