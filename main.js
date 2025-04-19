document.addEventListener('DOMContentLoaded', () => {
    const { DateTime } = luxon;
    const form = document.querySelector('.date-form');
    const birthInput = document.getElementById('birth-input');
    const daysAliveLabel = document.getElementById('days-alive');
    const daysLifeLabel = document.getElementById('days-life');
    const maxDaysLabel = document.getElementById('max-days');
    const progressBar = document.querySelector('.point');
  
    const MAX_YEARS = 80;
    const MAX_DAYS = MAX_YEARS * 365;
    const MIN_DATE = DateTime.fromISO("1935-01-01");
  
    const today = DateTime.now();
  
    function calcularTiempoVida(fechaISO) {
      const nacimiento = DateTime.fromISO(fechaISO);
  
      if (!nacimiento.isValid) throw new Error("Fecha inválida");
      if (nacimiento > today) throw new Error("La fecha no puede ser futura");
  
      const diff = today.diff(nacimiento, ['years','months', 'days']).toObject();
      const totalDays = today.diff(nacimiento, 'days').days;
      const dieDate = nacimiento.plus({years:80})
      const diffDie = dieDate.diff(today, ['years', 'months', 'days']).toObject();
      console.log(diffDie)
      if (nacimiento < MIN_DATE) {
        daysAliveLabel.textContent = `${Math.floor(diff.years)},${Math.floor(diff.months)} MONTHS, ${Math.floor(diff.days)} DAYS ALIVE`;
        daysLifeLabel.textContent = "HOW ARE U ALIVE?";
      } else {
        daysAliveLabel.textContent = `YEARS: ${Math.floor(diff.years)} | MONTH: ${Math.floor(diff.months)} | DAYS: ${Math.floor(diff.days)} ALIVE`;
        daysLifeLabel.textContent = `YOU'LL DIE IN: YEARS: ${Math.floor(diffDie.years)} | MONTHS: ${Math.floor(diffDie.months)} | DAYS: ${Math.floor(diffDie.days)} APROX.`;
      }
  
      maxDaysLabel.textContent = `${MAX_YEARS} YEARS APPROX.`;
  
      return totalDays;
    }
  
    function animateBar(finalPercentage) {
      let current = 0;
      const animationSpeed = 0.5;
  
      function animate() {
        if (current < finalPercentage) {
          current += animationSpeed;
          progressBar.style.width = `${current}%`;
          requestAnimationFrame(animate);
        } else {
          progressBar.style.width = `${finalPercentage}%`;
        }
      }
  
      progressBar.style.width = "0%";
      animate();
    }
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      try {
        const fecha = birthInput.value;
        const totalDays = calcularTiempoVida(fecha);
        const porcentaje = Math.min((totalDays / MAX_DAYS) * 100, 100);
        animateBar(porcentaje);
      } catch (error) {
        alert(error.message);
        console.error(error.message);
      }
    });
  });
  