-- Make user or member table with these config

membership_type ENUM('Regular', 'Student', 'Senior', 'Corporate') NOT NULL,
membership_start_date DATE NOT NULL,
membership_end_date DATE,


role ENUM('Librarian', 'Assistant', 'Admin', 'Manager') NOT NULL,
can_waive_fees BOOLEAN NOT NULL DEFAULT FALSE,