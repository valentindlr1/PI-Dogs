const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "dog",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61ggYEHeHDL.jpg",
        validate: {
          isEmpty(value) {
            if (value === "")
              return this.setDataValue(
                "image",
                "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61ggYEHeHDL.jpg"
              );
          },
        },
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      life_span: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      temperament: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      timestamps: false,
    }
  );
};
