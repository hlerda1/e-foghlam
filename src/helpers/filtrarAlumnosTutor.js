export const filtrarAlumnosTutor = (alumnos = [], id) => {
    // let index = alumnos.findIndex(x => x.consigna === 'C# '); 
    let alumnolenght = alumnos.length
    let tutorLenght
    
    let data = '' 
    const data1 = []
    const resultado = []

    for (var i = 0; i < alumnolenght; i++) {
        tutorLenght = alumnos[i].tutorAsignado.length; 
        for (var u = 0; u < tutorLenght; u++) {
            data1.push(alumnos[i].tutorAsignado[u]); 
            for (var m = 0; m < data1.length; m++) {
                if (data1[m] === id)
                    resultado.push(alumnos[i]);
                }
            }
            // console.log(resultado)
            return resultado
            }
};