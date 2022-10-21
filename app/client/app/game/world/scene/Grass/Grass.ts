import {
    BufferGeometry,
    Euler,
    Group,
    InstancedMesh,
    Matrix4,
    Mesh,
    MeshBasicMaterial,
    MeshToonMaterial,
    Object3D,
    Quaternion,
    Vector3,
} from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import Assets from '../../../../assets/Assets';

const setMatrixPosition = (function () {
    const position = new Vector3();
    const rotation = new Euler();
    const quaternion = new Quaternion();
    const scale = new Vector3();

    return function (matrix: Matrix4, x: number, z: number) {
        position.x = x;
        position.y = 0;
        position.z = z;

        // rotation.x = Math.random() * 2 * Math.PI;
        // rotation.y = Math.random() * 2 * Math.PI;
        // rotation.z = Math.random() * 2 * Math.PI;

        quaternion.setFromEuler(rotation);

        scale.x = scale.y = scale.z = 1;

        matrix.compose(position, quaternion, scale);
    };
})();

export default class Grass {
    private group = new Group();

    constructor() {
        const grassGeometry = new Assets().geometries.get('grass');
        const grassAlphaMap = new Assets().textures.get('grassAlphaMap');

        const grassMaterial = new MeshToonMaterial({
            color: 0x16300f,
            alphaMap: grassAlphaMap,
            alphaTest: 0.01,
        });

        // const grassMaterial = new MeshBasicMaterial();

        // for (let x = 0; x < 5; x++) {
        //     for (let y = 0; y < 5; y++) {
        //         const grass = new Mesh(grassGeometry, grassMaterial);
        //         grass.receiveShadow = true;
        //         grass.castShadow = true;
        //         grass.position.x = x * 2.2 - 4.5;
        //         grass.position.z = y * 2.2 - 4.5;
        //         grass.rotation.y = Math.floor(Math.random() * 4) * 90 * (Math.PI / 180);
        //         this.group.add(grass);
        //     }
        // }

        //merged
        // const geometries: BufferGeometry[] = [];
        // for (let x = 0; x < 5; x++) {
        //     for (let y = 0; y < 5; y++) {
        //         const geometry = grassGeometry.clone();
        //         const shiftX = x * 2.2 - 4.5;
        //         const shiftZ = y * 2.2 - 4.5;
        //         geometry.translate(shiftX, 0, shiftZ);
        //         const angle = Math.floor(Math.random() * 4) * 90 * (Math.PI / 180);
        //         if (Math.random() > 0.5) {
        //             geometry.rotateY(Math.PI * 2);
        //         }
        //         geometries.push(geometry);
        //     }
        // }

        // const merged = BufferGeometryUtils.mergeBufferGeometries(geometries);

        // const grass = new Mesh(merged, grassMaterial);
        // grass.receiveShadow = true;
        // grass.castShadow = true;

        // this.group.add(grass);

        //instanced
        grassGeometry.computeVertexNormals();
        const grass = new InstancedMesh(grassGeometry, grassMaterial, 25);
        const dummy = new Object3D();
        let i = 0;
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                const shiftX = x * 2.2 - 4.5;
                const shiftZ = y * 2.2 - 4.5;
                dummy.position.set(shiftX, 0, shiftZ);

                const random = Math.random();

                // rewrite this shit
                if (random > 0.3) {
                    if (random > 0.6) {
                        dummy.rotation.set(0, Math.PI / 2, 0);
                    } else {
                        dummy.rotation.set(0, Math.PI, 0);
                    }
                }
                dummy.updateMatrix();
                grass.setMatrixAt(i, dummy.matrix);
                i++;
            }
        }
        grass.receiveShadow = true;
        grass.castShadow = true;
        this.group.add(grass);
    }

    getMesh() {
        this.group.position.y -= 0.05;
        return this.group;
    }
}
