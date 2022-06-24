import { AggregateRoot } from "@nestjs/cqrs";
import { FurnitureId } from "src/furniture-design/domain/value-objects/furniture-id.value";
import { FurnitureManagerId } from "../value-objects/furniture-manager-id.value";

export class FurnitureManager extends AggregateRoot {
    private _furnitures: FurnitureId[];
    private static instance: FurnitureManager;
    private constructor(
        private _id: FurnitureManagerId,
        private _name: string
    ) {
        super();
        this._furnitures = [];
    }
    
    get furnitures(): FurnitureId[] {
        return this._furnitures;
    }
    get id(): FurnitureManagerId {
        return this._id;
    }
    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    public static getInstance(id: FurnitureManagerId, name: string): FurnitureManager {
        if(!FurnitureManager.instance)
            FurnitureManager.instance = new FurnitureManager(id, name);
        return FurnitureManager.instance;
    }
    public static hasInstance(): boolean {
        return FurnitureManager.instance != null;
    }

    public addFurniture(furnitureId: FurnitureId): void {
        this._furnitures.push(furnitureId);
    }

}