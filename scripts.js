// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function () {
  const dmBtn = document.getElementById('darkmode-toggle');
  if (dmBtn) {
    let dark = localStorage.getItem('darkMode') !== 'false';
    if (!dark) {
      document.body.classList.add('darkmode-off');
      document.body.classList.remove('darkmode-on');
      dmBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    dmBtn.addEventListener('click', function () {
      dark = !dark;
      if (dark) {
        document.body.classList.add('darkmode-on');
        document.body.classList.remove('darkmode-off');
        dmBtn.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        document.body.classList.add('darkmode-off');
        document.body.classList.remove('darkmode-on');
        dmBtn.innerHTML = '<i class="fas fa-sun"></i>';
      }
      localStorage.setItem('darkMode', dark);
    });
  }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function () {
      mobileMenu.classList.toggle('active');
      const isActive = mobileMenu.classList.contains('active');
      mobileMenuToggle.innerHTML = isActive ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
  }
});

// Navigation Active Link
document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 60) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('nav-active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('nav-active');
      }
    });
  });
});

// GSAP Scroll Animations
document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.fadein-up').forEach(el => {
    gsap.fromTo(el, { opacity: 0, y: 50 }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
});

// 3D Battery Model (Hero Section)
if (document.getElementById('scene-bg')) {
  let scene, camera, renderer, battery, cap, termP, termN, particles = [];
  function init3D() {
    const canvas = document.getElementById('scene-bg');
    canvas.width = window.innerWidth;
    canvas.height = 400;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(43, window.innerWidth / 400, 0.1, 1000);
    camera.position.set(1.3, 1, 5);
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, 400);

    const tubeGeo = new THREE.CylinderGeometry(1, 1, 3.5, 48);
    const tubeMat = new THREE.MeshPhysicalMaterial({ color: 0x22d3ee, metalness: 0.7, roughness: 0.2 });
    battery = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(battery);

    cap = new THREE.Mesh(
      new THREE.CylinderGeometry(1.01, 1.01, 0.2, 36),
      new THREE.MeshPhysicalMaterial({ color: 0xfbbf24, metalness: 0.9, roughness: 0.1 })
    );
    cap.position.y = 1.85;
    scene.add(cap);

    termP = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.35, 0.1, 24),
      new THREE.MeshStandardMaterial({ color: 0xfef9c3, metalness: 0.7, roughness: 0.15 })
    );
    termP.position.y = 1.95;
    scene.add(termP);

    termN = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 0.1, 24),
      new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.7, roughness: 0.2 })
    );
    termN.position.y = -1.85;
    scene.add(termN);

    for (let i = 0; i < 30; i++) {
      let p = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xa7f3d0 })
      );
      p.position.x = Math.sin(i / 5) * 0.5 + (Math.random() - 0.5) * 0.1;
      p.position.y = 2 - 0.1 * i + Math.random() * 0.1;
      p.position.z = Math.cos(i / 6) * 0.4 + (Math.random() - 0.5) * 0.1;
      scene.add(p);
      particles.push(p);
    }

    scene.add(new THREE.HemisphereLight(0x33eedd, 0x223366, 1.1));
    scene.add(new THREE.SpotLight(0xffffff, 2, 20, Math.PI / 4, 0.5, 1).position.set(3, 8, 8));

    let rotTarget = 0, lerpRot = 0;
    function animate() {
      lerpRot += (rotTarget - lerpRot) * 0.1;
      battery.rotation.y = lerpRot;
      cap.rotation.y = termP.rotation.y = termN.rotation.y = lerpRot;
      let t = Date.now() * 0.001;
      battery.position.y = Math.sin(t) * 0.1;
      particles.forEach((p, j) => {
        p.position.y -= 0.01 + 0.002 * Math.sin(j + t * 2);
        if (p.position.y < -1.8) p.position.y = 1.9;
      });
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    canvas.addEventListener("mousemove", function (e) {
      const relX = (e.offsetX / canvas.width - 0.5) * 2;
      rotTarget = relX * Math.PI * 0.3;
    });
  }
  window.addEventListener('resize', () => {
    const canvas = document.getElementById('scene-bg');
    if (canvas && renderer && camera) {
      canvas.width = window.innerWidth;
      renderer.setSize(window.innerWidth, 400);
      camera.aspect = window.innerWidth / 400;
      camera.updateProjectionMatrix();
    }
  });
  setTimeout(init3D, 400);
}

