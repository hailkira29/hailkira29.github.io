// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function () {
  const dmBtn = document.getElementById('darkmode-toggle');
  if (dmBtn) {
    let dark = true;
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
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('nav-active');
    } else {
      link.classList.remove('nav-active');
    }
  });
});

// Fade-in Animations with GSAP
document.addEventListener('DOMContentLoaded', function () {
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

// 3D Battery Model (Home Page)
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
    renderer.setClearColor(0x111217, 0);
    renderer.setSize(window.innerWidth, 400);

    const tubeGeo = new THREE.CylinderGeometry(1, 1, 3.5, 48);
    const tubeMat = new THREE.MeshPhysicalMaterial({ color: 0x22d3ee, metalness: 0.7, roughness: 0.2, clearcoat: 0.2, reflectivity: 0.25 });
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

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.1, 0.05, 16, 50),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.2 })
    );
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    const pGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const pMat = new THREE.MeshBasicMaterial({ color: 0xa7f3d0 });
    particles = [];
    for (let i = 0; i < 30; ++i) {
      let p = new THREE.Mesh(pGeo, pMat.clone());
      p.position.x = Math.sin(i / 5) * 0.5 + (Math.random() - 0.5) * 0.1;
      p.position.y = 2 - 0.1 * i + Math.random() * 0.1;
      p.position.z = Math.cos(i / 6) * 0.4 + (Math.random() - 0.5) * 0.1;
      scene.add(p);
      particles.push(p);
    }
    for (let i = 0; i < 15; ++i) {
      let rp = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), new THREE.MeshBasicMaterial({ color: 0x38bdf8, opacity: 0.4, transparent: true }));
      rp.position.x = Math.sin(Math.PI * i / 6) * 1.6;
      rp.position.y = Math.cos(Math.PI * i / 7) * 1.4;
      rp.position.z = Math.cos(Math.PI / 2 * i / 6) * 1.7;
      scene.add(rp);
      particles.push(rp);
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
      cap.position.y = 1.85 + Math.cos(t + 1) * 0.05;
      termP.position.y = 1.95 + Math.cos(t + 2) * 0.05;
      termN.position.y = -1.85 + Math.cos(t - 2) * 0.05;

      particles.forEach((p, j) => {
        if (j < 30) {
          p.position.y -= 0.01 + 0.002 * Math.sin(j + t * 2);
          if (p.position.y < -1.8) p.position.y = 1.9;
          p.material.color.setHSL(0.47 + 0.1 * Math.cos(t * 1.2 + j), 1, 0.6);
        } else {
          p.position.x += Math.sin(j + t) * 0.005;
          p.position.z += Math.cos(j + t) * 0.006;
        }
      });
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    canvas.addEventListener("mousemove", function (e) {
      if (!canvas) return;
      const relX = (e.offsetX / canvas.width - 0.5) * 2;
      rotTarget = relX * Math.PI * 0.3;
    });
    canvas.addEventListener("mouseleave", function () { rotTarget = 0; });
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

// Experience Timeline (Experience Page)
if (document.getElementById('timeline3D')) {
  document.addEventListener("DOMContentLoaded", function () {
    var tChart = echarts.init(document.getElementById('timeline3D'));
    let years = [
      { label: 'App & Software Developer', name: 'LXInstruments GmbH', y: 2024, color: '#38bdf8', desc: 'C# WPF platform, SQL databank, 30% UI boost, 40% faster queries' },
      { label: 'Master Thesis', name: 'SoH Estimation (EIS)', y: 2023.5, color: '#facc15', desc: 'MATLAB/Simulink, ±5% SoH accuracy, 10K impedance profiles' },
      { label: 'Battery Test Intern', name: 'LXInstruments GmbH', y: 2023, color: '#f472b6', desc: 'C# PCAN scripts, 15% throughput increase, safety watchdog' },
      { label: 'Dev Engineer Intern', name: 'Wacker Neuson', y: 2022.6, color: '#34d399', desc: 'MATLAB KPI extractor, 15% accuracy, 30% faster analysis' },
      { label: 'Mechanical Engineer', name: 'Nangia Motors', y: 2018.6, color: '#818cf8', desc: 'SolidWorks drivetrain design, stress analysis' }
    ];
    let sy = [2024, 2023.5, 2023, 2022.6, 2018.6];
    let ypos = [80, 160, 220, 280, 340];
    tChart.setOption({
      grid: { left: 50, right: 20, top: 20, bottom: 20 },
      xAxis: { show: false, min: 0, max: 1 },
      yAxis: { type: 'value', min: 2018, max: 2025, splitLine: { show: false }, axisLine: { show: false }, axisLabel: { show: false } },
      series: [
        {
          type: 'scatter',
          symbolSize: 35,
          data: sy.map((y, i) => [0.5, years[i].y, 0]),
          itemStyle: { color: params => years[params.dataIndex].color, shadowBlur: 15, shadowColor: '#38bdf8' },
          emphasis: { itemStyle: { shadowBlur: 30 } },
          label: { show: true, position: 'top', formatter: params => `${years[params.dataIndex].label}\n(${years[params.dataIndex].y})`, fontWeight: 'bold', color: '#22d3ee', fontSize: 14 }
        },
        {
          name: 'Timeline',
          type: 'bar',
          barWidth: 5,
          data: sy.map((y, i) => ({ value: years[i].y, itemStyle: { opacity: 0 } })),
          zlevel: -1
        }
      ],
      graphic: [
        ...years.map((y, i) => ({
          type: 'rect', left: '50', top: ypos[i], shape: { width: 500, height: 38 },
          style: { fill: '#0e1114cc', stroke: y.color, lineWidth: 2, shadowColor: y.color, shadowBlur: 6 },
          z: 10,
          children: [
            { type: 'text', left: 12, top: 8, style: { text: `${y.name} | ${y.desc}`, fill: '#e0f2fe', font: 'bold 14px Inter, Arial' } }
          ]
        }))
      ],
      tooltip: { formatter: params => years[params.dataIndex].desc, backgroundColor: '#18181b' }
    });
    window.addEventListener('resize', () => { tChart.resize(); });
  });
}

