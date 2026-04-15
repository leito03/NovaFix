// =========================
// OPCIONES DINAMICAS
// =========================
function cambiarOpciones() {
    const reparacion = document.getElementById("reparacion").value;
    const modelo = document.getElementById("modelo").value;
    const contenedor = document.getElementById("opcionesExtra");

    contenedor.innerHTML = "";

    if (reparacion === "Pantalla") {

        const select = document.createElement("select");
        select.id = "calidad";

        const modelosViejos = [
            "iPhone 6","iPhone 7","iPhone 8",
            "iPhone X","iPhone XR","iPhone 11"
        ];

        if (modelosViejos.includes(modelo)) {
            select.innerHTML = `<option value="Incell">Incell</option>`;
        } else {
            select.innerHTML = `
                <option value="">Calidad</option>
                <option value="Incell">Incell</option>
                <option value="OLED">OLED</option>
                <option value="Original">Original</option>
            `;
        }

        contenedor.appendChild(select);
    }

    if (reparacion === "Batería") {
        const select = document.createElement("select");
        select.id = "calidad";

        select.innerHTML = `
            <option value="">Tipo batería</option>
            <option value="Ampsentrix">Ampsentrix</option>
            <option value="Original">Original</option>
        `;

        contenedor.appendChild(select);
    }
}

// =========================
// COTIZADOR + CLIENTES
// =========================
function cotizar() {
    const nombre = document.getElementById("nombreCliente").value;
    const telefono = document.getElementById("telefonoCliente").value;
    const modelo = document.getElementById("modelo").value;
    const reparacion = document.getElementById("reparacion").value;
    const calidad = document.getElementById("calidad")?.value;
    const resultado = document.getElementById("resultado");

    if (!nombre || !telefono || !modelo || !reparacion) {
        resultado.innerText = "Completá todo ❌";
        return;
    }

    const repuestos = {
        "iPhone 6": 13900,
        "iPhone 7": 13100,
        "iPhone 8": 12700,
        "iPhone X": 25900,
        "iPhone XR": 21800,
        "iPhone 11": 18700,
        "iPhone 12": 19900,
        "iPhone 13": 44500,
        "iPhone 14": 44500
    };

    const modelosViejos = ["iPhone 6","iPhone 7","iPhone 8","iPhone X","iPhone XR"];

    let precioFinal = 0;

    // PANTALLA
    if (reparacion === "Pantalla") {
        if (!calidad) {
            resultado.innerText = "Elegí calidad ❌";
            return;
        }

        let ganancia = modelosViejos.includes(modelo) ? 40000 : 95000;
        precioFinal = repuestos[modelo] + ganancia;

        const modelosModernos = ["iPhone 12","iPhone 13","iPhone 14"];

        if (calidad === "OLED" && modelosModernos.includes(modelo)) {
            precioFinal += 150000;
        }

        if (calidad === "Original" && modelosModernos.includes(modelo)) {
            precioFinal += 300000;
        }
    }

    // BATERIA
    if (reparacion === "Batería") {
        if (!calidad) {
            resultado.innerText = "Elegí batería ❌";
            return;
        }

        if (calidad === "Ampsentrix") precioFinal = 80000;
        if (calidad === "Original") precioFinal = 120000;
    }

    // CAMARA
    if (reparacion === "Cámara") {
        precioFinal = 90000;
    }

    // PIN DE CARGA
    if (reparacion === "Pin de carga") {
        precioFinal = 70000;
    }

    // 💾 GUARDAR CLIENTE
    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    clientes.push({
        nombre,
        telefono,
        modelo,
        reparacion,
        calidad,
        precio: precioFinal
    });

    localStorage.setItem("clientes", JSON.stringify(clientes));

    // 📲 RESULTADO
    resultado.innerHTML = `
        👤 ${nombre}<br>
        📱 ${modelo}<br>
        🔧 ${reparacion} ${calidad ? "- " + calidad : ""}<br><br>

        💰 Precio: $${precioFinal}<br><br>

        <a href="https://wa.me/5493426286319?text=Hola,%20soy%20${nombre},%20quiero%20hacer%20la%20reparacion%20de%20${modelo}%20(${reparacion}%20${calidad})%20por%20$${precioFinal}" target="_blank">
            <button>Reservar turno</button>
        </a>
    `;
}