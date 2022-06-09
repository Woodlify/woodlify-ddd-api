import { Res } from "@nestjs/common";
import { NotFoundError } from "rxjs";
import { AppNotification } from "src/common/application/app-notification";
import { Result } from "typescript-result";

export class ColorRGB {
    public readonly r: number;
    public readonly g: number;
    public readonly b: number;

    private constructor(
        r: number,
        g: number,
        b: number
    ){}

    public static from(r: number, g: number, b: number): Result<AppNotification, ColorRGB> {
        let notification: AppNotification = new AppNotification();
        if(r < 0 && r > 255)
            notification.addError("R channel value exceeded", null);
        if(g < 0 && g > 255)
            notification.addError("G channel value exceeded", null);
        if(b < 0 && b > 255)
            notification.addError("B channel value exceeded", null);
        if(notification.hasErrors())
            return Result.error(notification);
        return Result.ok(new ColorRGB(r,g,b));
    }
}