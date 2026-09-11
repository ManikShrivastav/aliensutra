(() => {
  "use strict";

  const loader = document.getElementById("loader");
  const canvas = document.getElementById("space");
  const nav = document.querySelector(".nav");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const year = document.getElementById("year");

  year.textContent = new Date().getFullYear();

  /* -----------------------------
     LOADER
  ----------------------------- */
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hidden"), 900);
  });

  /* -----------------------------
     MOBILE NAV
  ----------------------------- */
  function closeMenu() {
    menuToggle.classList.remove("open");
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  menuToggle.addEventListener("click", () => {
    const open = menuToggle.classList.toggle("open");
    navLinks.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
  }, { passive: true });

  /* -----------------------------
     REVEAL ON SCROLL
  ----------------------------- */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 5, 4) * 70}ms`;
    revealObserver.observe(el);
  });

  /* -----------------------------
     PROJECT CONSTELLATION
  ----------------------------- */
  const projects = {
    KainOS: {
      description: "A systems-oriented signal representing the low-level side of the laboratory: operating systems, architecture and the machinery beneath software.",
      url: "https://github.com/ManikShrivastav"
    },
    AlienSutra: {
      description: "The central transmission — the creative technology universe connecting AI, software, experiments and the Aliensutra identity.",
      url: "https://github.com/ManikShrivastav"
    },
    EOE: {
      description: "An experimental node from the broader project constellation. Select it as a starting point for the repository archive.",
      url: "https://github.com/ManikShrivastav"
    },
    MuktiNote: {
      description: "A project node in the Aliensutra archive, representing practical software experiments and ideas turned into something usable.",
      url: "https://github.com/ManikShrivastav"
    },
    MousePad: {
      description: "Another experimental repository in the constellation — part of the ongoing process of building, testing and learning.",
      url: "https://github.com/ManikShrivastav"
    }
  };

  const projectName = document.getElementById("projectName");
  const projectDescription = document.getElementById("projectDescription");
  const projectLink = document.getElementById("projectLink");

  document.querySelectorAll(".star-node").forEach(node => {
    node.addEventListener("click", () => {
      document.querySelectorAll(".star-node").forEach(n => n.classList.remove("active"));
      node.classList.add("active");

      const key = node.dataset.project;
      const project = projects[key];

      projectName.textContent = key.toUpperCase();
      projectDescription.textContent = project.description;
      projectLink.href = project.url;
    });
  });

  /* -----------------------------
     CONTACT FORM
     Static-site safe: builds a mailto.
     Replace this handler later with
     a Cloudflare Worker/Form endpoint
     if you want server-side delivery.
  ----------------------------- */
  const form = document.getElementById("contactForm");
  const modal = document.getElementById("successModal");
  const closeModal = document.getElementById("closeModal");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(`Aliensutra transmission from ${name}`);
    const body = encodeURIComponent(
      `Identifier: ${name}\nReturn frequency: ${email}\n\nTransmission:\n${message}`
    );

    window.location.href = `mailto:hello@aliensutra.com?subject=${subject}&body=${body}`;

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    form.reset();
  });

  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.getElementById("home").scrollIntoView({ behavior: "smooth" });
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal.click();
  });

  /* -----------------------------
     THREE.JS GALAXY
     No npm. No ES modules.
  ----------------------------- */
  if (window.THREE) {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040a, 0.00075);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      3000
    );
    camera.position.set(0, 0, 800);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;

    const galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

    /* Stars */
    const starCount = window.innerWidth < 700 ? 4200 : 7600;
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const r = 250 + Math.pow(Math.random(), .62) * 1150;
      const theta = Math.random() * Math.PI * 2;
      const spread = (Math.random() - .5) * (90 + r * .08);

      starPositions[i * 3] = Math.cos(theta) * r + spread;
      starPositions[i * 3 + 1] = (Math.random() - .5) * (r * .28);
      starPositions[i * 3 + 2] = Math.sin(theta) * r + spread;

      starSizes[i] = .5 + Math.random() * 2.2;

      const c = Math.random();
      if (c < .72) {
        starColors[i] = .75;
        starColors[i + 1] = .9;
        starColors[i + 2] = 1;
      } else if (c < .88) {
        starColors[i] = .45;
        starColors[i + 1] = .65;
        starColors[i + 2] = 1;
      } else {
        starColors[i] = 1;
        starColors[i + 1] = .55;
        starColors[i + 2] = .9;
      }
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: .85,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    galaxyGroup.add(stars);

    /* Galaxy dust */
    const dustCount = window.innerWidth < 700 ? 1400 : 2600;
    const dustPositions = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      const radius = Math.random() * 680;
      const angle = radius * .012 + Math.random() * Math.PI * 2;
      const arm = Math.floor(Math.random() * 4) * (Math.PI / 2);
      const noise = (Math.random() - .5) * 70;

      dustPositions[i * 3] = Math.cos(angle + arm) * radius + noise;
      dustPositions[i * 3 + 1] = (Math.random() - .5) * (radius * .12);
      dustPositions[i * 3 + 2] = Math.sin(angle + arm) * radius + noise;
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));

    const dustMaterial = new THREE.PointsMaterial({
      color: 0x287bff,
      size: 3,
      transparent: true,
      opacity: .11,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const dust = new THREE.Points(dustGeometry, dustMaterial);
    galaxyGroup.add(dust);

    /* Central alien beacon */
    const beacon = new THREE.Group();
    beacon.position.set(150, -20, -120);
    scene.add(beacon);

    const beaconGeo = new THREE.SphereGeometry(52, 32, 32);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0x00d9ff,
      wireframe: true,
      transparent: true,
      opacity: .08
    });
    beacon.add(new THREE.Mesh(beaconGeo, beaconMat));

    const beaconRing = new THREE.Mesh(
      new THREE.TorusGeometry(82, 1, 8, 100),
      new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: .18
      })
    );
    beaconRing.rotation.x = Math.PI / 2;
    beacon.add(beaconRing);

    /* Tiny floating particles near foreground */
    const particleCount = window.innerWidth < 700 ? 100 : 180;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - .5) * 1100;
      particlePos[i * 3 + 1] = (Math.random() - .5) * 700;
      particlePos[i * 3 + 2] = (Math.random() - .5) * 800;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x8defff,
      size: 1.8,
      transparent: true,
      opacity: .5,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    /* Interaction */
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let scrollTarget = 0;
    let scrollCurrent = 0;

    function updatePointer(clientX, clientY) {
      pointer.tx = (clientX / window.innerWidth - .5) * 2;
      pointer.ty = (clientY / window.innerHeight - .5) * 2;
    }

    window.addEventListener("mousemove", e => updatePointer(e.clientX, e.clientY), { passive: true });

    window.addEventListener("touchmove", e => {
      if (e.touches[0]) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    window.addEventListener("scroll", () => {
      scrollTarget = window.scrollY;
    }, { passive: true });

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      pointer.x += (pointer.tx - pointer.x) * .035;
      pointer.y += (pointer.ty - pointer.y) * .035;
      scrollCurrent += (scrollTarget - scrollCurrent) * .025;

      galaxyGroup.rotation.y = elapsed * .006 + pointer.x * .045;
      galaxyGroup.rotation.x = pointer.y * .018;

      stars.rotation.z = elapsed * .004;
      dust.rotation.y = elapsed * .0025;

      particles.rotation.y = -elapsed * .003;
      particles.rotation.x = pointer.y * .03;

      beacon.rotation.y = elapsed * .25;
      beacon.rotation.x = Math.sin(elapsed * .35) * .2;

      camera.position.x += ((pointer.x * 28) - camera.position.x) * .025;
      camera.position.y += ((-pointer.y * 18) - camera.position.y) * .025;
      camera.position.z = 800 - Math.min(scrollCurrent * .035, 120);

      camera.lookAt(0, 0, -80);

      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  } else {
    console.warn("Three.js did not load. The interface will still work without the 3D background.");
  }
})();
