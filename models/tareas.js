const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasDB(tarea = []) {
    tarea.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);

    this._listado[tarea.id] = tarea;
  }

  listarTareas(tareas = []) {
    tareas.forEach(({ desc, completadoEn }, index) => {
      if (completadoEn !== null) {
        completadoEn = "Completada".green;
      } else {
        completadoEn = "Pendiente".red;
      }
      console.log(`${index + 1}: ${desc} :: Tarea: ${completadoEn}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    console.log();
    let contador = 0;

    this.listadoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      const estado = completadoEn ? "Completada".green : "Pendiente".red;
      if (completadas) {
        if (completadoEn) {
          contador += 1;
          console.log(`${contador.toString().green}. ${desc} :: ${estado}`);
        }
      } else {
        if (!completadoEn) {
          contador += 1;
          console.log(`${contador.toString().green}. ${desc} :: ${estado}`);
        }
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
