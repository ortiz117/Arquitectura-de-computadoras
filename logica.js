document.addEventListener('DOMContentLoaded', () => {
            const appScreen = document.getElementById('app-screen');
            const navButtons = document.querySelectorAll('.nav-button');
            const clickSound = document.getElementById('clickSound');

            // ============================================
            // AQUÍ PUEDES CAMBIAR LOS NOMBRES DE LOS TRABAJOS
            // ============================================
            const trabajos = [
                {
                    nombre: "TRABAJO 1 - BUSES",  // CAMBIAR AQUÍ
                    descripcion: "DIAGRAMA INTERACTIVO DE BUSES",
                    url: "https://ortiz117.github.io/Buses/"  // CAMBIAR POR LA URL DEL TRABAJO
                },
                {
                    nombre: "TRABAJO 2 - NOMBRE DEL PROYECTO",  // CAMBIAR AQUÍ
                    descripcion: "Descripción corta del trabajo 2",
                    url: "dos.html"  // CAMBIAR POR LA URL DEL TRABAJO
                }
            ];
            // ============================================

            const screensContent = {
                'home-screen': `
                    <h2><span style="color:var(--fallout-highlight);">W</span>ELCOME, <span style="color:var(--fallout-highlight);">V</span>AULT <span style="color:var(--fallout-highlight);">D</span>WELLER</h2>
                    <p>Sistema Pip-Boy versión 3000 Mark IV inicializado correctamente.</p>
                    <p>Este terminal contiene todos los proyectos y trabajos académicos.</p>
                    <p style="margin-top: 20px; padding: 15px; background-color: rgba(100, 255, 100, 0.1); border-left: 3px solid var(--fallout-highlight);">
                        <strong>MISIÓN ACTUAL:</strong> Explorar módulo de proyectos y revisar trabajos completados.
                    </p>
                    <ul style="margin-top: 20px;">
                        <li>ESTADO DEL SISTEMA: <span style="color:var(--fallout-highlight);">OPERACIONAL</span></li>
                        <li>PROYECTOS CARGADOS: <span style="color:var(--fallout-highlight);">${trabajos.length}</span></li>
                        <li>ÚLTIMA ACTUALIZACIÓN: <span style="color:var(--fallout-highlight);">${new Date().toLocaleDateString()}</span></li>
                    </ul>
                `,
                'projects-screen': `
                    <h2><span style="color:var(--fallout-highlight);">P</span>ROYECTOS <span style="color:var(--fallout-highlight);">A</span>CADÉMICOS</h2>
                    <p>[ LISTA DE TRABAJOS COMPLETADOS ]</p>
                    <p style="margin-bottom: 25px;">Selecciona un proyecto para ver los detalles:</p>
                    <div id="projects-list"></div>
                `,
                'about-screen': `
                    <h2><span style="color:var(--fallout-highlight);">A</span>BOUT</h2>
                    <p><strong>TERMINAL INFO:</strong></p>
                    <ul>
                        <li>Sistema: Pip-Boy 3000 Mark IV</li>
                        <li>Propósito: Portfolio de trabajos académicos</li>
                        <li>Versión: 1.0</li>
                        <li>Estado: Completamente operacional</li>
                    </ul>
                    <p style="margin-top: 25px;"><strong>VAULT-TEC PRESENTA:</strong></p>
                    <p>Este terminal ha sido diseñado para organizar y presentar trabajos de manera eficiente. Cada proyecto puede ser accedido desde el módulo PROJECTS.</p>
                    <p style="margin-top: 20px; color: var(--fallout-highlight);">"El futuro empieza hoy" - Vault-Tec Industries</p>
                `
            };

            function loadScreen(screenId) {
                appScreen.innerHTML = screensContent[screenId];
                
                // Si estamos en la pantalla de proyectos, cargar los botones
                if (screenId === 'projects-screen') {
                    const projectsList = document.getElementById('projects-list');
                    trabajos.forEach((trabajo, index) => {
                        const button = document.createElement('button');
                        button.className = 'work-button';
                        button.innerHTML = `
                            <div>
                                <div style="font-size: 0.8em; color: var(--fallout-highlight);">PROYECTO ${index + 1}</div>
                                <div>${trabajo.nombre}</div>
                                <div style="font-size: 0.85em; opacity: 0.8; margin-top: 5px;">${trabajo.descripcion}</div>
                            </div>
                        `;
                        button.onclick = () => {
                            if (trabajo.url !== '#') {
                                window.open(trabajo.url, '_blank');
                            } else {
                                alert('Proyecto aún no disponible');
                            }
                        };
                        projectsList.appendChild(button);
                    });
                }

                // Actualizar fecha
                const dateSpan = document.querySelector('.pipboy-date');
                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                dateSpan.textContent = `${year}.${month}.${day}`;
            }

            navButtons.forEach(button => {
                button.addEventListener('click', () => {
                    if (clickSound) {
                        clickSound.currentTime = 0;
                        clickSound.play().catch(e => console.log('Audio play failed:', e));
                    }

                    navButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    const targetScreen = button.dataset.target;
                    loadScreen(targetScreen);
                });
            });

            loadScreen('home-screen');
        });