import { configs } from "../configs";
import { Package } from "../models";
import { ChargesCalculation, PackageCharge, PackageType } from "../types";

export class ChargeUtils {
    /**
     * Calculates the charges based on distance and packages.
     * @param distance The distance between the two points in kilometers.
     * @param packages The packages to be delivered.
     * @returns The chargable amount based on distance and packages.
     */
    public static calculateCharges(distance: number, packages: Package[]): ChargesCalculation {
        try {
            const distanceCharge = Number((distance * configs.charges.perKM).toFixed(2));
            const packageCharges: PackageCharge[] = [];

            let totalWeightCharge = 0;
            let totalProductTypeCharge = 0;

            packages.forEach((pkg, index) => {
                const weightCharge = Number((pkg.weight * configs.charges.perWeight).toFixed(2));
                const volume = Number(((pkg.width * pkg.length * pkg.height) / 1000000).toFixed(2)); // Convert to cubic meters
                const volumeCharge = Number((volume * configs.charges.perCubic).toFixed(2));
                const basePackageCharge = Number((weightCharge + volumeCharge).toFixed(2));
                const productTypeCharge = ChargeUtils.calculateProductTypeCharges(pkg.type, basePackageCharge);

                totalWeightCharge += Number(weightCharge.toFixed(2));
                totalProductTypeCharge += Number(productTypeCharge.toFixed(2));

                packageCharges.push({
                    packageIndex: index,
                    weightCharge,
                    volumeCharge,
                    productTypeCharge,
                    subtotal: Number((weightCharge + volumeCharge + productTypeCharge).toFixed(2))
                });
            });

            const totalCharge = Number((configs.charges.baseAmount + distanceCharge + totalWeightCharge + totalProductTypeCharge).toFixed(2));

            return {
                baseCharge: Number(configs.charges.baseAmount.toFixed(2)),
                distanceCharge,
                productTypeCharge: totalProductTypeCharge,
                weightCharge: totalWeightCharge,
                totalCharge: totalCharge,
                breakdown: {
                    packageCharges,
                    totalDistance: Number(distance.toFixed(2))
                }
            }
        } catch (error) {
            throw error;
        }
    }

    private static calculateProductTypeCharges(packageType: PackageType, baseCharge: number): number {
        try {
            const multipliers = {
                [PackageType.ELECTRONICS]: configs.charges.onElectronics,
                [PackageType.FURNITURE]: configs.charges.onFurniture,
                [PackageType.FRAGILE]: configs.charges.onFragile,
                [PackageType.PERISHABLE]: configs.charges.onPerishable,
                [PackageType.DOCUMENT]: configs.charges.onDocument,
                [PackageType.OTHER]: configs.charges.onOther
            };
            return Number((baseCharge * multipliers[packageType]).toFixed(2));
        } catch (error) {
            throw error;
        }
    }
}