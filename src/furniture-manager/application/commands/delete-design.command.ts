export class DeleteDesignCommand {
    constructor(
        public readonly furnitureDesignId: number,
        public readonly furnitureDesignName: string
    ) {}
}