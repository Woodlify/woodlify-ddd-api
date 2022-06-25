import { AggregateRoot } from "@nestjs/cqrs";
import { Furniture } from "src/furniture-design/domain/aggregates/furniture-design.entity";
import { FurnitureState } from "src/furniture-design/domain/enums/furnitureState.enum";
import { FurnitureId } from "src/furniture-design/domain/value-objects/furniture-id.value";
import { DeletedDesignEvent } from "../events/design-deleted.event";
import { DesignSubmittedEvent } from "../events/design-submitted.event";
import { FurnitureManagerCreated } from "../events/furniture-manager-created.event";
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

    set furnitures(furnitures: FurnitureId[]) {
        this._furnitures = furnitures;
    }

    get id(): FurnitureManagerId {
        return this._id;
    }
    get name(): string {
        return this._name;
    }

    public static getInstance(): FurnitureManager {
        return FurnitureManager.instance;
    }

    public static setInstance(id: FurnitureManagerId, name: string) {
        FurnitureManager.instance = new FurnitureManager(id, name);
    }
    public static hasInstance(): boolean {
        return FurnitureManager.instance != null;
    }

    public addFurniture(furnitureId: FurnitureId): void {
        this._furnitures.push(furnitureId);
    }

    public register() {
        const event = new FurnitureManagerCreated(
            this._name,
            this._furnitures
        );
        this.apply(event);
    }

    public deleteFurnitureId(id: number, name: string): void {
        const length = this._furnitures.length;
        const result = this._furnitures.find( (furnitureId: FurnitureId) => {
            return furnitureId.getFurnitureId() == id;
        });
        if(result){
            this._furnitures = this._furnitures.filter((furnitureId: FurnitureId) => {
                return furnitureId.getFurnitureId() != id;
            });
        }
        const event = new DeletedDesignEvent(
            id,
            name
        );
        this.apply(event);
    }

    public changeFurnitureState(furniture: Furniture): void {
        const event = new DesignSubmittedEvent(
            furniture.getId().getFurnitureId(),
            furniture.name,
            furniture.state,
            furniture.designDate,
            furniture.lastModificationDate
        );
        this.apply(event);
    }

    public changeId(id: FurnitureManagerId): void {
        this._id = id;
    }

}