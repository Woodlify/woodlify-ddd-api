export class CreateCanvasCommand {
    constructor (
        public readonly name: string,
        public readonly createdAt: Date,
        public readonly lastMofication: Date
    ) {}
}