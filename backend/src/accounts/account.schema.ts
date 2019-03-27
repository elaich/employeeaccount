import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
  holder: { type: String, required: true },
  name: { type: String, required: true },
  bank: { type: String, required: true },
  branch: { type: String, required: true },
  account_type: { type: String, required: true },
  account_number: {
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        console.log('Validating');
        return /^\d{1,15}$/.test(v)
      },
      message: 'Not a valid, should be a number up to 15 digits'
    },
  },
  employee_number: {
    type: String, 
    validate: {
      validator: function(v) {
        console.log('Validating');
        return /^\d{1,7}$/.test(v)
      },
      message: 'Not a valid, should be a number up to 7 digits'
    },
    required: true,
  },
}, {
  timestamps: { updatedAt: 'last_update' } 
});
