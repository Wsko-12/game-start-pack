// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as G from './Geometry';
describe('Geometry lib', () => {
    describe('roundNum', () => {
        test('Should correct round numbers', () => {
            const expected = 3;
            const result = G.roundNum(3.45, 0);
            expect(result).toBe(expected);

            const expected = 3.45;
            const result = G.roundNum(3.454, 2);
            expect(result).toBe(expected);
        });
    });

    describe('Point2', () => {
        describe('getDistanceTo()', () => {
            test('Should correct get distance', () => {
                let point_1 = new G.Point2(0, 0);
                let point_2 = new G.Point2(0, 1);

                expect(point_1.getDistanceTo(point_2)).toBe(1);

                point_1 = new G.Point2(0, 0);
                point_2 = new G.Point2(1, 1);

                expect(point_1.getDistanceTo(point_2)).toBeCloseTo(Math.sqrt(2));

                point_1 = new G.Point2(0, 0);
                point_2 = new G.Point2(-1, -1);

                expect(point_1.getDistanceTo(point_2)).toBeCloseTo(Math.sqrt(2));
            });

            test('Should works with any args', () => {
                let point_1 = new G.Point2(0, 0);

                expect(point_1.getDistanceTo(0, 1)).toBe(1);

                point_1 = new G.Point2(1, 1);

                expect(point_1.getDistanceTo(2, 2)).toBeCloseTo(Math.sqrt(2));

                point_1 = new G.Point2(-1, -1);

                expect(point_1.getDistanceTo(new G.Point2(0, 0))).toBeCloseTo(Math.sqrt(2));

                point_1 = new G.Point2(-1, -1);

                expect(point_1.getDistanceTo(new G.Point3(0, 0, 0))).toBeCloseTo(Math.sqrt(2));
            });

            test('If colled without args return distance to (0,0,0)', () => {
                const point_1 = new G.Point2(1, 1);

                expect(point_1.getDistanceTo()).toBeCloseTo(Math.sqrt(2));
            });
        });
    });

    describe('Point3', () => {
        describe('getDistanceTo()', () => {
            test('Should correct get distance', () => {
                let point_1 = new G.Point3(0, 0, 0);
                let point_2 = new G.Point3(0, 1, 0);

                expect(point_1.getDistanceTo(point_2)).toBe(1);

                point_1 = new G.Point3(0, 0, 0);
                point_2 = new G.Point3(1, 1, 0);

                expect(point_1.getDistanceTo(point_2)).toBeCloseTo(Math.sqrt(2));

                point_1 = new G.Point3(0, 0, 0);
                point_2 = new G.Point3(-1, -1, -1);

                expect(point_1.getDistanceTo(point_2)).toBeCloseTo(Math.sqrt(3));
            });

            test('Should works with any args', () => {
                let point_1 = new G.Point3(0, 0, 0);
                let point_2 = new G.Point3(1, 1, 1);

                expect(point_1.getDistanceTo(point_2)).toBeCloseTo(Math.sqrt(3));

                point_1 = new G.Point3(0, 0, 0);
                point_2 = new G.Point2(1, 1);

                expect(point_1.getDistanceTo(point_2)).toBeCloseTo(Math.sqrt(2));

                point_1 = new G.Point3(1, 1, 1);

                expect(point_1.getDistanceTo(0, 0)).toBeCloseTo(Math.sqrt(2));

                expect(point_1.getDistanceTo(0)).toBe(1);
            });

            test('If colled without args return distance to (0,0,0)', () => {
                let point_1 = new G.Point3(1, 1, 1);

                expect(point_1.getDistanceTo()).toBeCloseTo(Math.sqrt(3));

                point_1 = new G.Point3(1, 0, 0);

                expect(point_1.getDistanceTo()).toBe(1);
            });
        });
    });
});
