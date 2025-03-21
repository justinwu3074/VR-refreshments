class SceneManager {
    constructor() {
        this.initScene();
        this.addLights();
        this.setupControls();
        this.loadModels();
        this.setupEventListeners();
        this.animate();
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x87CEEB);
        document.body.appendChild(this.renderer.domElement);

        this.camera.position.z = 400; // 增加相机距离
    }

    addLights() {
        const mainLight = new THREE.PointLight(0xffffff, 1, 1000);
        mainLight.position.set(100, 200, 150);
        this.scene.add(mainLight);

        this.scene.add(new THREE.AmbientLight(0x404040));
    }

    setupControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
    }

    loadModels() {
        this.loader = new THREE.STLLoader();

        // 加载 snowman.stl
        this.loadModel(
            'models/snowman.stl',
            new THREE.MeshPhongMaterial({
                color: 0xffffff,
                specular: 0x111111,
                shininess: 100
            }),
            new THREE.Vector3(-300, -50, 0), // 向左移动
            true
        );

        // 加载 cake.stl
        this.loadModel(
            'models/cake.stl',
            new THREE.MeshPhongMaterial({
                color: 0x8B4513,
                specular: 0x222222,
                shininess: 50
            }),
            new THREE.Vector3(300, -50, 0) // 向右移动
        );

        // 加载 cookie1.stl
        this.loadModel(
            'models/cookie1.stl',
            new THREE.MeshPhongMaterial({
                color: 0xffa500, // 橙色
                specular: 0x222222,
                shininess: 50
            }),
            new THREE.Vector3(-100, -50, 0) // 中间偏左
        );

        // 加载 cookie2.stl
        this.loadModel(
            'models/cookie2.stl',
            new THREE.MeshPhongMaterial({
                color: 0x8b4513, // 棕色
                specular: 0x222222,
                shininess: 50
            }),
            new THREE.Vector3(100, -50, 0) // 中间偏右
        );

        // 加载 cookie3.stl
        this.loadModel(
            'models/cookie3.stl',
            new THREE.MeshPhongMaterial({
                color: 0xcd853f, // 浅棕色
                specular: 0x222222,
                shininess: 50
            }),
            new THREE.Vector3(0, -50, 0) // 正中间
        );
    }

    loadModel(path, material, position, needsRotation = false) {
        this.loader.load(path, (geometry) => {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.copy(position);

            if (needsRotation) {
                mesh.rotation.set(-Math.PI / 2, 0, 0);
            }

            this.scene.add(mesh);
        }, undefined, (error) => {
            console.error('Error loading model:', error);
        });
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        const animate = () => {
            requestAnimationFrame(animate);

            this.scene.children.forEach(child => {
                if (child instanceof THREE.Mesh) {
                    child.rotation.z += 0.005;
                }
            });

            this.controls.update();
            this.renderer.render(this.scene, this.camera);
        };

        animate();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new SceneManager();
});