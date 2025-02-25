'use strict';
const { Model, Op } = require('sequelize');
const { Validator } = require('validator');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // method that returns the info for User that is safe to save to a JWT
    toSafeObject() {
      const { id, username, email } = this;
      return { id, username, email };
    }

    // method to validate password
    validatePassword(password) {
      const hashedPasswordStr = this.hashedPassword.toString();
      return bcrypt.compareSync(password, hashedPasswordStr);
    }

    // static method to get current user by Id
    static getCurrentUserById(id) {
      return User.scope('currentUser').findByPk(id);
    }

    // static method to authenticate user during logIn
    static async login({ credential, password }) {
      // find user whose username or email is provided by credential
      const user = await User.scope('authenticateUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });

      // check if we found a valid user and the password provided is correct
      if (user && user.validatePassword(password)) {

        // return the logged in user using current user scope
        return await User.scope('currentUser').findByPk(user.id)
      }
    }

    // static method to sign up a new user
    static async signup({username, email, password}) {
      // salt & hash the user password before storing in database
      const hashedPassword = bcrypt.hashSync(password);

      // create a new user and save to database
      const user = await User.create({
        username,
        email,
        hashedPassword
      });

      // return the created using using current user scope
      return await User.scope('currentUser').findByPk(user.id);
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('username cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
      }

    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: {
          exclude: ['hashedPassword']
        }
      },
      authenticateUser: {
        attributes: {}
      }
    }
  });
  return User;
};
