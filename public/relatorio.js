document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/licitacao/relatorio?period=mes');
        const dados = await response.json();
        const labels = dados.map(d => d.periodo);
        const totals = dados.map(d => d.total);

        const ctx = document.getElementById('grafico').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Licitações por mês',
                    data: totals,
                    backgroundColor: 'rgba(26, 115, 131, 0.5)',
                    borderColor: 'rgba(26, 115, 131, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (err) {
        console.error('Erro ao obter dados do relatório', err);
    }
});
