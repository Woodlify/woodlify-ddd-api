export abstract class GraphicComponent {
    protected name: string;

    protected constructor(name: string = "") {
        this.name = name;
    }

    public addComponent(component: GraphicComponent): void {
    }

    public getComponent(componentNum: number): GraphicComponent {
        return this;
    }
    
    public getName(): string {
        return this.name;
    }
}