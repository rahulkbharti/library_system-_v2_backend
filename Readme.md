library-management-system/
│
├── src/
│   ├── models/         # DB Models (for MySQL using Sequelize/Knex/TypeORM/Raw)
│   │   ├── user.model.js
│   │   ├── admin.model.js
│   │   ├── staff.model.js
│   │   ├── group.model.js
│   │   ├── groupPermission.model.js
│   │   └── ...
│   │
│   ├── controllers/    # Request Handlers
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── admin.controller.js
│   │   ├── staff.controller.js
│   │   └── group.controller.js
│   │
│   ├── routes/         # API Routes
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── admin.routes.js
│   │   ├── staff.routes.js
│   │   └── group.routes.js
│   │
│   ├── middlewares/    # Auth, Validation, Error handlers
│   │   ├── auth.middleware.js
│   │   ├── permission.middleware.js
│   │   └── errorHandler.middleware.js
│   │
│   ├── utils/          # Helper functions
│   │   ├── db.js       # mysql pool or ORM setup
│   │   ├── hash.js     # bcrypt helpers
│   │   └── jwt.js      # JWT helpers
│   │
│   ├── app.js          # Express app
│   └── server.js       # App startup script
│
├── config/             # Config files (env vars, DB settings)
│   ├── db.config.js
│   └── dotenv/.env
│
├── package.json
└── README.md
