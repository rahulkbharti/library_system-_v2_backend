const MonthlyFeesModel = {
    add: async (feeData) => {
        return {
            message: "Monthly fee added successfully {Dummy}",
            fee: feeData
        };
    },
    view: async (feeId) => {
        if (feeId) {
            return [{
                fee_id: feeId,
                member_id: 101,
                amount: 50.00,
                month: "2023-01",
                payment_status: "paid",
                due_date: "2023-01-15",
                paid_date: "2023-01-10",
                payment_method: "credit_card"
            }];
        }
        return [
            {
                fee_id: 1,
                member_id: 101,
                amount: 50.00,
                month: "2023-01",
                payment_status: "paid",
                due_date: "2023-01-15",
                paid_date: "2023-01-10",
                payment_method: "credit_card"
            },
            {
                fee_id: 2,
                member_id: 102,
                amount: 50.00,
                month: "2023-01",
                payment_status: "unpaid",
                due_date: "2023-01-15",
                paid_date: null,
                payment_method: null
            }
        ];
    },
    update: async (feeData) => {
        if (!feeData.fee_id) {
            return { error: "Fee ID is required for update" };
        }
        return {
            message: "Monthly fee updated successfully {Dummy}",
            fee: feeData
        };
    },
    delete: async (feeId) => {
        if (!feeId) {
            return { error: "Fee ID is required for deletion" };
        }
        return {
            message: "Monthly fee deleted successfully {Dummy}",
            fee_id: feeId
        };
    },
    generateMonthlyFees: async (month) => {
        return {
            message: `Monthly fees generated successfully for ${month} {Dummy}`,
            count: 150,
            month: month
        };
    }
};

export default MonthlyFeesModel;