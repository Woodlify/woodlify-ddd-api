import { Texture } from "src/furniture-design/domain/entities/texture.entity";
import { TextureTypeORM } from "src/furniture-design/infraestructure/persistence/typeorm/entities/texture.typeorm";
import { ColorRGBTypeORM } from "src/furniture-design/infraestructure/persistence/typeorm/value-objects/color-rgb.typeorm";

export class TextureMapper {
    public static ToTypeOrm(texture: Texture): TextureTypeORM {
        const textureTypeOrm: TextureTypeORM = new TextureTypeORM();
        textureTypeOrm.color = ColorRGBTypeORM.from(texture.color.r, texture.color.g, texture.color.b);
        textureTypeOrm.material = texture.material;
        textureTypeOrm.pixelsDensity = texture.pixelsDensity;
        return textureTypeOrm;
    }
}