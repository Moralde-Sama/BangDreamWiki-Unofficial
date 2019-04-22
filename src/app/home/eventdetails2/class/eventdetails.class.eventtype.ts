export class EventType {
    private types: Array<string> = ['Normal', 'Challenge Live', 'VS Live', 'Live Goals', 'Mission Live'];
    getType(type: string): string {
        if (type === 'normal') {
            return this.types[0];
        } else if (type === 'challenge_live') {
            return this.types[1];
        } else if (type === 'vs_live') {
            return this.types[2];
        } else if (type === 'live_goals') {
            return this.types[3];
        } else if (type === 'mission_live') {
            return this.types[4];
        }
    }
}
