export class DistnaceUtils {
    /**
     * Calculates the distance between two points using the Haversine formula.
     * @param pickupLat Latitude of the pickup location in degrees.
     * @param pickupLon Longitude of the pickup location in degrees.
     * @param dropLat Latitude of the drop location in degrees.
     * @param dropLon Longitude of the drop location in degrees.
     * @returns The distance between the two points in kilometers.
     */
    public static calculateDistance(pickupLat: number, pickupLon: number, dropLat: number, dropLon: number): number {
        try {
            const R = 6371; // Radius of the earth in km
            const dLat = this.degreesToRadians(dropLat - pickupLat);
            const dLon = this.degreesToRadians(dropLon - pickupLon);
    
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.degreesToRadians(pickupLat)) * Math.cos(this.degreesToRadians(dropLat)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const d = R * c;
            return d;
        } catch(error) {
            throw error;
        }
    }

    /**
     * Converts degrees to radians.
     * @param degrees The degrees to convert.
     * @returns The radians.
     */
    private static degreesToRadians(degrees: number): number {
        try {
            return degrees * (Math.PI / 180);
        }catch(error) {
            throw error;
        }
    }
}