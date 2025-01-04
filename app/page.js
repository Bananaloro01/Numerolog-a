'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';

export default function NumerologyApp() {
  const [birthDate, setBirthDate] = useState('');
  const [predictionYear, setPredictionYear] = useState('');
  const [results, setResults] = useState(null);

  // Arcanos dictionary
  const arcanos = {
    1: "El Mago", 2: "La Sacerdotisa", 3: "La Emperatriz", 4: "El Emperador",
    5: "El Sumo Sacerdote o El Jerarca", 6: "Los Enamorados o La Indecisión",
    7: "El Carro o El Triunfo", 8: "La Fuerza", 9: "El Ermitaño o El Eremita",
    10: "La Rueda de la Fortuna o La Retribución", 11: "La Justicia o La Persuasión",
    12: "El Colgado o El Apostolado", 13: "La Muerte o La Inmortalidad",
    14: "La Templanza o La Temperancia", 15: "El Diablo o La Pasión",
    16: "La Torre o La Fragilidad", 17: "La Estrella o La Esperanza",
    18: "La Luna o El Crepúsculo", 19: "El Sol o La Inspiración",
    20: "El Juicio o La Resurrección", 21: "El Mundo o La Transmutación",
    22: "El Loco o El Regreso", 23: "El Labrador", 24: "La Tejedora",
    25: "El Argonauta", 26: "El Prodigio", 27: "Lo Inesperado",
    28: "La Incertidumbre", 29: "La Domesticidad", 30: "Intercambio",
    31: "Impedimentos", 32: "Magnificencia", 33: "La Alianza",
    34: "La Innovación", 35: "Desconsuelo", 36: "La Iniciación",
    37: "Arte y Ciencia", 38: "Duplicidad", 39: "El Testimonio",
    40: "Presentimiento", 41: "Desasosiego", 42: "Preeminencia",
    43: "Alucinación", 44: "El Pensamiento", 45: "Regeneración",
    46: "El Patrimonio", 47: "Conjetura", 48: "Consumación",
    49: "Versatilidad", 50: "Afinidad", 51: "Asesoramiento",
    52: "Premeditación", 53: "Resentimiento", 54: "Examen",
    55: "Contrición", 56: "Peregrinaje", 57: "Rivalidad",
    58: "Recapacitación", 59: "Revelación", 60: "Evolución",
    61: "Soledad", 62: "Proscripción", 63: "Comunión",
    64: "Vehemencia", 65: "Aprendizaje", 66: "Perplejidad",
    67: "Amistad", 68: "Especulación", 69: "El Azar",
    70: "Cooperación", 71: "Avaricia", 72: "Purificación",
    73: "El Amor y el Deseo", 74: "La Ofrenda", 75: "Generosidad",
    76: "El Dispensador", 77: "Desorientación", 78: "Renacimiento"
};

  // Personal keys dictionary (simplified version)
  const clavesPersonales = {
    "01/01": 9, "02/01": 8, "03/01": 2, "04/01": 9, "05/01": 10,
    "06/01": 2, "07/01": 3, "08/01": 4, "09/01": 5, "10/01": 6,
    "11/01": 7, "12/01": 8, "13/01": 9, "14/01": 8, "15/01": 9,
    "16/01": 10, "17/01": 11, "18/01": 3, "19/01": 4, "20/01": 2,
    "21/01": 3, "22/01": 4, "23/01": 5, "24/01": 13, "25/01": 5,
    "26/01": 6, "27/01": 4, "28/01": 5, "29/01": 6, "30/01": 7,
    "31/01": 8, "01/02": 10, "02/02": 8, "03/02": 9, "04/02": 10,
    "05/02": 2, "06/02": 3, "07/02": 4, "08/02": 5, "09/02": 6,
    "10/02": 7, "11/02": 8, "12/02": 7, "13/02": 8, "14/02": 9,
    "15/02": 10, "16/02": 11, "17/02": 3, "18/02": 4, "19/02": 2,
    "20/02": 3, "21/02": 4, "22/02": 1, "23/02": 4, "24/02": 5,
    "25/02": 12, "26/02": 4, "27/02": 5, "28/02": 6, "29/02": 7,
    "01/03": 5, "02/03": 6, "03/03": 7, "04/03": 8, "05/03": 9,
    "06/03": 10, "07/03": 2, "08/03": 3, "09/03": 4, "10/03": 3,
    "11/03": 4, "12/03": 5, "13/03": 6, "14/03": 7, "15/03": 8,
    "16/03": 9, "17/03": 10, "18/03": 11, "19/03": 3, "20/03": 11,
    "21/03": 9, "22/03": 10, "23/03": 8, "24/03": 9, "25/03": 10,
    "26/03": 2, "27/03": 3, "28/03": 4, "29/03": 5, "30/03": 5,
    "31/03": 6, "01/04": 6, "02/04": 7, "03/04": 8, "04/04": 9,
    "05/04": 10, "06/04": 2, "07/04": 3, "08/04": 2, "09/04": 3,
    "10/04": 4, "11/04": 5, "12/04": 6, "13/04": 7, "14/04": 8,
    "15/04": 9, "16/04": 10, "17/04": 11, "18/04": 10, "19/04": 11,
    "20/04": 9, "21/04": 7, "22/04": 8, "23/04": 9, "24/04": 10,
    "25/04": 11, "26/04": 3, "27/04": 4, "28/04": 4, "29/04": 5,
    "30/04": 6, "01/05": 6, "02/05": 7, "03/05": 8, "04/05": 9,
    "05/05": 10, "06/05": 9, "07/05": 1, "08/05": 2, "09/05": 3,
    "10/05": 4, "11/05": 5, "12/05": 6, "13/05": 7, "14/05": 8,
    "15/05": 9, "16/05": 8, "17/05": 9, "18/05": 10, "19/05": 8,
    "20/05": 6, "21/05": 7, "22/05": 8, "23/05": 9, "24/05": 1,
    "25/05": 11, "26/05": 11, "27/05": 3, "28/05": 4, "29/05": 5,
    "30/05": 6, "31/05": 8, "01/06": 7, "02/06": 8, "03/06": 9,
    "04/06": 8, "05/06": 9, "06/06": 10, "07/06": 2, "08/06": 3,
    "09/06": 4, "10/06": 5, "11/06": 6, "12/06": 7, "13/06": 8,
    "14/06": 7, "15/06": 8, "16/06": 9, "17/06": 7, "18/06": 8,
    "19/06": 6, "20/06": 6, "21/06": 7, "22/06": 7, "23/06": 8,
    "24/06": 7, "25/06": 8, "26/06": 8, "27/06": 9, "28/06": 9,
    "29/06": 1, "30/06": 8, "01/07": 11, "02/07": 1, "03/07": 11,
    "04/07": 3, "05/07": 4, "06/07": 5, "07/07": 6, "08/07": 7,
    "09/07": 8, "10/07": 9, "11/07": 10, "12/07": 9, "13/07": 10,
    "14/07": 11, "15/07": 9, "16/07": 10, "17/07": 11, "18/07": 3,
    "19/07": 4, "20/07": 5, "21/07": 6, "22/07": 6, "23/07": 7,
    "24/07": 5, "25/07": 6, "26/07": 7, "27/07": 8, "28/07": 8,
    "29/07": 7, "30/07": 6, "31/07": 5, "01/08": 10, "02/08": 11,
    "03/08": 3, "04/08": 4, "05/08": 5, "06/08": 6, "07/08": 7,
    "08/08": 8, "09/08": 9, "10/08": 8, "11/08": 9, "12/08": 10,
    "13/08": 8, "14/08": 9, "15/08": 10, "16/08": 11, "17/08": 3,
    "18/08": 4, "19/08": 5, "20/08": 5, "21/08": 6, "22/08": 7,
    "23/08": 5, "24/08": 6, "25/08": 7, "26/08": 9, "27/08": 8,
    "28/08": 7, "29/08": 8, "30/08": 5, "31/08": 4, "01/09": 11,
    "02/09": 3, "03/09": 4, "04/09": 5, "05/09": 6, "06/09": 7,
    "07/09": 8, "08/09": 7, "09/09": 8, "10/09": 9, "11/09": 7,
    "12/09": 8, "13/09": 9, "14/09": 10, "15/09": 11, "16/09": 3,
    "17/09": 4, "18/09": 4, "19/09": 5, "20/09": 6, "21/09": 7,
    "22/09": 5, "23/09": 6, "24/09": 1, "25/09": 9, "26/09": 8,
    "27/09": 7, "28/09": 8, "29/09": 11, "30/09": 4, "01/10": 11,
    "02/10": 3, "03/10": 4, "04/10": 5, "05/10": 6, "06/10": 5,
    "07/10": 6, "08/10": 7, "09/10": 5, "10/10": 6, "11/10": 7,
    "12/10": 8, "13/10": 9, "14/10": 10, "15/10": 11, "16/10": 11,
    "17/10": 3, "18/10": 4, "19/10": 5, "20/10": 6, "21/10": 7,
    "22/10": 1, "23/10": 9, "24/10": 8, "25/10": 7, "26/10": 6,
    "27/10": 7, "28/10": 1, "29/10": 4, "30/10": 11, "31/10": 1,
    "01/11": 3, "02/11": 4, "03/11": 5, "04/11": 4, "05/11": 5,
    "06/11": 6, "07/11": 4, "08/11": 5, "09/11": 6, "10/11": 7,
    "11/11": 8, "12/11": 9, "13/11": 10, "14/11": 10, "15/11": 11,
    "16/11": 3, "17/11": 4, "18/11": 5, "19/11": 6, "20/11": 5,
    "21/11": 1, "22/11": 9, "23/11": 8, "24/11": 7, "25/11": 6,
    "26/11": 7, "27/11": 1, "28/11": 4, "29/11": 7, "30/11": 1,
    "01/12": 3, "02/12": 2, "03/12": 3, "04/12": 4, "05/12": 2,
    "06/12": 3, "07/12": 4, "08/12": 5, "09/12": 6, "10/12": 7,
    "11/12": 8, "12/12": 8, "13/12": 9, "14/12": 10, "15/12": 11,
    "16/12": 3, "17/12": 4, "18/12": 5, "19/12": 4, "20/12": 12,
    "21/12": 8, "22/12": 7, "23/12": 6, "24/12": 5, "25/12": 6,
    "26/12": 9, "27/12": 3, "28/12": 6, "29/12": 9, "30/12": 3,
    "31/12": 4
};

  const reducirNumero = (num) => {
    let suma = String(num).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    if (![11, 22, 33].includes(suma)) {
      while (suma > 9) {
        suma = String(suma).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
      }
    }
    return suma;
  };

  const calcularAnoPersonal = (fechaNac, anoPred) => {
    const [dia, mes] = fechaNac.split('/');
    const fechaCumple = `${dia}${mes}${anoPred}`;
    let suma = fechaCumple.split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    if (![11, 22, 33].includes(suma)) {
      while (suma > 9) {
        suma = String(suma).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
      }
    }
    return suma;
  };

  const calcularDigitoEdad = (fechaNac, anoPred) => {
    const anoNac = parseInt(fechaNac.split('/')[2]);
    const edad = anoPred - anoNac;
    let suma = edad + (edad - 1);
    if ([11, 22, 33].includes(suma)) return suma;
    while (suma > 9) {
      const nuevaSuma = String(suma).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
      if ([11, 22, 33].includes(nuevaSuma)) return nuevaSuma;
      suma = nuevaSuma;
    }
    return suma;
  };

  const calcularArmonico = (fechaNac, anoPred) => {
    const anoNac = parseInt(fechaNac.split('/')[2]);
    const sumaAnoNac = String(anoNac).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    const total = sumaAnoNac + anoPred;
    let reduccion = Math.floor(total / 100) + (total % 100);
    while (reduccion > 22) {
      reduccion = String(reduccion).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }
    return reduccion;
  };

  const calcularPrimeraEtapa = (fechaNac, anoPred) => {
    const anoNac = parseInt(fechaNac.split('/')[2]);
    const diferencia = anoPred - anoNac;
    const total = anoPred + diferencia;
    let reduccion = Math.floor(total / 100) + (total % 100);
    while (reduccion > 78) {
      reduccion = String(reduccion).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }
    return reduccion;
  };

  const calcularSegundaEtapa = (fechaNac, anoPred) => {
    const [dia, mes, ano] = fechaNac.split('/').map(Number);
    const diaRed = reducirNumero(dia);
    const mesRed = reducirNumero(mes);
    const anoRed = reducirNumero(ano);
    const fechaRed = diaRed + mesRed + anoRed;
    const total = anoPred + fechaRed;
    let reduccion = Math.floor(total / 100) + (total % 100);
    if (reduccion > 78) {
      reduccion = String(reduccion).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }
    return reduccion;
  };

  const calcularTerceraEtapa = (fechaNac, anoPred) => {
    const [dia, mes] = fechaNac.split('/');
    const diaMes = `${dia}/${mes}`;
    const clave = clavesPersonales[diaMes] || 0;
    const total = anoPred + clave;
    let reduccion = Math.floor(total / 100) + (total % 100);
    if (reduccion > 78) {
      reduccion = String(reduccion).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }
    return reduccion;
  };

  const handleCalculate = () => {
    try {
      const [day, month, year] = birthDate.split('/').map(Number);
      const predYear = parseInt(predictionYear);
      
      if (isNaN(day) || isNaN(month) || isNaN(year) || isNaN(predYear)) {
        throw new Error('Invalid date format');
      }

      const anoPersonal = calcularAnoPersonal(birthDate, predYear);
      const digitoEdad = calcularDigitoEdad(birthDate, predYear);
      const armonico = calcularArmonico(birthDate, predYear);
      const primeraEtapa = calcularPrimeraEtapa(birthDate, predYear);
      const segundaEtapa = calcularSegundaEtapa(birthDate, predYear);
      const terceraEtapa = calcularTerceraEtapa(birthDate, predYear);

      setResults({
        anoPersonal,
        digitoEdad,
        armonico,
        primeraEtapa,
        segundaEtapa,
        terceraEtapa,
        predYear
      });
    } catch (error) {
      alert('Error en el cálculo. Verifique el formato de fecha (DD/MM/AAAA)');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Numerología y Tarot</h1>
        
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Fecha de Nacimiento (DD/MM/AAAA):</label>
            <div className="relative">
              <input
                type="text"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full p-2 border rounded-md pl-10"
                placeholder="DD/MM/AAAA"
              />
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium">Año de Predicción:</label>
            <input
              type="number"
              value={predictionYear}
              onChange={(e) => setPredictionYear(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Calcular
          </button>
        </div>

        {results && (
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-bold">Resultados para {birthDate} en el año {results.predYear}</h2>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold mb-3">PRIMERA PARTE - NUMEROLOGÍA</h3>
              <div className="space-y-2">
                <p><span className="font-medium">1. Año Personal:</span> {results.anoPersonal}</p>
                <p><span className="font-medium">2. Dígito de la Edad:</span> {results.digitoEdad}</p>
                <p><span className="font-medium">3. Armónico:</span> {results.armonico} - {arcanos[results.armonico]}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold mb-3">SEGUNDA PARTE - LAS TRES ETAPAS</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Primera Etapa:</span> Arcano {results.primeraEtapa} - {arcanos[results.primeraEtapa]}</p>
                <p><span className="font-medium">Segunda Etapa:</span> Arcano {results.segundaEtapa} - {arcanos[results.segundaEtapa]}</p>
                <p><span className="font-medium">Tercera Etapa:</span> Arcano {results.terceraEtapa} - {arcanos[results.terceraEtapa]}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
