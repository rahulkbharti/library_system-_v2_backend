const PERMISSIONS = {
  BOOK: {
    ADD_BOOK: { code: "ADD_BOOK", description: "Add Book" },
    EDIT_BOOK: { code: "EDIT_BOOK", description: "Edit Book" },
    DELETE_BOOK: { code: "DELETE_BOOK", description: "Delete Book" },
    VIEW_BOOK: { code: "VIEW_BOOK", description: "View Book" }
  },
  BOOK_COPY: {
    ADD_BOOK_COPY: { code: "ADD_BOOK_COPY", description: "Add Book Copy" },
    EDIT_BOOK_COPY: { code: "EDIT_BOOK_COPY", description: "Edit Book Copy" },
    DELETE_BOOK_COPY: { code: "DELETE_BOOK_COPY", description: "Delete Book Copy" },
    VIEW_BOOK_COPY: { code: "VIEW_BOOK_COPY", description: "View Book Copy" }
  },
  SEAT: {
    ADD_SEAT: { code: "ADD_SEAT", description: "Add Seat" },
    EDIT_SEAT: { code: "EDIT_SEAT", description: "Edit Seat" },
    DELETE_SEAT: { code: "DELETE_SEAT", description: "Delete Seat" },
    VIEW_SEAT: { code: "VIEW_SEAT", description: "View Seat" }
  },
  SEAT_RESERVATION: {
    ADD_SEAT_RESERVATION: { code: "ADD_SEAT_RESERVATION", description: "Add Seat Reservation" },
    EDIT_SEAT_RESERVATION: { code: "EDIT_SEAT_RESERVATION", description: "Edit Seat Reservation" },
    DELETE_SEAT_RESERVATION: { code: "DELETE_SEAT_RESERVATION", description: "Delete Seat Reservation" },
    VIEW_SEAT_RESERVATION: { code: "VIEW_SEAT_RESERVATION", description: "View Seat Reservation" }
  },
  GROUP: {
    ADD_GROUP: { code: "ADD_GROUP", description: "Add Group" },
    EDIT_GROUP: { code: "EDIT_GROUP", description: "Edit Group" },
    DELETE_GROUP: { code: "DELETE_GROUP", description: "Delete Group" },
    VIEW_GROUP: { code: "VIEW_GROUP", description: "View Group" }
  },
  GROUP_PERMISSION: {
    ADD_GROUP_PERMISSION: { code: "ADD_GROUP_PERMISSION", description: "Add Group Permission" },
    EDIT_GROUP_PERMISSION: { code: "EDIT_GROUP_PERMISSION", description: "Edit Group Permission" },
    DELETE_GROUP_PERMISSION: { code: "DELETE_GROUP_PERMISSION", description: "Delete Group Permission" },
    VIEW_GROUP_PERMISSION: { code: "VIEW_GROUP_PERMISSION", description: "View Group Permission" }
  }
};

// Named exports for direct access
export const {
  BOOK,
  BOOK_COPY,
  SEAT,
  SEAT_RESERVATION,
  GROUP,
  GROUP_PERMISSION
} = PERMISSIONS;