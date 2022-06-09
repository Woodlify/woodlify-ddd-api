export class ImportDesignFileCommand {
    constructor (
        public readonly name: string,
        public readonly pieces: number[],
        public readonly designedAt: Date,
        public readonly designedBy: number
    ) {}
}