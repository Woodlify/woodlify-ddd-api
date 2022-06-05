export class CreateDesignCommand {
    constructor(
        public readonly title: string,
        public readonly pieces: number[],
        public readonly designedAt: Date,
        public readonly designedBy: number
    ) {}
}