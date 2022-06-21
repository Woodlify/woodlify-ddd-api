import { Texture } from "src/furniture-design/domain/entities/texture.entity";
import { TextureTypeorm } from "src/furniture-design/infraestructure/persistence/typeorm/entities/texture.typeorm";
import { ColorRGBTypeorm } from "src/furniture-design/infraestructure/persistence/typeorm/value-objects/color-rgb.typeorm";

export class TextureMapper {
    public static ToTypeOrm(texture: Texture): TextureTypeorm {
        const textureTypeOrm: TextureTypeorm = new TextureTypeorm();
        textureTypeOrm.color = ColorRGBTypeorm.from(texture.color.r, texture.color.g, texture.color.b);
        textureTypeOrm.material = texture.material;
        textureTypeOrm.pixelsDensity = texture.pixelsDensity;
        return textureTypeOrm;
    }
}