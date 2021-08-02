require("dotenv").config();

const Sequelize = require("sequelize");

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

const User = db.define("todo_user", {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  token: {
    type: Sequelize.STRING,
  },
});

const Note = db.define("todo_note", {
  note_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  is_pinned: {
    type: Sequelize.BOOLEAN,
  },
  note_tags: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
  },
});

const Tag = db.define("todo_tag", {
  tag_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
  },
  is_active: {
    type: Sequelize.BOOLEAN,
  },
});

User.hasMany(Note, {
  foreignKey: {
    name: 'user_id'
  }
});
User.hasMany(Tag, {
  foreignKey: {
    name: 'user_id'
  }
});

db.sync({alter: true})
  .then(() => {
    console.log("Synced");
  })
  .catch((err) => console.log(err)); 

// db.authenticate()
//   .then(() => console.log("Database connected..."))
//   .catch((err) => console.log("Error: ", err));

const models = {
  User,
  Note,
  Tag,
};

module.exports = models; 
