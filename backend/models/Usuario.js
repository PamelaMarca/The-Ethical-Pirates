module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, 
      }
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, 
      }
    },
    fecha_nacimiento: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, 
      }
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, 
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true, 
        isEmail: true, 
    },
    telefono: {  
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[0-9]+$/
      },
      set(value) {
        this.setDataValue("telefono", value === "" ? null : value);
      }
    },
    nombre_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
      validate: {
        notEmpty: true, 
      }
    },
    clave: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, 
      }
    }
  }, {
    tableName: "Usuarios", 
    timestamps: false
  });

  return Usuario;
};