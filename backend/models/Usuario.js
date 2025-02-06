module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Asegura que no esté vacío
      }
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Asegura que no esté vacío
      }
    },
    fecha_nacimiento: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Asegura que no esté vacío
      }
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Asegura que no esté vacío
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true, // Evita que se repita el correo electrónico
      validate: {
        isEmail: true, // Valida que el formato sea de correo electrónico
      }
    },
    telefono: {  // Debe coincidir con la base de datos (minúsculas)
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[0-9]+$/, // Asegura que solo contenga números
      }
    },
    nombre_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Evita que se repita el nombre de usuario
      validate: {
        notEmpty: true, // Asegura que no esté vacío
      }
    },
    clave: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Asegura que la contraseña no esté vacía
      }
    }
  }, {
    // Opciones adicionales, por ejemplo, si quieres que Sequelize cree las tablas automáticamente
    timestamps: false, // Si no quieres que se creen las columnas createdAt y updatedAt
  });

  return Usuario;
};