const SeatsModel = {
    add: async (seatData) => {
        return {
            message: "Seat added successfully {Dummy}",
            seat: seatData
        }
    },
    view: async (seatId) => {
        if (seatId) {
            return [{
                seat_id: seatId,
                room_id: 1,
                seat_number: "A1",
                status: "available"
            }];
        }
        return [
            {
                seat_id: 1,
                room_id: 1,
                seat_number: "A1",
                status: "available"
            },
            {
                seat_id: 2,
                room_id: 1,
                seat_number: "A2",
                status: "occupied"
            }
        ];
    },
    update: async (seatData) => {
        if (!seatData.seat_id) {
            return { error: "Seat ID is required for update" };
        }
        return {
            message: "Seat updated successfully {Dummy}",
            seat: seatData
        }
    },
    delete: async (seatId) => {
        if (!seatId) {
            return { error: "Seat ID is required for deletion" };
        }
        return {
            message: "Seat deleted successfully {Dummy}",
            seat_id: seatId
        }
    }
}

export default SeatsModel;