import {
    BasicDepthPacking,
    BufferGeometry,
    Euler,
    Group,
    InstancedMesh,
    Matrix4,
    Mesh,
    MeshDepthMaterial,
    MeshToonMaterial,
    Object3D,
    Quaternion,
    RGBADepthPacking,
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
    private uniforms = {
        uTime: { value: 0 },
    };

    constructor() {
        const grassGeometry = new Assets().geometries.get('grass');
        const grassMap = new Assets().textures.get('grass');

        const grassMaterial = new MeshToonMaterial({
            color: 0x16300f,
            alphaMap: grassMap,
            alphaTest: 0.01,
        });

        // const depthMaterial = new MeshDepthMaterial({
        //     depthPacking: BasicDepthPacking,
        //     // alphaMap: grassMap,
        //     alphaTest: 0.01,
        // });

        // depthMaterial.onBeforeCompile = (shader) => {
        //     shader.uniforms.uTime = this.uniforms.uTime;
        //     const token_vs = `#include <common>`;
        //     const vs = `
        //         #include <common>
        //         uniform float uTime;
        //     `;

        //     shader.vertexShader = shader.vertexShader.replace(token_vs, vs);

        //     const token_vs_2 = `vHighPrecisionZW = gl_Position.zw`;
        //     const vs_2 = `
        //         vHighPrecisionZW = gl_Position.zw;
        //         vec3 vPosition = position;
        //         vPosition.z += sin(vPosition.y * (normal.z) * (uTime * 10.0)) * 0.05 ;
        //         gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
        //     `;
        //     shader.vertexShader = shader.vertexShader.replace(token_vs_2, vs_2);
        // };

        grassMaterial.onBeforeCompile = (shader) => {
            shader.uniforms.uTime = this.uniforms.uTime;
            let vertex = shader.vertexShader;
            vertex = vertex.replace(
                '#include <common>',
                `#include <common>
                uniform float uTime;
                `
            );

            vertex = vertex.replace(
                '#include <fog_vertex>',
                `#include <fog_vertex>
                 vec3 vPosition = position;
                 vPosition.z += sin(vPosition.y * (normal.z) * (uTime * 10.0)) * 0.05 ;
                 gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
                `
            );
            shader.vertexShader = vertex;
        };

        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                const grass = new Mesh(grassGeometry, grassMaterial);
                grass.receiveShadow = true;
                grass.castShadow = true;
                grass.position.x = x * 2.2 - 4.5;
                grass.position.z = y * 2.2 - 4.5;
                grass.rotation.y = Math.floor(Math.random() * 4) * 90 * (Math.PI / 180);
                this.group.add(grass);
            }
        }

        //merged
        const geometries: BufferGeometry[] = [];
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                const geometry = grassGeometry.clone();
                const shiftX = x * 2.2 - 4.5;
                const shiftZ = y * 2.2 - 4.5;
                geometry.translate(shiftX, 0, shiftZ);
                const angle = Math.floor(Math.random() * 4) * 90 * (Math.PI / 180);
                if (Math.random() > 0.5) {
                    geometry.rotateY(Math.PI * 2);
                }
                geometries.push(geometry);
            }
        }

        const merged = BufferGeometryUtils.mergeBufferGeometries(geometries);

        const grass = new Mesh(merged, grassMaterial);
        grass.receiveShadow = true;
        grass.castShadow = true;
        // grass.customDepthMaterial = depthMaterial;
        // grass.customDepthMaterial.needsUpdate = true;
        this.group.add(grass);

        //instanced
        // grassGeometry.computeVertexNormals();
        // const grass = new InstancedMesh(grassGeometry, grassMaterial, 25);
        // const dummy = new Object3D();
        // let i = 0;
        // for (let x = 0; x < 5; x++) {
        //     for (let y = 0; y < 5; y++) {
        //         const shiftX = x * 2.2 - 4.5;
        //         const shiftZ = y * 2.2 - 4.5;
        //         dummy.position.set(shiftX, 0, shiftZ);

        //         const random = Math.random();

        //         // rewrite this shit
        //         if (random > 0.3) {
        //             if (random > 0.6) {
        //                 dummy.rotation.set(0, Math.PI / 2, 0);
        //             } else {
        //                 dummy.rotation.set(0, Math.PI, 0);
        //             }
        //         }
        //         dummy.updateMatrix();
        //         grass.setMatrixAt(i, dummy.matrix);
        //         i++;
        //     }
        // }
        // grass.receiveShadow = true;
        // grass.castShadow = true;
        // this.group.add(grass);
    }

    getMesh() {
        this.group.position.y -= 0.15;
        return this.group;
    }

    update = (time: number) => {
        this.uniforms.uTime.value = time;
    };
}