// Skills Chart
if (document.getElementById('skillsChart')) {
  document.addEventListener("DOMContentLoaded", function () {
    const data = {
      labels: ["C#/.NET", "MATLAB", "Python", "SQL", "SolidWorks", "EIS", "CAN"],
      datasets: [{
        axis: 'y',
        label: "Proficiency",
        data: [92, 90, 85, 80, 75, 95, 88],
        fill: true,
        backgroundColor: ['#22d3ee', '#16b982', '#facc15', '#3b82f6', '#a8a29e', '#f97316', '#34d399'],
        borderRadius: 8,
        borderWidth: 0
      }]
    };
    const options = {
      indexAxis: 'y',
      animation: { duration: 1500, easing: "easeOutQuart" },
      plugins: { legend: { display: false } },
      scales: {
        x: { min: 0, max: 100, display: false },
        y: { ticks: { color: '#a7f3d0', font: { size: 12 } } }
      }
    };
    const ctx = document.getElementById('skillsChart').getContext('2d');
    new Chart(ctx, { type: 'bar', data, options });
  });
}

// Skills Network
if (document.getElementById('skillsNetwork')) {
  document.addEventListener("DOMContentLoaded", function () {
    var gChart = echarts.init(document.getElementById('skillsNetwork'));
    gChart.setOption({
      series: [{
        type: 'graph',
        layout: 'force',
        roam: true,
        symbol: 'circle',
        force: { repulsion: 100, gravity: 0.15 },
        label: { show: true, color: '#e2e8f0', fontWeight: 600, fontSize: 12 },
        edgeSymbol: ['circle', 'arrow'],
        data: [
          { name: 'Battery Tech', value: 90, symbolSize: 45, itemStyle: { color: '#22d3ee' } },
          { name: 'Software', value: 85, symbolSize: 40, itemStyle: { color: '#34d399' } },
          { name: 'C#', value: 80, symbolSize: 35, itemStyle: { color: '#facc15' } },
          { name: 'MATLAB', value: 75, symbolSize: 35, itemStyle: { color: '#818cf8' } },
          { name: 'Python', value: 70, symbolSize: 30, itemStyle: { color: '#a3e635' } },
          { name: 'SQL', value: 65, symbolSize: 25, itemStyle: { color: '#06b6d4' } },
          { name: 'SolidWorks', value: 60, symbolSize: 25, itemStyle: { color: '#f472b6' } },
          { name: 'EIS/CAN', value: 70, symbolSize: 30, itemStyle: { color: '#fb923c' } }
        ],
        links: [
          { source: 'Battery Tech', target: 'EIS/CAN' },
          { source: 'Battery Tech', target: 'MATLAB' },
          { source: 'Software', target: 'C#' },
          { source: 'Software', target: 'Python' },
          { source: 'Software', target: 'SQL' },
          { source: 'MATLAB', target: 'EIS/CAN' },
          { source: 'Software', target: 'SolidWorks' }
        ],
        lineStyle: { color: '#e0e7ef', opacity: 0.8 }
      }]
    });
    window.addEventListener('resize', () => { gChart.resize(); });
  });
}

// Battery SoH Chart
if (document.getElementById('battery-chart')) {
  document.addEventListener("DOMContentLoaded", function () {
    var bChart = echarts.init(document.getElementById('battery-chart'));
    function randomSoH() {
      let x = [], y = [];
      let soh = 100;
      for (let i = 0; i < 30; i++) {
        x.push(i + 1);
        soh -= 2 + Math.random();
        y.push(Math.max(soh, 0));
      }
      return { cycle: x, soh: y };
    }
    let fakeData = randomSoH();
    bChart.setOption({
      grid: { left: 40, right: 20, top: 30, bottom: 30 },
      xAxis: { type: 'category', data: fakeData.cycle, name: 'Cycle', axisLabel: { color: '#a7f3d0' } },
      yAxis: { type: 'value', min: 0, max: 100, name: 'SoH %', axisLabel: { color: '#a7f3d0' } },
      series: [{
        data: fakeData.soh,
        type: 'line',
        smooth: true,
        lineStyle: { width: 4, color: '#0ea5e9' },
        areaStyle: { color: 'rgba(16,185,129,0.1)' },
        symbol: 'circle',
        symbolSize: 8,
        itemStyle: { color: '#34d399' }
      }]
    });
    window.addEventListener('resize', () => { bChart.resize(); });
  });
}
