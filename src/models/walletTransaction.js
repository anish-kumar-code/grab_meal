const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletTransactionSchema = new Schema({
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // Unique identifier for the order
    amount: { type: Number, required: true }, // Total order amount
    commission: { type: Number, required: true }, // Admin commission (default 20%)
    final_amount: { type: Number, required: true }, // Final amount after commission deduction
    createdAt: { type: Date, default: Date.now },
});

const WalletTransaction = mongoose.model('WalletTransaction', walletTransactionSchema);
module.exports = WalletTransaction;
