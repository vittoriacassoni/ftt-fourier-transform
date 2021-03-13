const ra = 39;
const qtdPeriodo = 3;
const qtdPontos = 100;

const fZero = ra * 100;
const omegaZero = 2 * Math.PI * fZero;
const periodo = (1 / fZero) / qtdPontos;

function transformadaFourier(termos, t)
{
  if (t > 0) {
    let count = 1;
    let sum = 0;

    for (let i = 0; i < termos; i++) {
      sum += ((1 / count) * Math.sin(count * omegaZero * t));
      count += 2;
    }

    const c = ((2 / Math.PI) * sum) + 0.5;
    return c;
  }

  return 0.5;
}

function calculaSequencia(qtdSequencias)
{
  let periodoAtual = 0;

  let sequenciasGrafico = [];
  for (let i = 0; i < qtdPontos * qtdPeriodo; i++) {
    sequenciasGrafico.push({
      x: periodoAtual,
      y: transformadaFourier(qtdSequencias, periodoAtual)
    });
    periodoAtual += periodo;
  }
  return sequenciasGrafico;
}

function gerarGrafico()
{
  const containerGrafico = document.getElementById('container');
  const qtdTermos = document.getElementById('qtdTermos').value;

  if (qtdTermos < 0) {
    return;
  }

  containerGrafico.classList.remove('hidden');

  let pontos = [];

 
  pontos.push({
    type: "line",
    dataPoints: window.calculaSequencia(qtdTermos)
});

  const grafico = new CanvasJS.Chart("graficoContainer", {
    title: {
      text: "Transformada de Fourier"
    },
    animationEnabled: true,
    theme: "light2",
    axisY: {
      includeZero: false
    },
    data: pontos
  });

  grafico.render();
}