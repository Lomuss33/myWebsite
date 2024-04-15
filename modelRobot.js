import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scenePathRobot = '/public/models/scene.scene.gtlf'  //load model

export const LoadGLTFByPath = (scene) => {
    return new Promise((resolve, reject) => {
        //create a loader
        const loader = new GLTFLoader();

        //load the gltf file
        loader.load(scenePathRobot, (gltf) => {

            scene.add(gltf.scene);

            resolve();
        }, undefined, (error) => {
            reject(error);
        });
    });
};