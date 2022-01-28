const inquirer = require('inquirer');
require('colors');

const menuOpt = [
    {
        type: 'list',
        name: 'opcion',
        message: 'que desea hacer?',
        choices: [
            {
                value: '1',
                name: '1'.green +'. Crear Tarea'
            },
            {
                value: '2',
                name: '2'.green +'. Listar tareas'
            },
            {
                value: '3',
                name: '3'.green +'. Listar tareas completas'
                
            },
            {
                value: '4',
                name: '4'.green +'. Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5'.green +'. Completar tarea(s)'
            },
            {
                value: '6',
                name: '6'.green+'. Borrar tarea'
            },
            {
                value: '0',
                name: '0'.green+'. SALIR'
            }
        ]
    }
]



const inquirerMenu = async () => {

    console.clear();
    console.log('=========================');
    console.log('  Seleccione una opcion  '.bgWhite.black);
    console.log('=========================');

    const {opcion} = await inquirer.prompt(menuOpt);

    return opcion;

}

const pausa = async () => {
    
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]

    console.log();
    await inquirer.prompt(question);
    
}

const leerInput = async(mensaje) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
                
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTereasBorrar = async( tareas = []) => {

    const choices = tareas.map( (tarea, index) => {

        const idx = `${index + 1}`

        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }

    } );

    choices.unshift({
        value:'0',
        name: '0.'.green + 'Cancelar'
    })

    const optBorrar = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(optBorrar);

    return id;
}

const  confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheck = async( tareas = []) => {

    const choices = tareas.map( (tarea, index) => {

        const idx = `${index + 1}.`

        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn)? true: false
        }

    } );

    choices.unshift({
        value:'0',
        name: '0.'.green + 'Cancelar'
    })

    const optBorrar = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(optBorrar);

    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTereasBorrar,
    confirmar,
    mostrarListadoCheck
}
