const OtherFeesModel = {
    add: async (feeData) => {
        return {
            message: "Additional fee added successfully {Dummy}",
            fee: feeData
        };
    },
    view: async (feeId) => {
        if (feeId) {
            return [{
                fee_id: feeId,
                member_id: 101,
                fee_type: "late_fee",
                amount: 15.00,
                description: "Late book return penalty",
                status: "unpaid",
                created_at: "2023-01-10",
                due_date: "2023-02-01",
                reference_id: "BOOK-2023-001"
            }];
        }
        return [
            {
                fee_id: 1,
                member_id: 101,
                fee_type: "late_fee",
                amount: 15.00,
                description: "Late book return penalty",
                status: "unpaid",
                created_at: "2023-01-10",
                due_date: "2023-02-01",
                reference_id: "BOOK-2023-001"
            },
            {
                fee_id: 2,
                member_id: 102,
                fee_type: "service_fee",
                amount: 25.00,
                description: "Special equipment usage",
                status: "paid",
                created_at: "2023-01-15",
                paid_date: "2023-01-18",
                reference_id: "EQP-2023-005"
            }
        ];
    },
    update: async (feeData) => {
        if (!feeData.fee_id) {
            return { error: "Fee ID is required for update" };
        }
        return {
            message: "Additional fee updated successfully {Dummy}",
            fee: feeData
        };
    },
    delete: async (feeId) => {
        if (!feeId) {
            return { error: "Fee ID is required for deletion" };
        }
        return {
            message: "Additional fee deleted successfully {Dummy}",
            fee_id: feeId
        };
    },
    getFeeTypes: async () => {
        return [
            { value: "late_fee", label: "Late Fee" },
            { value: "service_fee", label: "Service Fee" },
            { value: "penalty", label: "Penalty" },
            { value: "other", label: "Other" }
        ];
    }
};

export default OtherFeesModel;