export const filtrarActividadAlumno = (actividades = [], id) => {
    // let index = actividades.findIndex(x => x.consigna === 'C# '); 
    let actlenght = actividades.length
    let data = '' 
    const resultado = []
    
    // let index = actividades.alumnos[1].idAlumno.indexOf(user.uid);
    // let index = actividades.alumnos.findIndex(x => x.idAlumno === id);
    // const actividadesUsuario = actividades.filter(function (filtObj) {return filtObj.alumnos[index].idAlumno === id;})

    for (var i = 0; i < actlenght; i++) {
        data = actividades[i].alumnos
        let filtered = data.filter((filtObj) => filtObj.idAlumno === id)
            for(var e = 0; e < filtered.length; e++){
                if (filtered[e].idAlumno === id){
                    // console.log (actividades[i])
                    resultado.push(actividades[i])
                }
        }
      }

    console.log(resultado)
    
    return resultado

};