// Skills Chart (Skills Page)
if (document.getElementById('skillsChart')) {
  document.addEventListener("DOMContentLoaded", function () {
    const data = {
      labels: ["C#/.NET", "MATLAB/Simulink", "Python", "SQL", "SolidWorks", "EIS", "CAN/BMU"],
      datasets: [{
        axis: 'y',
        label: "Proficiency",
        data: [92, 90, 85, 80, 75, 95, 88],
        fill: true,
        backgroundColor: [
          'rgba(34,211,238,0.9)',
          'rgba(16,185,129,0.8)',
          'rgba(250,204,21,0.8)',
          'rgba(59,130,246,0.9)',
          'rgba(168,162,158,0.8)',
          'rgba(249,115,22,0.9)',
          'rgba(52,211,153,0.9)'
        ],
        borderRadius: 8,
        borderWidth: 0
      }]
    };
    const options = {
      indexAxis: 'y',
      animation: { duration: 1500, easing: "easeOutQuart" },
      plugins: { legend: { display: false }, tooltip: { enabled: true } },
      scales: {
        x: { min: 0, max: 100, display: false, grid: { color: '#0ea5e9' }, ticks: { color: '#38bdf8', font: { size: 12 } } },
        y: { grid: { color: "#334155" }, ticks: { color: '#a7f3d0', font: { size: 12 } } }
      }
    };
    const ctx = document.getElementById('skillsChart').getContext('2d');
    new Chart(ctx, { type: 'bar', data, options });
  });
}

// Skills Network (Skills Page)
if (document.getElementById('skillsNetwork')) {
  document.addEventListener("DOMContentLoaded", function () {
    var gChart = echarts.init(document.getElementById('skillsNetwork'));
    gChart.setOption({
      tooltip: { show: true, formatter: function (p) { return p.data.label || p.name; } },
      series: [{
        type: 'graph',
        layout: 'force',
        roam: true,
        symbol: 'circle',
        force: { repulsion: 100, gravity: 0.15 },
        label: { show: true, color: '#111217', fontWeight: 600, fontSize: 12, position: 'right', formatter: '{b}' },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 8],
        data: [
          { name: 'Battery Tech', value: 90, symbolSize: 45, itemStyle: { color: '#22d3ee' }, label: 'Battery Tech' },
          { name: 'Software', value: 85, symbolSize: 40, itemStyle: { color: '#34d399' }, label: 'Software' },
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
          { source: 'Software', target: 'SolidWorks' },
          { source: 'Battery Tech', target: 'Software' }
        ],
        lineStyle: { color: '#e0e7ef', opacity: 0.8 },
        focusNodeAdjacency: true,
        emphasis: { itemStyle: { shadowBlur: 15, shadowColor: '#0ea5e9' } }
      }]
    });
    window.addEventListener('resize', () => { gChart.resize(); });
  });
}

// Battery SoH Chart (Projects Page)
if (document.getElementById('battery-chart')) {
  document.addEventListener("DOMContentLoaded", function () {
    var bChart = echarts.init(document.getElementById('battery-chart'));
    function randomSoH() {
      let x = [], y = [];
      let soh = 100, drift = Math.random() * 2;
      for (let i = 0; i < 30; ++i) {
        x.push(i + 1);
        let noise = Math.sin(i * 0.15 + drift) * 0.6 + (Math.random() - 0.5) * 1.2;
        soh -= 2 + Math.random();
        y.push(Math.max(soh + noise, 0));
      }
      return { cycle: x, soh: y };
    }
    let fakeData = randomSoH();
    bChart.setOption({
      grid: { left: 40, right: 20, top: 30, bottom: 30 },
      xAxis: { type: 'category', data: fakeData.cycle, name: 'Cycle', axisLine: { lineStyle: { color: '#38bdf8' } }, axisLabel: { color: '#a7f3d0', fontWeight: 600 } },
      yAxis: { type: 'value', min: 0, max: 100, name: 'SoH %', axisLine: { lineStyle: { color: '#38bdf8' } }, axisLabel: { color: '#a7f3d0', fontWeight: 600 } },
      series: [
        {
          data: fakeData.soh,
          type: 'line',
          smooth: true,
          lineStyle: { width: 4, color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: '#f59e42' }, { offset: 1, color: '#0ea5e9' }]) },
          areaStyle: { color: 'rgba(16,185,129,0.1)' },
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: { color: '#34d399', shadowColor: '#0ea5e9', shadowBlur: 12 }
        },
        {
          type: 'line',
          data: fakeData.cycle.map(() => 60),
          lineStyle: { type: 'dashed', color: '#f43f5e', width: 2 },
          showSymbol: false,
          label: { show: false }
        }
      ],
      tooltip: { trigger: 'axis', backgroundColor: '#18181b', borderColor: '#38bdf8', textStyle: { color: '#a7f3d0' } }
    });
    window.addEventListener('resize', () => { bChart.resize(); });
  });
}
