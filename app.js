const fs = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const argv = yargs(hideBin(process.argv));

const cargarTareas = () => {
  try {
    const dataBuffer = fs.readFileSync("tareas.json");
    return JSON.parse(dataBuffer.toString());
  } catch (error) {
    return [];
  }
};

const guardarTareas = (tareas) => {
  fs.writeFileSync("tareas.json", JSON.stringify(tareas, null, 2));
};

argv.command({
  command: "crear",
  describe: "Crea una nueva tarea",
  builder: {
    titulo: {
      describe: "Título de la tarea",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    try {
      const tareas = cargarTareas();
      tareas.push({ titulo: argv.titulo });
      guardarTareas(tareas);
      console.log(`Tarea "${argv.titulo}" creada correctamente.`);
    } catch (error) {
      console.error("Error al crear la tarea.");
    }
  },
});

argv.help().parse();
