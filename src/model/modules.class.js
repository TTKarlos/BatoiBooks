import Module from "./module.class.js";
import { getDBModules,} from '../services/modules.api.js'

export default class modules{
    constructor() {
        this.data = [];
    }

    async populate() { 
        const modulos = await getDBModules();
        for (const modulo of modulos) {
            this.data.push(new Module(
                modulo.code, 
                modulo.cliteral, 
                modulo.vliteral, 
                modulo.courseId
            ));
        }
    }

    
    toString() {
        let toString = 'Modulos: '
        this.data.forEach(modulo => {
            toString += modulo.toString()
        });
        return toString;
    }

    getModuleByCode(moduleCode) {
        const module = this.data.find(modulo => moduleCode === modulo.code);
        if(module) {
            return module;
        }
        throw "No se ha encontrado ningun modulo con este codigo";
    }


}